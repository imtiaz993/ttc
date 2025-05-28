import { useEffect, useRef } from "react";

type UseInactivityParams = {
  time: number; // In milliseconds
  onInactivity: () => void;
  condition: () => boolean;
};

export function useInactivity({
  time,
  onInactivity,
  condition,
}: UseInactivityParams) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (condition()) {
        onInactivity();
      }
      // Start tracking again
      startTimer();
    }, time);
  };

  const resetTimer = () => {
    startTimer();
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "touchstart",
      "scroll",
    ];
    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    startTimer(); // Begin tracking

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [time, onInactivity, condition]);
}

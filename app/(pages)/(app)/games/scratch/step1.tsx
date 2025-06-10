import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import ScratchCard from "../../components/scratchCard";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import SwipeOverlay from "../../components/swipeOverlay";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";

const ScratchStep1 = ({ playMusic = () => {} }: any) => {
  const userData = useSelector((state: any) => state.user.userData);
  const [isRevealed, setIsRevealed] = useState(false);

  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);
  const displayOverlay = () => dispatch(openOverlay());
  useInactivity({
    time: 20000,
    onInactivity: () => {
      setOverlay(true);
      displayOverlay();
    },
    condition: () => {
      return !overlay;
    },
  });

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
      {overlay && <SwipeOverlay setOverlay={setOverlay} />}
      <Menu isOpen={userData.menu} playMusic={playMusic} />
      <ScratchCard
        isRevealed={isRevealed}
        setIsRevealed={setIsRevealed}
        animation={!userData.menu}
      />
    </>
  );
};

export default ScratchStep1;

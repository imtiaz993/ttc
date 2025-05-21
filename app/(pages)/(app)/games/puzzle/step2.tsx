import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/menu";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  MultiBackend,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";
// Custom backend configuration with optimized touch handling
declare global {
  interface Window {
    __REACT_DND_CONTEXT__?: any;
  }
}

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
        delay: 0, // Remove delay for immediate dragging
        delayTouchStart: 0, // Remove touch delay
        touchSlop: 0, // Reduce touch slop to improve responsiveness
        enableKeyboardEvents: true, // Enable keyboard events for accessibility
      },
      preview: true,
      transition: TouchTransition,
    },
  ],
};
const PieceType: any = "PUZZLE_PIECE";
// Custom drag preview component
const CustomDragLayer = ({ pieces, pieceSize, puzzleImagePath }) => {
  const [{ isDragging, currentOffset, item }]: any = useDragLayer(
    (monitor) => ({
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
      item: monitor.getItem(),
    })
  );
  if (!isDragging || !currentOffset) {
    return null;
  }
  const { x, y } = currentOffset;
  const piece = pieces.find((p) => p.id === item.id);
  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: pieceSize,
          height: pieceSize,
          backgroundImage: `url(${puzzleImagePath})`,
          backgroundSize: `${pieceSize * 3}px ${pieceSize * 3}px`,
          backgroundPosition: `-${piece.col * pieceSize}px -${
            piece.row * pieceSize
          }px`,
          opacity: 0.8,
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};
// Custom drag layer hook
const useDragLayer = (collect) => {
  const [collected, setCollected] = useState({
    isDragging: false,
    currentOffset: null,
    item: null,
  });
  const dragLayerRef = useRef(null);
  useEffect(() => {
    if (
      !window.__REACT_DND_CONTEXT__ ||
      !window.__REACT_DND_CONTEXT__.dragDropManager
    ) {
      return () => {};
    }
    const monitor = window.__REACT_DND_CONTEXT__.dragDropManager.getMonitor();
    const unsubscribe = monitor.subscribeToStateChange(() => {
      setCollected(collect(monitor));
    });
    return unsubscribe;
  }, [collect]);
  return [collected, dragLayerRef];
};
const DraggablePiece = ({
  id,
  image,
  left,
  top,
  row,
  col,
  pieceSize,
  zIndex = 1,
  isCompleted,
}) => {
  const data: any = {
    type: PieceType,
    item: { id, row, col },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    options: {
      touchStartThreshold: 0, // Lower threshold for touch start
    },
  };
  const [{ isDragging }, drag]: any = useDrag(() => data);
  return (
    <div
      ref={drag}
      className="puzzle-piece"
      style={{
        position: "absolute",
        left,
        top,
        width: pieceSize,
        height: pieceSize,
        backgroundImage: `url(${image})`,
        backgroundSize: `${pieceSize * 3}px ${pieceSize * 3}px`,
        backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
        opacity: isDragging ? 0.1 : 1, // Make original almost invisible when dragging
        cursor: "move",
        border: isCompleted ? "none" : "1px solid #ccc",
        boxSizing: "border-box",
        zIndex: zIndex || 1,
        transition: isDragging ? "none" : "border 0.3s ease", // Remove transition during drag
        touchAction: "none",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        boxShadow: isDragging ? "none" : "0 2px 5px rgba(0,0,0,0.1)",
      }}
    />
  );
};
const DropZone = ({ id, left, top, onDrop, hasPiece, pieceSize }) => {
  const [{ isOver, canDrop }, drop]: any = useDrop({
    accept: PieceType,
    drop: (item: any) => onDrop(item.id, id),
    canDrop: () => !hasPiece,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  // Enhanced visual feedback for drop zones
  const dropZoneStyle: any = {
    position: "absolute",
    left,
    top,
    width: pieceSize,
    height: pieceSize,
    border: isOver && canDrop ? "2px dashed #4CAF50" : "1px dashed #999",
    boxSizing: "border-box",
    backgroundColor:
      isOver && canDrop ? "rgba(76, 175, 80, 0.15)" : "transparent",
    transition: "all 0.2s ease",
    zIndex: isOver ? 5 : 0,
    borderRadius: isOver && canDrop ? "4px" : "0",
  };
  return <div ref={drop} className="drop-zone" style={dropZoneStyle} />;
};
const PuzzleStep2 = () => {
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const [overlay, setOverlay] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [undoDisabled, setUndoDisabled] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const pieceSize = 80;
  const gridSize = 3;
  const [placedPieces, setPlacedPieces] = useState({});
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  const puzzleImagePath = "/images/completed-puzzle.png";
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return {
      minutes,
      seconds: secs,
      display: `${minutes.toString().padStart(2, "0")} minute${
        minutes !== 1 ? "s" : ""
      } ${secs.toString().padStart(2, "0")} second${secs !== 1 ? "s" : ""}`,
    };
  };
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    const formattedTime = formatTime(seconds);
    localStorage.setItem("puzzle-time", JSON.stringify(formattedTime));
    return formattedTime;
  };
  useEffect(() => {
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
  const pieces = Array.from({ length: gridSize * gridSize }, (_, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    return {
      id: `piece-${i}`,
      correctPos: { top: row * pieceSize, left: col * pieceSize },
      row,
      col,
    };
  });
  const initialLayout = [
    { id: "piece-0", top: 60, left: 70 },
    { id: "piece-1", top: 120, left: 135 },
    { id: "piece-2", top: 130, left: 0 },
    { id: "piece-3", top: 30, left: 155 },
    { id: "piece-4", top: 80, left: 195 },
    { id: "piece-5", top: 30, left: -20 },
    { id: "piece-6", top: 0, left: 10 },
    { id: "piece-7", top: -5, left: 180 },
    { id: "piece-8", top: 5, left: 80 },
  ];
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);
  // Track drag state for the entire application
  useEffect(() => {
    const handleDragStateChange = () => {
      if (
        window.__REACT_DND_CONTEXT__ &&
        window.__REACT_DND_CONTEXT__.dragDropManager
      ) {
        const monitor =
          window.__REACT_DND_CONTEXT__.dragDropManager.getMonitor();
        setIsDragging(monitor.isDragging());
      }
    };
    if (
      window.__REACT_DND_CONTEXT__ &&
      window.__REACT_DND_CONTEXT__.dragDropManager
    ) {
      const monitor = window.__REACT_DND_CONTEXT__.dragDropManager.getMonitor();
      return monitor.subscribeToStateChange(handleDragStateChange);
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      next();
    }
  }, [isCompleted]);

  const handleDrop = (pieceId, zoneId) => {
    const dropPiece = pieces.find((p) => p.id === pieceId);
    const dropZone = pieces.find((p) => p.id === zoneId);
    if (!dropPiece || !dropZone) return;
    // Provide haptic feedback on successful drop if available
    if (navigator.vibrate) {
      navigator.vibrate(50); // Short vibration on successful drop
    }
    // Save current state for undo functionality
    setMoveHistory((prev) => [...prev, { ...placedPieces }]);
    setUndoDisabled(false);
    setPlacedPieces((prev) => {
      const updated = {
        ...prev,
        [pieceId]: {
          left: dropZone.correctPos.left,
          top: dropZone.correctPos.top,
          row: dropPiece.row,
          col: dropPiece.col,
        },
      };
      const allCorrect = pieces.every((p) => {
        const placed = updated[p.id];
        return (
          placed &&
          placed.left === p.correctPos.left &&
          placed.top === p.correctPos.top
        );
      });

      if (allCorrect) {
        setIsCompleted(true);
        stopTimer();
        if (navigator.vibrate) {
          navigator.vibrate([100, 30, 100]);
        }
      }
      return updated;
    });
  };

  const handleUndo = () => {
    if (moveHistory.length > 0) {
      const lastState = moveHistory[moveHistory.length - 1];
      setPlacedPieces(lastState);
      setMoveHistory((prev) => prev.slice(0, -1));
      if (moveHistory.length === 1) {
        setUndoDisabled(true);
      }
    }
  };

  useEffect(() => {
    dispatch(
      setStepperProps({
        showNext: false,
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
      <Menu
        isGameOptions={true}
        handleInfo={() => {
          setOverlay(true);
        }}
        isUndoDisabled={undoDisabled}
        handleUndo={handleUndo}
        handleSkip={() => {
          stopTimer();
          next();
        }}
      />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-manrope">
            <div className="w-full flex justify-between items-center mb-2">
              <img
                src="/icons/question-mark.svg"
                alt="Question"
                className="w-6"
              />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-48px)]">
                Piece together
              </p>
              <img
                src="/icons/close-black.svg"
                alt="Close"
                className="w-5 cursor-pointer"
                onClick={() => setOverlay(false)}
              />
            </div>
            <p className="text-xs leading-relaxed">
              Arrange the pieces to form the complete picture.
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7]">
        <div>
          <h1 className="text-sm font-medium mb-3 flex justify-center items-center gap-5 font-manrope">
            TIMER
            <span className="text-xl font-medium font-lora">
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(seconds % 60)?.toString()?.padStart(2, "0")}
            </span>
          </h1>
          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div
              className="game-container"
              style={{
                backgroundColor: "#FAF7E8",
                minHeight: "100vh",
              }}
            >
              {/* Custom drag layer for visible drag preview */}
              <CustomDragLayer
                pieces={pieces}
                pieceSize={pieceSize}
                puzzleImagePath={puzzleImagePath}
              />
              <div
                className="puzzle-area"
                style={{
                  position: "relative",
                  width: pieceSize * gridSize,
                  height: pieceSize * gridSize,
                  margin: "0 auto 30px auto",
                  borderRadius: "4px",
                }}
              >
                {pieces.map((p) => (
                  <DropZone
                    key={`drop-${p.id}`}
                    id={p.id}
                    left={p.correctPos.left}
                    top={p.correctPos.top}
                    onDrop={handleDrop}
                    hasPiece={Object.values(placedPieces).some(
                      (pos: any) =>
                        pos.left === p.correctPos.left &&
                        pos.top === p.correctPos.top
                    )}
                    pieceSize={pieceSize}
                  />
                ))}
                {Object.entries(placedPieces).map(([id, pos]: any) => (
                  <DraggablePiece
                    key={`placed-${id}`}
                    id={id}
                    image={puzzleImagePath}
                    left={pos.left}
                    top={pos.top}
                    row={pos.row}
                    col={pos.col}
                    pieceSize={pieceSize}
                    isCompleted={isCompleted}
                  />
                ))}
              </div>
              <div
                className="pieces-container"
                style={{
                  position: "relative",
                  height: 400,
                  width: "100%",
                  maxWidth: 400,
                  margin: "0 auto",
                  padding: "10px",
                  backgroundColor: isDragging
                    ? "rgba(250, 247, 232, 0.9)"
                    : "transparent",
                  transition: "background-color 0.3s ease",
                }}
              >
                {pieces.map((p) => {
                  if (placedPieces[p.id]) return null;
                  const initialPos = initialLayout.find(
                    (item) => item.id === p.id
                  );
                  let zIndex = 1;
                  if (p.id === "piece-7") zIndex = 10;
                  if (p.id === "piece-4") zIndex = 8;
                  if (p.id === "piece-5") zIndex = 6;
                  if (p.id === "piece-2") zIndex = 4;
                  if (p.id === "piece-3") zIndex = 2;
                  return (
                    <DraggablePiece
                      key={`unplaced-${p.id}`}
                      id={p.id}
                      image={puzzleImagePath}
                      left={initialPos.left}
                      top={initialPos.top}
                      row={p.row}
                      col={p.col}
                      pieceSize={pieceSize}
                      zIndex={zIndex}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>
            </div>
          </DndProvider>
        </div>
        <div className="flex justify-center items-center mt-6 w-full">
          <img src="/images/puzzle.png" alt="" className="w-2/3" />
        </div>
      </div>
    </>
  );
};
export default PuzzleStep2;

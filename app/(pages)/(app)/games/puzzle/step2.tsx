import React, {useEffect, useState, useRef} from "react";
import Menu from "../../components/menu";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import {
    MultiBackend,
    TouchTransition,
    MouseTransition,
} from "react-dnd-multi-backend";
import {useDispatch} from "react-redux";
import {nextStep} from "../../../../redux/slices/navigationSlice";
import {resetStepperProps, setStepperProps} from "../../../../redux/slices/progressSlice";

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
                delay: 0,
                delayTouchStart: 0,
                touchSlop: 0,
                enableKeyboardEvents: true,
            },
            preview: true,
            transition: TouchTransition,
        },
    ],
};

const PieceType: any = "PUZZLE_PIECE";

// Custom drag preview component
const CustomDragLayer = ({pieces, pieceSize, puzzleImagePath, gridCols, gridRows}) => {
    const [{isDragging, currentOffset, item}]: any = useDragLayer(
        (monitor) => ({
            isDragging: monitor.isDragging(),
            currentOffset: monitor.getSourceClientOffset(),
            item: monitor.getItem(),
        })
    );
    if (!isDragging || !currentOffset) {
        return null;
    }
    const {x, y} = currentOffset;
    const piece = pieces.find((p) => p.id === item.id);
    if (!piece) return null;

    const jigsawPath = generateJigsawPath(piece.row, piece.col, gridRows, gridCols, pieceSize);
    const clipPathId = `drag-preview-${piece.id}`;

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
                    width: pieceSize * 1.4,
                    height: pieceSize * 1.4,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <svg
                    width={pieceSize * 1.4}
                    height={pieceSize * 1.4}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        overflow: "visible",
                    }}
                >
                    <defs>
                        <clipPath id={clipPathId}>
                            <path d={jigsawPath} transform={`translate(${pieceSize * 0.2}, ${pieceSize * 0.2})`}/>
                        </clipPath>
                    </defs>
                    <image
                        href={puzzleImagePath}
                        x={pieceSize * 0.2 - piece.col * pieceSize}
                        y={pieceSize * 0.2 - piece.row * pieceSize}
                        width={pieceSize * gridCols}
                        height={pieceSize * gridRows}
                        clipPath={`url(#${clipPathId})`}
                        style={{
                            opacity: 0.8,
                            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.3))",
                        }}
                        preserveAspectRatio="xMidYMid slice"
                    />
                    <path
                        d={jigsawPath}
                        transform={`translate(${pieceSize * 0.2}, ${pieceSize * 0.2})`}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                    />
                </svg>
            </div>
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
            return () => {
            };
        }
        const monitor = window.__REACT_DND_CONTEXT__.dragDropManager.getMonitor();
        const unsubscribe = monitor.subscribeToStateChange(() => {
            setCollected(collect(monitor));
        });
        return unsubscribe;
    }, [collect]);
    return [collected, dragLayerRef];
};

// Function to generate jigsaw piece SVG path
const generateJigsawPath = (row, col, gridRows, gridCols, pieceSize) => {
    const tabSize = pieceSize * 0.2;
    const smoothness = 0.1;

    const hasTopTab = row > 0 && (row + col) % 2 === 0;
    const hasRightTab = col < gridCols - 1 && (row + col + 1) % 2 === 0;
    const hasBottomTab = row < gridRows - 1 && (row + col) % 2 === 1;
    const hasLeftTab = col > 0 && (row + col - 1) % 2 === 1;

    let path = `M 0 0`;

    // Top edge
    if (row === 0) {
        path += ` L ${pieceSize} 0`;
    } else if (hasTopTab) {
        path += ` L ${pieceSize * 0.35} 0 
              Q ${pieceSize * 0.4} 0 ${pieceSize * 0.4} ${-tabSize * 0.3}
              Q ${pieceSize * 0.5} ${-tabSize} ${pieceSize * 0.6} ${-tabSize * 0.3}
              Q ${pieceSize * 0.6} 0 ${pieceSize * 0.65} 0
              L ${pieceSize} 0`;
    } else {
        path += ` L ${pieceSize * 0.35} 0
              Q ${pieceSize * 0.4} 0 ${pieceSize * 0.4} ${tabSize * 0.3}
              Q ${pieceSize * 0.5} ${tabSize} ${pieceSize * 0.6} ${tabSize * 0.3}
              Q ${pieceSize * 0.6} 0 ${pieceSize * 0.65} 0
              L ${pieceSize} 0`;
    }

    // Right edge
    if (col === gridCols - 1) {
        path += ` L ${pieceSize} ${pieceSize}`;
    } else if (hasRightTab) {
        path += ` L ${pieceSize} ${pieceSize * 0.35}
              Q ${pieceSize} ${pieceSize * 0.4} ${pieceSize + tabSize * 0.3} ${pieceSize * 0.4}
              Q ${pieceSize + tabSize} ${pieceSize * 0.5} ${pieceSize + tabSize * 0.3} ${pieceSize * 0.6}
              Q ${pieceSize} ${pieceSize * 0.6} ${pieceSize} ${pieceSize * 0.65}
              L ${pieceSize} ${pieceSize}`;
    } else {
        path += ` L ${pieceSize} ${pieceSize * 0.35}
              Q ${pieceSize} ${pieceSize * 0.4} ${pieceSize - tabSize * 0.3} ${pieceSize * 0.4}
              Q ${pieceSize - tabSize} ${pieceSize * 0.5} ${pieceSize - tabSize * 0.3} ${pieceSize * 0.6}
              Q ${pieceSize} ${pieceSize * 0.6} ${pieceSize} ${pieceSize * 0.65}
              L ${pieceSize} ${pieceSize}`;
    }

    // Bottom edge
    if (row === gridRows - 1) {
        path += ` L 0 ${pieceSize}`;
    } else if (hasBottomTab) {
        path += ` L ${pieceSize * 0.65} ${pieceSize}
              Q ${pieceSize * 0.6} ${pieceSize} ${pieceSize * 0.6} ${pieceSize - tabSize * 0.3}
              Q ${pieceSize * 0.5} ${pieceSize - tabSize} ${pieceSize * 0.4} ${pieceSize - tabSize * 0.3}
              Q ${pieceSize * 0.4} ${pieceSize} ${pieceSize * 0.35} ${pieceSize}
              L 0 ${pieceSize}`;
    } else {
        path += ` L ${pieceSize * 0.65} ${pieceSize}
              Q ${pieceSize * 0.6} ${pieceSize} ${pieceSize * 0.6} ${pieceSize + tabSize * 0.3}
              Q ${pieceSize * 0.5} ${pieceSize + tabSize} ${pieceSize * 0.4} ${pieceSize + tabSize * 0.3}
              Q ${pieceSize * 0.4} ${pieceSize} ${pieceSize * 0.35} ${pieceSize}
              L 0 ${pieceSize}`;
    }

    // Left edge
    if (col === 0) {
        path += ` L 0 0`;
    } else if (hasLeftTab) {
        path += ` L 0 ${pieceSize * 0.65}
              Q 0 ${pieceSize * 0.6} ${tabSize * 0.3} ${pieceSize * 0.6}
              Q ${tabSize} ${pieceSize * 0.5} ${tabSize * 0.3} ${pieceSize * 0.4}
              Q 0 ${pieceSize * 0.4} 0 ${pieceSize * 0.35}
              L 0 0`;
    } else {
        path += ` L 0 ${pieceSize * 0.65}
              Q 0 ${pieceSize * 0.6} ${-tabSize * 0.3} ${pieceSize * 0.6}
              Q ${-tabSize} ${pieceSize * 0.5} ${-tabSize * 0.3} ${pieceSize * 0.4}
              Q 0 ${pieceSize * 0.4} 0 ${pieceSize * 0.35}
              L 0 0`;
    }

    path += ` Z`;
    return path;
};

const DraggablePiece = ({
                            id,
                            image,
                            left,
                            top,
                            row,
                            col,
                            pieceSize,
                            gridCols,
                            gridRows,
                            zIndex = 1,
                            isCompleted,
                        }) => {
    const data: any = {
        type: PieceType,
        item: {id, row, col},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        options: {
            touchStartThreshold: 0,
        },
    };
    const [{isDragging}, drag]: any = useDrag(() => data);

    const jigsawPath = generateJigsawPath(row, col, gridRows, gridCols, pieceSize);
    const clipPathId = `jigsaw-${id}`;

    return (
        <div
            ref={drag}
            className="puzzle-piece"
            style={{
                position: "absolute",
                left: left - pieceSize * 0.2,
                top: top - pieceSize * 0.2,
                width: pieceSize * 1.4,
                height: pieceSize * 1.4,
                cursor: "move",
                zIndex: zIndex || 1,
                transition: isDragging ? "none" : "all 0.3s ease",
                touchAction: "none",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                opacity: isDragging ? 0.1 : 1,
            }}
        >
            <svg
                width={pieceSize * 1.4}
                height={pieceSize * 1.4}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "visible",
                }}
            >
                <defs>
                    <clipPath id={clipPathId}>
                        <path d={jigsawPath} transform={`translate(${pieceSize * 0.2}, ${pieceSize * 0.2})`}/>
                    </clipPath>
                </defs>
                <image
                    href={image}
                    x={pieceSize * 0.2 - col * pieceSize}
                    y={pieceSize * 0.2 - row * pieceSize}
                    width={pieceSize * gridCols}
                    height={pieceSize * gridRows}
                    clipPath={`url(#${clipPathId})`}
                    preserveAspectRatio="xMidYMid slice"
                />
                <path
                    d={jigsawPath}
                    transform={`translate(${pieceSize * 0.2}, ${pieceSize * 0.2})`}
                    fill="none"
                    stroke={isCompleted ? "none" : "none"}
                    strokeWidth="2"
                    style={{
                        filter: isDragging ? "none" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                />
            </svg>
        </div>
    );
};

const DropZone = ({id, left, top, onDrop, hasPiece, pieceSize, row, col, gridRows, gridCols}) => {
    const [{isOver, canDrop}, drop]: any = useDrop({
        accept: PieceType,
        drop: (item: any) => onDrop(item.id, id),
        canDrop: () => !hasPiece,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const jigsawPath = generateJigsawPath(row, col, gridRows, gridCols, pieceSize);
    const clipPathId = `dropzone-${id}`;

    return (
        <div
            ref={drop}
            className="drop-zone"
            style={{
                position: "absolute",
                left: left - pieceSize * 0.2,
                top: top - pieceSize * 0.2,
                width: pieceSize * 1.4,
                height: pieceSize * 1.4,
                zIndex: isOver ? 5 : 0,
            }}
        >
            <svg
                width={pieceSize * 1.4}
                height={pieceSize * 1.4}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "visible",
                }}
            >
                <defs>
                    <clipPath id={clipPathId}>
                        <path d={jigsawPath} transform={`translate(${pieceSize * 0.2}, ${pieceSize * 0.2})`}/>
                    </clipPath>
                </defs>
                <path
                    d={jigsawPath}
                    transform={`translate(${pieceSize * 0.2}, ${pieceSize * 0.2})`}
                    fill={isOver && canDrop ? "rgba(76, 175, 80, 0.15)" : "transparent"}
                    stroke={isOver && canDrop ? "#4CAF50" : "#000000"}
                    strokeWidth="2"
                    strokeDasharray={isOver && canDrop ? "none" : "5,5"}
                    style={{
                        transition: "all 0.2s ease",
                    }}
                />
            </svg>
        </div>
    );
};

// New component for the pieces container drop zone
const PiecesContainerDropZone = ({onDrop, children}) => {
    const [{isOver, canDrop}, drop]: any = useDrop({
        accept: PieceType,
        drop: (item: any) => onDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div
            ref={drop}
            className="pieces-container"
            style={{
                position: "relative",
                height: 400,
                width: "100%",
                maxWidth: 400,
                margin: "0 auto",
                padding: "10px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
            }}
        >
            {children}
        </div>
    );
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
    const gridRows = 4;
    const gridCols = 3;
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
        // Note: localStorage removed as per artifact instructions
        return formattedTime;
    };

    useEffect(() => {
        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
            setSeconds(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const pieces = Array.from({length: gridRows * gridCols}, (_, i) => {
        const row = Math.floor(i / gridCols);
        const col = i % gridCols;
        return {
            id: `piece-${i}`,
            correctPos: {top: row * pieceSize, left: col * pieceSize},
            row,
            col,
        };
    });

    // Updated initial layout for 4x3 grid (12 pieces total)
    const initialLayout = [
        {id: "piece-0", top: 60, left: 70},
        {id: "piece-1", top: 120, left: 135},
        {id: "piece-2", top: 130, left: 0},
        {id: "piece-3", top: 30, left: 155},
        {id: "piece-4", top: 80, left: 195},
        {id: "piece-5", top: 30, left: -20},
        {id: "piece-6", top: 0, left: 10},
        {id: "piece-7", top: -5, left: 180},
        {id: "piece-8", top: 5, left: 80},
        {id: "piece-9", top: 160, left: 20},
        {id: "piece-10", top: 180, left: 160},
        {id: "piece-11", top: 200, left: 100},
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

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        setMoveHistory((prev) => [...prev, {...placedPieces}]);
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

    // New function to handle dropping pieces back to the container
    const handleDropToContainer = (pieceId) => {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        setMoveHistory((prev) => [...prev, {...placedPieces}]);
        setUndoDisabled(false);

        setPlacedPieces((prev) => {
            const updated = {...prev};
            delete updated[pieceId]; // Remove piece from placed pieces
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
            dispatch(resetStepperProps());
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
                    <div
                        className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-manrope">
                        <div className="w-full flex justify-between items-center mb-2">
                            <img
                                src="/icons/question-mark.svg"
                                alt="Question"
                                className="w-6"
                            />
                            <p className="ml-2 text-sm font-semibold w-[calc(100%-48px)]">
                                Piece together
                            </p>
                            <img
                                src="/icons/close-black.svg"
                                alt="Close"
                                className="w-5 cursor-pointer"
                                onClick={() => setOverlay(false)}
                            />
                        </div>
                        <p className="text-sm leading-relaxed">
                            Arrange the pieces to form the complete picture. You can also drag pieces back from the puzzle to rearrange them.
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
                            <CustomDragLayer
                                pieces={pieces}
                                pieceSize={pieceSize}
                                puzzleImagePath={puzzleImagePath}
                                gridCols={gridCols}
                                gridRows={gridRows}
                            />
                            <div
                                className="puzzle-area"
                                style={{
                                    position: "relative",
                                    width: pieceSize * gridCols + pieceSize * 0.4,
                                    height: pieceSize * gridRows + pieceSize * 0.4,
                                    margin: "0 auto 30px auto",
                                    borderRadius: "4px",
                                    padding: `${pieceSize * 0.2}px`,
                                }}
                            >
                                {pieces.map((p) => (
                                    <DropZone
                                        key={`drop-${p.id}`}
                                        id={p.id}
                                        left={p.correctPos.left}
                                        top={p.correctPos.top}
                                        row={p.row}
                                        col={p.col}
                                        gridRows={gridRows}
                                        gridCols={gridCols}
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
                                        gridCols={gridCols}
                                        gridRows={gridRows}
                                        isCompleted={isCompleted}
                                    />
                                ))}
                            </div>
                            <PiecesContainerDropZone onDrop={handleDropToContainer}>
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
                                    if (p.id === "piece-10") zIndex = 9;
                                    if (p.id === "piece-11") zIndex = 7;
                                    if (p.id === "piece-9") zIndex = 5;

                                    return (
                                        <DraggablePiece
                                            key={`unplaced-${p.id}`}
                                            id={p.id}
                                            image={puzzleImagePath}
                                            left={initialPos?.left || 0}
                                            top={initialPos?.top || 0}
                                            row={p.row}
                                            col={p.col}
                                            pieceSize={pieceSize}
                                            gridCols={gridCols}
                                            gridRows={gridRows}
                                            zIndex={zIndex}
                                            isCompleted={isCompleted}
                                        />
                                    );
                                })}
                            </PiecesContainerDropZone>
                        </div>
                    </DndProvider>
                </div>
                <div className="flex justify-center items-center mt-6 w-full">
                    <img src="/images/puzzle.png" alt="" className="w-2/3"/>
                </div>
            </div>
        </>
    );
};

export default PuzzleStep2;
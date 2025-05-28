import React, { useEffect, useState, useRef } from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";
import {DndProvider, DragSourceOptions, useDrag, useDrop} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition, MouseTransition } from "react-dnd-multi-backend";

const HTML5toTouch = {
    backends: [
        {
            backend: HTML5Backend,
            transition: MouseTransition
        },
        {
            backend: TouchBackend,
            options: {
                enableMouseEvents: true,
                delay: 0,
                delayTouchStart: 0,
                touchSlop: 0,
                enableKeyboardEvents: true
            },
            preview: true,
            transition: TouchTransition
        }
    ]
};

const PieceType = 'PUZZLE_PIECE';

const CustomDragLayer = ({ pieces, pieceWidth, pieceHeight, puzzleImagePath, gridCols }:any) => {
    const [{ isDragging, currentOffset, item }]:any = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
        item: monitor.getItem()
    }));

    if (!isDragging || !currentOffset) {
        return null;
    }

    const { x, y } = currentOffset;
    const piece = pieces.find(p => p.id === item.id);

    return (
        <div
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 100,
                left: 0,
                top: 0,
                width: '100%',
                height: '100%'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: pieceWidth,
                    height: pieceHeight,
                    backgroundImage: `url(${puzzleImagePath})`,
                    backgroundSize: `${pieceWidth * gridCols}px ${pieceHeight * 4}px`,
                    backgroundPosition: `-${piece.col * pieceWidth}px -${piece.row * pieceHeight}px`,
                    opacity: 0.8,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                    transform: 'translate(-50%, -50%)',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box'
                }}
            />
        </div>
    );
};

const useDragLayer = (collect) => {
    const [collected, setCollected] = useState({
        isDragging: false,
        currentOffset: null,
        item: null
    });
    const dragLayerRef = useRef(null);

    useEffect(() => {
        const dndContext = (window as any).__REACT_DND_CONTEXT__;

        if (!dndContext || !dndContext.dragDropManager) {
            return;
        }

        const monitor:any = dndContext.dragDropManager.getMonitor();

        const handleChange = () => {
            setCollected(collect(monitor));
        };

        const unsubscribe = monitor.subscribeToStateChange(handleChange);

        return () => {
            unsubscribe();
        };
    }, [collect]);

    return [collected, dragLayerRef];
};

const DraggablePiece = ({
                            id, image, left, top, row, col, pieceWidth, pieceHeight, zIndex,
                            isCompleted, gridCols, isInPuzzleArea
                        }: any) => {

    const [{isDragging}, drag]:any = useDrag(() => ({
        type: PieceType,
        item: { id, row, col, isInPuzzleArea },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        options: {
            touchStartThreshold: 0,
        }
    } as any));

    return (
        <div
            ref={drag as any}
            className="puzzle-piece"
            style={{
                position: 'absolute',
                left,
                top,
                width: pieceWidth,
                height: pieceHeight,
                backgroundImage: `url(${image})`,
                backgroundSize: `${pieceWidth * gridCols}px ${pieceHeight * 4}px`,
                backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
                opacity: isDragging ? 0.1 : 1,
                cursor: 'move',
                border: isCompleted ? 'none' : '1px solid #ccc',
                boxSizing: 'border-box',
                zIndex: zIndex || 1,
                transition: isDragging ? 'none' : 'border 0.3s ease',
                touchAction: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                boxShadow: isDragging ? 'none' : '0 2px 5px rgba(0,0,0,0.1)',
            }}
        />
    );
};

const DropZone = ({ id, left, top, onDrop, hasPiece, pieceWidth, pieceHeight }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: PieceType,
        drop: (item:any) => onDrop(item.id, id, item.isInPuzzleArea),
        canDrop: () => !hasPiece,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const dropZoneStyle = {
        position: 'absolute',
        left,
        top,
        width: pieceWidth,
        height: pieceHeight,
        border: isOver && canDrop ? '2px dashed #4CAF50' : '1px dashed #999',
        boxSizing: 'border-box',
        backgroundColor: isOver && canDrop ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
        transition: 'all 0.2s ease',
        zIndex: isOver ? 5 : 0,
        borderRadius: isOver && canDrop ? '4px' : '0',
    };

    return (
        <div
            ref={drop as any}
            className="drop-zone"
            style={dropZoneStyle as any}
        />
    );
};

const PiecesContainerDropZone = ({ onDrop, children, isDragging }) => {
    const [{ isOver }, drop] = useDrop({
        accept: PieceType,
        drop: (item:any) => {
            if (item.isInPuzzleArea) {
                onDrop(item.id);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop as any}
            style={{
                position: 'relative',
                height: 400,
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                padding: '10px',
                borderRadius: isOver ? '8px' : '0',
                transition: 'all 0.3s ease',
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

    const pieceWidth = 150;
    const pieceHeight = 100;
    const gridRows = 4;
    const gridCols = 2;

    const [placedPieces, setPlacedPieces] = useState({});
    const [timer, setTimer] = useState(15);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
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
        return formattedTime;
    };

    const handleOverlayClose = () => {
        setOverlay(false);
    };

    useEffect(() => {
        let startTime;

        if (!overlay) {
            startTime = Date.now();
            intervalRef.current = setInterval(() => {
                setSeconds(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setSeconds(0);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [overlay]);

    const pieces = Array.from({ length: gridRows * gridCols }, (_, i) => {
        const row = Math.floor(i / gridCols);
        const col = i % gridCols;
        return {
            id: `piece-${i}`,
            correctPos: { top: row * pieceHeight, left: col * pieceWidth },
            row,
            col,
        };
    });

    const initialLayout = [
        {id: "piece-0", top: 100, left:30},
        {id: "piece-1", top: 0, left:0},
        {id: "piece-2", top: 80, left:140},
        {id: "piece-3", top: 130, left:120},
        {id: "piece-4", top: 0, left:160},
        {id: "piece-5", top: 150, left:10},
        {id: "piece-6", top: 30, left:0},
        {id: "piece-7", top: 180, left:180},
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

    useEffect(() => {
        const dndContext = (window as any).__REACT_DND_CONTEXT__;

        if (!dndContext || !dndContext.dragDropManager) {
            return;
        }

        const monitor:any = dndContext.dragDropManager.getMonitor();

        const handleDragStateChange = () => {
            setIsDragging(monitor.isDragging());
        };

        const unsubscribe = monitor.subscribeToStateChange(handleDragStateChange);

        handleDragStateChange();

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isCompleted) {
            next();
        }
    }, [isCompleted, next]);

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
    }, [dispatch]);

    const handleDrop = (pieceId, zoneId, isFromPuzzleArea) => {
        const dropPiece = pieces.find((p) => p.id === pieceId);
        const dropZone = pieces.find((p) => p.id === zoneId);
        if (!dropPiece || !dropZone) return;

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        setMoveHistory(prev => [...prev, {...placedPieces}]);
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

    const handleRemoveFromPuzzle = (pieceId) => {
        setMoveHistory(prev => [...prev, {...placedPieces}]);
        setUndoDisabled(false);

        setPlacedPieces((prev) => {
            const updated = { ...prev };
            delete updated[pieceId];
            return updated;
        });

        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    };

    const handleUndo = () => {
        if (moveHistory.length > 0) {
            const lastState = moveHistory[moveHistory.length - 1];
            setPlacedPieces(lastState);
            setMoveHistory(prev => prev.slice(0, -1));
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
                                onClick={handleOverlayClose}
                            />
                        </div>
                        <p className="text-sm leading-relaxed">
                            Arrange the pieces to form the complete picture.
                        </p>
                    </div>
                </div>
            )}
            <div className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7]">
                <div>
                    <h1 className="text-sm font-medium mb-3 flex justify-center items-center gap-5">
                        TIMER
                        <span className="text-xl font-medium">
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
                                backgroundColor: '#FAF7E8',
                                minHeight: '100vh',
                                padding: '10px',
                            }}
                        >
                            {/* Custom drag layer for visible drag preview */}
                            <CustomDragLayer
                                pieces={pieces}
                                pieceWidth={pieceWidth}
                                pieceHeight={pieceHeight}
                                puzzleImagePath={puzzleImagePath}
                                gridCols={gridCols}
                            />
                            <div
                                className="puzzle-area"
                                style={{
                                    position: 'relative',
                                    width: pieceWidth * gridCols,
                                    height: pieceHeight * gridRows,
                                    margin: '0 auto 30px auto',
                                    borderRadius: '4px',
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
                                            (pos:any) =>
                                                pos.left === p.correctPos.left &&
                                                pos.top === p.correctPos.top
                                        )}
                                        pieceWidth={pieceWidth}
                                        pieceHeight={pieceHeight}
                                    />
                                ))}
                                {Object.entries(placedPieces).map(([id, pos]:[any,any]) => (
                                    <DraggablePiece
                                        key={`placed-${id}`}
                                        id={id}
                                        image={puzzleImagePath}
                                        left={pos.left}
                                        top={pos.top}
                                        row={pos.row}
                                        col={pos.col}
                                        pieceWidth={pieceWidth}
                                        pieceHeight={pieceHeight}
                                        isCompleted={isCompleted}
                                        gridCols={gridCols}
                                        isInPuzzleArea={true}
                                    />
                                ))}
                            </div>
                            <PiecesContainerDropZone
                                onDrop={handleRemoveFromPuzzle}
                                isDragging={isDragging}
                            >
                                {pieces.map((p) => {
                                    if (placedPieces[p.id]) return null;
                                    const initialPos = initialLayout.find((item) => item.id === p.id);
                                    let zIndex = 1;
                                    if (p.id === 'piece-7') zIndex = 10;
                                    if (p.id === 'piece-4') zIndex = 8;
                                    if (p.id === 'piece-5') zIndex = 6;
                                    if (p.id === 'piece-2') zIndex = 4;
                                    if (p.id === 'piece-3') zIndex = 2;

                                    return (
                                        <DraggablePiece
                                            key={`unplaced-${p.id}`}
                                            id={p.id}
                                            image={puzzleImagePath}
                                            left={initialPos.left}
                                            top={initialPos.top}
                                            row={p.row}
                                            col={p.col}
                                            pieceWidth={pieceWidth}
                                            pieceHeight={pieceHeight}
                                            zIndex={zIndex}
                                            isCompleted={isCompleted}
                                            gridCols={gridCols}
                                            isInPuzzleArea={false}
                                        />
                                    );
                                })}
                            </PiecesContainerDropZone>
                        </div>
                    </DndProvider>
                </div>
                <div className="flex justify-center items-center mt-6 w-full">
                    <Image
                        src="/images/puzzle.png"
                        priority={true}
                        sizes="100vw"
                        height={0}
                        width={0}
                        alt=""
                        className="w-2/3"
                    />
                </div>
            </div>
        </>
    );
};

export default PuzzleStep2;
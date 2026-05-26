import { Braces, Rose, Rows } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Cat } from "../cat";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@outlier-spa/component";

//crear los tipos de pieza y su color
type PieceType = "R" | "D" | "T" | "C" | "A" | "P";
type PieceColor = "white" | "black";

//estructura asignar valores
interface Piece {
  type: PieceType;
  color: PieceColor;
}
type PieceSelected = {
  piece: Piece;
  row: number;
  col: number;
  suggestions: Move[];
} | null;

//casilla
type Cell = Piece | null;

//tipo de movimiento
type Move = {
  row: number;
  col: number;
};

type Player = "white" | "black";

interface PieceAttribute {
  label: string;
  src: string;
  variant?: {
    black: string;
    white: string;
  };
}
const pieceAttribute: Record<string, PieceAttribute> = {
  C: { label: "Caballo", src: "♘", variant: { white: "♘", black: "♞" } },
  P: { label: "Peon", src: "♙", variant: { white: "♙", black: "♟" } },
  D: { label: "Reina", src: "♕", variant: { white: "♕", black: "♛" } },
  T: { label: "Torre", src: "♖", variant: { white: "♖", black: "♜" } },
  A: { label: "Alfil", src: "♗", variant: { white: "♗", black: "♝" } },
  R: { label: "Rey", src: "♔", variant: { white: "♔", black: "♚" } },
};

//tablero por defecto
const boardDefault: Cell[][] = [
  [
    { type: "T", color: "black" },
    { type: "C", color: "black" },
    { type: "A", color: "black" },
    { type: "D", color: "black" },
    { type: "R", color: "black" },
    { type: "A", color: "black" },
    { type: "C", color: "black" },
    { type: "T", color: "black" },
  ],
  [
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null, //{ type: "A", color: "black" },
    null,
    null,
  ],
  [null, null, null, { type: "R", color: "white" }, null, null, null, null],
  [
    null,
    null,
    null,
    { type: "T", color: "black" },
    { type: "P", color: "white" },
    null,
    null,
    null,
  ],
  [null, null, null, null, null, null, null, null],
  [
    { type: "P", color: "white" },
    { type: "P", color: "white" },
    { type: "P", color: "white" },
    { type: "P", color: "white" },
    { type: "P", color: "white" },
    { type: "P", color: "white" },
    { type: "P", color: "white" },
    { type: "P", color: "white" },
  ],
  [
    { type: "T", color: "white" },
    { type: "C", color: "white" },
    { type: "A", color: "white" },
    { type: "D", color: "white" }, //{ type: "D", color: "white" },
    null, //{ type: "R", color: "white" },

    { type: "A", color: "white" },
    { type: "C", color: "white" },
    { type: "T", color: "white" },
  ],
];
const LOCAL_STORAGE_KEY = "ajedrez";

export const Ajedrez = () => {
  // ESTADOS
  //tablero
  const [board, setBoard] = useState<Cell[][]>(() => {
    if (typeof window === "undefined") return boardDefault;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).board : boardDefault;
  });

  //turnos
  const [turn, setTurn] = useState<Player>(() => {
    if (typeof window === "undefined") return "white";
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).turn : "white";
  });
  const [pieceSelected, setPieceSelected] = useState<PieceSelected>(null);

  //piezas capturadas
  const [capturedWhite, setCapturedWhite] = useState<Cell[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).capturedWhite : [];
  });

  const [capturedBlack, setCapturedBlack] = useState<Cell[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).capturedBlack : [];
  });

  //mensaje en jaque
  const [messaje, setMessage] = useState("");

  const playTime = 20 * 60 * 1000;
  //tiempo por jugador
  const [whiteTime, setWhiteTime] = useState<number>(() => {
    if (typeof window === "undefined") return playTime;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).whiteTime : playTime;
  });

  const [blackTime, setBlackTime] = useState<number>(() => {
    if (typeof window === "undefined") return playTime;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).blackTime : playTime;
  });

  const [isRunning, setIsRunning] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).isRunning : false;
  });

  //enroque
  const [castling, setCastling] = useState(() => {
    if (typeof window === "undefined")
      return {
        white: {
          kingMoved: false,
          leftRookMoved: false,
          rightRookMoved: false,
        },
        black: {
          kingMoved: false,
          leftRookMoved: false,
          rightRookMoved: false,
        },
      };
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved).castling
      : {
          white: {
            kingMoved: false,
            leftRookMoved: false,
            rightRookMoved: false,
          },
          black: {
            kingMoved: false,
            leftRookMoved: false,
            rightRookMoved: false,
          },
        };
  });

  //FUNCIONES
  //funcion para validar limites | sirve para no devolver posiciones fuera del tablero
  const isInsideBoard = (row: number, col: number) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  const isEmptyCell = (
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ) => {
    return currentBoard[row][col] === null;
  };

  const isEnemyPiece = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ) => {
    const target = currentBoard[row][col];
    return target !== null && target.color !== piece.color;
  };
  const isFriendPiece = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ) => {
    const target = currentBoard[row][col];
    return target !== null && target.color === piece.color;
  };

  const isOwnPiece = (piece: Piece, row: number, col: number) => {
    const target = board[row][col];
    return (
      target !== null &&
      target.color == piece.color &&
      target.type === piece.type
    );
  };

  //VALIDACIONES DE CASILLAS

  // funcion rey
  const moveKing = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ) => {
    const moves = [
      { row: row - 1, col: col - 1 }, // diagonal izquierda abajo
      { row: row - 1, col }, // abajo
      { row: row - 1, col: col + 1 }, // diagonal derecha abajo
      { row, col: col - 1 }, // izquierda

      { row, col: col + 1 }, // derecha
      { row: row + 1, col: col - 1 }, // diagonal izquierda arriba
      { row: row + 1, col }, // arriba
      { row: row + 1, col: col + 1 }, // diagonal izquierda arroba
    ];

    // verificar si las torres izquierda no se ha movido
    // sed agrega el movimiento adicional a la izquierda
    // { row, col: col - 2 }, { row, col: col - 3 }, si es blanca { row, col: col - 2 }, si es negra

    // verificar si la tottre derecha no se ha movido
    // agreg los movimientos adicionales

    const validMoves = moves.filter((move) => {
      if (!isInsideBoard(move.row, move.col)) return false;

      if (isFriendPiece(piece, move.row, move.col, currentBoard)) return false;

      return true;
    });
    if (!castling[piece.color].kingMoved) {
      // enroque largo
      if (
        !castling[piece.color].leftRookMoved &&
        isEmptyCell(row, col - 1, currentBoard) &&
        isEmptyCell(row, col - 2, currentBoard) &&
        isEmptyCell(row, col - 3, currentBoard) &&
        currentBoard[row][0]?.type === "T" &&
        currentBoard[row][0]?.color === piece.color
      ) {
        validMoves.push({ row, col: col - 2 });
      }

      // enroque corto
      if (
        !castling[piece.color].rightRookMoved &&
        isEmptyCell(row, col + 1, currentBoard) &&
        isEmptyCell(row, col + 2, currentBoard) &&
        currentBoard[row][7]?.type === "T" &&
        currentBoard[row][7]?.color === piece.color
      ) {
        validMoves.push({ row, col: col + 2 });
      }
    }

    return validMoves;
  };
  //funcion del caballo
  const moveHorse = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ): Move[] => {
    const moves = [
      { row: row - 2, col: col - 1 },
      { row: row - 2, col: col + 1 },
      { row: row - 1, col: col - 2 },
      { row: row - 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col - 1 },
      { row: row + 2, col: col + 1 },
    ];

    return moves.filter((move) => {
      if (!isInsideBoard(move.row, move.col)) return false;

      if (isFriendPiece(piece, move.row, move.col, currentBoard)) return false;

      return true;
    });
  };

  //funcion reina|dama
  const moveQueen = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ) => {
    return [
      ...moveTower(piece, row, col, currentBoard),
      ...moveBishop(piece, row, col, currentBoard),
    ];
  };
  //funcion torre

  const moveTower = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ): Move[] => {
    const moves: Move[] = [];

    const directions = [
      { r: -1, c: 0 },
      { r: 1, c: 0 },
      { r: 0, c: -1 },
      { r: 0, c: 1 },
    ];

    for (const d of directions) {
      let i = 1;
      while (true) {
        const newRow = row + d.r * i;
        const newCol = col + d.c * i;

        if (!isInsideBoard(newRow, newCol)) break;

        if (isEmptyCell(newRow, newCol, currentBoard)) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (isEnemyPiece(piece, newRow, newCol, currentBoard)) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
        i++;
      }
    }

    return moves;
  };

  //funcion alfil
  const moveBishop = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ) => {
    const moves: Move[] = [];

    const directions = [
      { r: -1, c: -1 }, //izquierda arriba
      { r: -1, c: 1 }, //arriba derecha
      { r: 1, c: 1 }, //abajo derecha
      { r: 1, c: -1 }, //abajo izquiera
    ];

    for (const d of directions) {
      let i = 1;

      while (true) {
        const newRow = row + d.r * i;
        const newCol = col + d.c * i;
        if (!isInsideBoard(newRow, newCol)) break;
        if (isEmptyCell(newRow, newCol, currentBoard)) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (isEnemyPiece(piece, newRow, newCol, currentBoard)) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
        i++;
      }
    }

    return moves;
  };
  //funcion peon
  const movePawn = (
    piece: Piece,
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ): Move[] => {
    const moves: Move[] = [];

    const defaultRows = [1, 6];
    const multiplier = defaultRows.includes(row) ? 2 : 1;
    const direction = piece.color === "white" ? -1 : 1;

    // avance hacia adelante
    for (let index = 0; index < multiplier; index++) {
      const nextRow = row + (index + 1) * direction;

      if (!isInsideBoard(nextRow, col)) break;

      if (!isEmptyCell(nextRow, col, currentBoard)) break;

      moves.push({ row: nextRow, col });
    }

    // diagonales para capturar
    //const diagonalLeftCol = col - 1;
    //const diagonalRightCol = col + 1;
    //const nextRow = row + direction;

    //if (
    //isInsideBoard(nextRow, diagonalLeftCol) &&
    //isEnemyPiece(piece, nextRow, diagonalLeftCol)
    //) {
    // moves.push({ row: nextRow, col: diagonalLeftCol });
    //}

    //if (
    //isInsideBoard(nextRow, diagonalRightCol) &&
    //isEnemyPiece(piece, nextRow, diagonalRightCol)
    //) {
    // moves.push({ row: nextRow, col: diagonalRightCol });
    //}

    //llama a movimientos atancantes en diagonal
    const attackMoves = getPawnAttackMoves(piece, row, col);

    attackMoves.forEach((move) => {
      if (isEnemyPiece(piece, move.row, move.col, currentBoard)) {
        moves.push(move);
      }
    });

    return moves;
  };

  //obtener los movimientos
  const getPossibleMoves = (
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ): Move[] => {
    const piece = currentBoard[row][col];

    if (!piece) return [];
    //casos
    switch (piece.type) {
      case "C":
        return moveHorse(piece, row, col, currentBoard);
      case "R":
        return moveKing(piece, row, col, currentBoard);
      case "D":
        return moveQueen(piece, row, col, currentBoard);
      case "T":
        return moveTower(piece, row, col, currentBoard);
      case "A":
        return moveBishop(piece, row, col, currentBoard);
      case "P":
        return movePawn(piece, row, col, currentBoard);
      default:
        return [];
    }
  };

  const movePiece = (toRow: number, toCol: number) => {
    if (!pieceSelected) return;

    const newBoard = board.map((row) => [...row]);

    const capturedPiece = newBoard[toRow][toCol];

    if (capturedPiece) {
      if (pieceSelected.piece.color === "white") {
        setCapturedBlack((prev) => [...prev, capturedPiece]);
      } else {
        setCapturedWhite((prev) => [...prev, capturedPiece]);
      }
    }

    newBoard[toRow][toCol] = pieceSelected.piece;
    newBoard[pieceSelected.row][pieceSelected.col] = null;

    //enroque
    const isCastlingMove =
      pieceSelected.piece.type === "R" &&
      Math.abs(toCol - pieceSelected.col) === 2;

    if (isCastlingMove) {
      const row = pieceSelected.row;
      const isShortCastle = toCol > pieceSelected.col;

      const rookFromCol = isShortCastle ? 7 : 0;
      const rookToCol = isShortCastle ? 5 : 3;

      newBoard[row][rookToCol] = newBoard[row][rookFromCol];
      newBoard[row][rookFromCol] = null;
    }

    setCastling((prev: any) => {
      const color = pieceSelected.piece.color;
      const next = {
        ...prev,
        [color]: { ...prev[color] },
      };

      if (pieceSelected.piece.type === "R") {
        next[color].kingMoved = true;
      }

      if (pieceSelected.piece.type === "T") {
        if (pieceSelected.col === 0) next[color].leftRookMoved = true;
        if (pieceSelected.col === 7) next[color].rightRookMoved = true;
      }

      return next;
    });

    setBoard(newBoard);
    setPieceSelected(null);
    setTurn(turn === "white" ? "black" : "white");
  };
  //manejar pieza seleccionada
  const handleSelectPiece = (row: number, col: number) => {
    if (!isRunning) {
      return;
    }
    if (pieceSelected) {
      const isSuggestion = pieceSelected.suggestions.some(
        (move) => move.row === row && move.col === col,
      );

      if (isSuggestion) {
        movePiece(row, col);
        return;
      }
    }
    const piece = board[row][col];

    if (!piece) {
      setPieceSelected(null);
      return;
    }
    if (piece.color != turn) {
      return;
    }

    let suggestions = getPossibleMoves(row, col);
    suggestions = suggestions.filter(
      (move) => !movementLeavesKingInCheck(row, col, move.row, move.col, turn),
    );
    console.log({ suggestions, piece });

    setPieceSelected({ piece, row, col, suggestions });
  };

  //Rey en Jaque
  //encontar al rey
  const findKing = (color: PieceColor, currentBoard: Cell[][]) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];

        if (piece?.type === "R" && piece.color === color) {
          return { row, col };
        }
      }
    }
    return null;
  };
  //saber si el peon amenza al rey
  const getPawnAttackMoves = (
    piece: Piece,
    row: number,
    col: number,
  ): Move[] => {
    const direction = piece.color === "white" ? -1 : 1;

    return [
      { row: row + direction, col: col - 1 },
      { row: row + direction, col: col + 1 },
    ].filter((move) => isInsideBoard(move.row, move.col));
  };
  //ataque
  const getAttackMoves = (
    row: number,
    col: number,
    currentBoard: Cell[][] = board,
  ): Move[] => {
    const piece = currentBoard[row][col];

    if (!piece) return [];

    if (piece.type === "P") {
      return getPawnAttackMoves(piece, row, col);
    }
    if (piece.type === "R") {
      const kingMoves = [
        { row: row - 1, col: col - 1 },
        { row: row - 1, col },
        { row: row - 1, col: col + 1 },
        { row, col: col - 1 },
        { row, col: col + 1 },
        { row: row + 1, col: col - 1 },
        { row: row + 1, col },
        { row: row + 1, col: col + 1 },
      ];
      //  casilla este dentro del tablero de 8x8
      return kingMoves.filter((move) => isInsideBoard(move.row, move.col));
    }

    return getPossibleMoves(row, col, currentBoard);
  };
  // funcion que detecta el jaque
  const isKingInCheck = (color: PieceColor, currentBoard: Cell[][] = board) => {
    // posición del rey
    const kingPosition = findKing(color, currentBoard);

    if (!kingPosition) return false;

    //  color del enemigo
    const enemyColor = color === "white" ? "black" : "white";

    //  ataques del enemigo
    const enemyAttacks = getSquaresAttackedByColor(enemyColor, currentBoard);

    // jaque si esta dentro del radar enemigo
    const kingIsThreatened = enemyAttacks.some(
      (move) => move.row === kingPosition.row && move.col === kingPosition.col,
    );

    return kingIsThreatened;
  };

  useEffect(() => {
    if (isCheckmate("white")) {
      setMessage("Jaque mate al rey Blanco. ¡Gana Negro!");
      setIsRunning(false);
      return;
    }

    if (isCheckmate("black")) {
      setMessage("Jaque mate al rey Negro. ¡Gana Blanco!");
      setIsRunning(false);
      return;
    }

    if (isKingInCheck("white")) {
      setMessage("Jaque al rey Blanco");
    } else if (isKingInCheck("black")) {
      setMessage("Jaque al rey Negro");
    } else {
      setMessage("");
    }
  }, [board]);

  //jaque mate
  // Simula un movimiento y evalu si el rey sigue en jaque
  const movementLeavesKingInCheck = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    color: PieceColor,
  ): boolean => {
    // proximidad antes de simular la captura
    const movingPiece = board[fromRow][fromCol];
    if (movingPiece && movingPiece.type === "R") {
      const enemyColor = color === "white" ? "black" : "white";
      const enemyKingPos = findKing(enemyColor, board);
      if (enemyKingPos) {
        const rowDist = Math.abs(toRow - enemyKingPos.row);
        const colDist = Math.abs(toCol - enemyKingPos.col);
        if (rowDist <= 1 && colDist <= 1) {
          return true; // el rey no puede acercarse al otro rey
        }
      }
    }

    //  simulación
    const simulatedBoard = board.map((row) =>
      row.map((cell) => (cell ? { ...cell } : null)),
    );

    simulatedBoard[toRow][toCol] = simulatedBoard[fromRow][fromCol];
    simulatedBoard[fromRow][fromCol] = null;

    return isKingInCheck(color, simulatedBoard);
  };

  //si esta en jaque
  const isCheckmate = (color: PieceColor): boolean => {
    if (!isKingInCheck(color)) return false;

    //movimiento que salve al rey
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];

        if (!piece || piece.color !== color) continue;

        const possibleMoves = getPossibleMoves(r, c);

        const hasEscapeRoute = possibleMoves.some(
          (move) => !movementLeavesKingInCheck(r, c, move.row, move.col, color),
        );

        if (hasEscapeRoute) {
          return false; //jugador encontro una escapatoria legal
        }
      }
    }

    return true;
  };
  //casilla atacada
  const getSquaresAttackedByColor = (
    color: PieceColor,
    currentBoard: Cell[][] = board,
  ): Move[] => {
    const attackedSquares: Move[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];

        // Si la pieza pertenece al color atacante  guardamos sus objetivos
        if (piece && piece.color === color) {
          const attacks = getAttackMoves(row, col, currentBoard);
          attackedSquares.push(...attacks);
        }
      }
    }

    return attackedSquares;
  };

  // Temporizador
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (turn === "white") {
        setWhiteTime((prev) => Math.max(prev - 10, 0));
      } else {
        setBlackTime((prev) => Math.max(prev - 10, 0));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [turn, isRunning]);

  const addZero = (value: number) => value.toString().padStart(2, "0");

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${addZero(minutes)}:${addZero(seconds)}:${addZero(milliseconds)}`;
  };

  //funcion para resetear
  const resetBoard = () => {
    setBoard(boardDefault.map((row) => [...row]));
    setPieceSelected(null);
    setTurn("white");
    setCapturedWhite([]);
    setCapturedBlack([]);
    setWhiteTime(playTime);
    setBlackTime(playTime);
    setIsRunning(true);
    setCastling({
      white: {
        kingMoved: false,
        leftRookMoved: false,
        rightRookMoved: false,
      },
      black: {
        kingMoved: false,
        leftRookMoved: false,
        rightRookMoved: false,
      },
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  //iniciar
  const startBoard = () => {
    setIsRunning(true);
  };

  //funcion para terminar
  const finish = () => {
    setBoard(boardDefault.map((row) => [...row]));
    setPieceSelected(null);
    setTurn("white");
    setCapturedWhite([]);
    setCapturedBlack([]);
    setWhiteTime(playTime);
    setBlackTime(playTime);
    setIsRunning(false);
    setCastling({
      white: {
        kingMoved: false,
        leftRookMoved: false,
        rightRookMoved: false,
      },
      black: {
        kingMoved: false,
        leftRookMoved: false,
        rightRookMoved: false,
      },
    });
  };
  // funcion render
  const pieceRender = (cell: Cell) => {
    return (
      cell &&
      cell.type &&
      (pieceAttribute[cell.type]?.variant?.[cell.color] ??
        `${cell?.type}${cell?.color && cell.color == "white" ? "" : "+"}`)
    );
  };

  useEffect(() => {
    const gameState = {
      board,
      turn,
      capturedWhite,
      capturedBlack,
      whiteTime,
      blackTime,
      isRunning,
      castling,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
  }, [
    board,
    turn,
    capturedWhite,
    capturedBlack,
    whiteTime,
    blackTime,
    isRunning,
    castling,
  ]);
  useEffect(() => {
    const savedGame = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedGame) return;

    const parsedGame = JSON.parse(savedGame);

    setBoard(parsedGame.board);
    setTurn(parsedGame.turn);
    setCapturedWhite(parsedGame.capturedWhite);
    setCapturedBlack(parsedGame.capturedBlack);
    setWhiteTime(parsedGame.whiteTime);
    setBlackTime(parsedGame.blackTime);
    setIsRunning(parsedGame.isRunning);
    setCastling(parsedGame.castling);
  }, []);
  const BoxNumber = () => {
    const number =
      "w-12 h-12.5 flex justify-center items-center border border-transparent  ";
    return (
      <>
        <div className="flex flex-col text-2xl   ">
          <span className={number}>1</span>

          <span className={number}>2</span>
          <span className={number}>3</span>
          <span className={number}>4</span>
          <span className={number}>5</span>
          <span className={number}>6</span>
          <span className={number}>7</span>
          <span className={number}>8</span>
        </div>
      </>
    );
  };
  const BoxLetter = () => {
    const letter =
      "justify-center text-center items-center h-12 w-12  pt-2 border border-transparent ";

    return (
      <>
        <div className="flex flex-row text-2xl ml-11.5">
          <span className={letter}>a</span>
          <span className={letter}>b</span>
          <span className={letter}>c</span>
          <span className={letter}>d</span>
          <span className={letter}>e</span>
          <span className={letter}>f</span>
          <span className={letter}>g</span>
          <span className={letter}>h</span>
        </div>
      </>
    );
  };

  return (
    <div>
      <Tabs>
        <div className="mt-50 w-300 flex flex-row justify-center gap-5 ">
          <div className=" rounded-2xl w-70 h-30 flex flex-col gap-2 bg-neutral-100 p-3 mt-2  shadow-sm">
            <p className="font-semibold text-sm text-neutral-700">
              Piezas blancas capturadas:
            </p>
            <div className="flex flex-wrap gap-1 text-4xl text-black">
              {capturedWhite.length > 0 ? (
                capturedWhite.map((cell: Cell, index) => (
                  <span
                    key={index}
                    className="inline-block transition-transform hover:scale-110"
                  >
                    {pieceRender(cell)}
                  </span>
                ))
              ) : (
                <span className="text-sm text-neutral-400 italic pt-2">
                  Ninguna
                </span>
              )}
            </div>
          </div>
          <div className="w-120 ">
            <div className="p-4">
              <p className="font-bold font-mono text-[30px] text-center">
                Ajedrez
              </p>
              <p className="mt-2 text-center">Turno de "{turn}"</p>
            </div>
            <div className="flex justify-center items-center  ">
              <div className="flex justify-center w-40 text-white bg-gray-500 border border-gray-400 rounded-2xl shadow-sm ">
                Tiempo: {formatTime(blackTime)}
              </div>
            </div>
            <BoxLetter></BoxLetter>
            <div className="flex flex-row">
              <BoxNumber></BoxNumber>
              <div>
                <div>
                  <div>
                    {board.map((row, rowIndex) => {
                      const enemyColor = turn === "white" ? "black" : "white";
                      const enemyThreats = getSquaresAttackedByColor(
                        enemyColor,
                        board,
                      );

                      return (
                        <div key={rowIndex} className="flex border w-95">
                          {row.map((cell, colIndex) => {
                            const isWhite = (rowIndex + colIndex) % 2 === 0;
                            const isPossibleMove =
                              pieceSelected?.suggestions.some(
                                (move) =>
                                  move.row === rowIndex &&
                                  move.col === colIndex,
                              );

                            const isSquareUnderAttack = enemyThreats.some(
                              (threat) =>
                                threat.row === rowIndex &&
                                threat.col === colIndex,
                            );

                            const isPieceThreatened =
                              cell !== null &&
                              cell.color === turn &&
                              isSquareUnderAttack;

                            return (
                              <button
                                key={`${rowIndex}-${colIndex}`}
                                className={`relative w-12 h-12 ${
                                  isWhite
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                }`}
                                onClick={() =>
                                  handleSelectPiece(rowIndex, colIndex)
                                }
                              >
                                º
                                {isPieceThreatened && (
                                  <span className="absolute inset-0 bg-red-500/40 z-0"></span>
                                )}
                                {isPossibleMove && (
                                  <span className="absolute inset-0 bg-green-400/40 z-0"></span>
                                )}
                                <span className="relative z-10 text-4xl">
                                  {pieceRender(cell)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <BoxNumber></BoxNumber>
            </div>

            <BoxLetter></BoxLetter>
            <div className="flex justify-center items-center ">
              <div className="flex justify-center items-center w-40 bg-gray-500 border border-gray-400 rounded-2xl text-white shadow-sm ">
                Tiempo: {formatTime(whiteTime)}
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="w-25 h-10 left-35 bg-green-600 text-white border border-green-500 hover:bg-green-500 rounded-md"
                onClick={startBoard}
              >
                Start
              </button>
              <button
                className="w-25 h-10 left-35 bg-amber-500 border text-white border-amber-400 hover:bg-amber-400 rounded-md"
                onClick={resetBoard}
              >
                Reset
              </button>
              <button
                className="w-25 h-10 left-35 bg-red-600 text-white border border-red-500 hover:bg-red-500 rounded-md"
                onClick={finish}
              >
                Terminar
              </button>
            </div>
            <div className="top-10 flex justify-center mt-4 bg-amber-100 border border-amber-100 rounded-2xl  ">
              {messaje && (
                <p className="text-center font-bold flex text-[20px]">
                  {messaje}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className=" rounded-2xl w-70 h-30 flex flex-col gap-2 bg-neutral-100 p-3 shadow-sm mt-2 mr-2 ">
              <p className="font-semibold text-sm text-neutral-700">
                Piezas negras capturadas:
              </p>
              <div className="flex flex-wrap gap-1 text-4xl text-black">
                {capturedBlack.length > 0 ? (
                  capturedBlack.map((cell: Cell, index) => (
                    <span
                      key={index}
                      className="inline-block transition-transform hover:scale-110"
                    >
                      {pieceRender(cell)}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-neutral-400 italic pt-2">
                    Ninguna
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

import { Braces, Rose, Rows } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
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
    null, //{ type: "D", color: "black" },
    { type: "R", color: "black" },
    null, //{ type: "A", color: "black" },
    { type: "C", color: "black" },
    { type: "T", color: "black" },
  ],
  [
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
    { type: "P", color: "white" },
    { type: "P", color: "black" },
    { type: "P", color: "black" },
  ],
  [null, null, null, null, { type: "A", color: "black" }, null, null, null],
  [null, null, null, { type: "R", color: "white" }, null, null, null, null],
  [null, null, null, null, null, null, null, null],
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
    // { type: "R", color: "white" },
    null,
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

  //tiempo por jugador
  const [whiteTime, setWhiteTime] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).whiteTime : 0;
  });

  const [blackTime, setBlackTime] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).blackTime : 0;
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

  const isEmptyCell = (row: number, col: number) => {
    return board[row][col] === null;
  };

  const isEnemyPiece = (piece: Piece, row: number, col: number) => {
    const target = board[row][col];
    return target !== null && target.color !== piece.color;
  };
  const isFriendPiece = (piece: Piece, row: number, col: number) => {
    const target = board[row][col];
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
  const moveKing = (piece: Piece, row: number, col: number) => {
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

      if (isFriendPiece(piece, move.row, move.col)) return false;

      return true;
    });
    if (!castling[piece.color].kingMoved) {
      // enroque largo
      if (
        !castling[piece.color].leftRookMoved &&
        isEmptyCell(row, col - 1) &&
        isEmptyCell(row, col - 2) &&
        isEmptyCell(row, col - 3) &&
        board[row][0]?.type === "T" &&
        board[row][0]?.color === piece.color
      ) {
        validMoves.push({ row, col: col - 2 });
      }

      // enroque corto
      if (
        !castling[piece.color].rightRookMoved &&
        isEmptyCell(row, col + 1) &&
        isEmptyCell(row, col + 2) &&
        board[row][7]?.type === "T" &&
        board[row][7]?.color === piece.color
      ) {
        validMoves.push({ row, col: col + 2 });
      }
    }

    return validMoves;
  };
  //funcion del caballo
  const moveHorse = (piece: Piece, row: number, col: number): Move[] => {
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

      if (isFriendPiece(piece, move.row, move.col)) return false;

      return true;
    });
  };

  //funcion reina|dama
  const moveQueen = (piece: Piece, row: number, col: number) => {
    return [...moveTower(piece, row, col), ...moveBishop(piece, row, col)];
  };
  //funcion torre
  const moveTower = (piece: Piece, row: number, col: number): Move[] => {
    const moves: Move[] = [];

    let isUpBreak = false;
    let isDownBreak = false;
    let isLeftBreak = false;
    let isRightBreak = false;
    for (let i = row - 1; i >= 0; i--) {
      const isEmpty = isEmptyCell(i, col);
      const isEnemy = isEnemyPiece(piece, i, col);
      const isFriends = isFriendPiece(piece, i, col);

      if (isEmpty) {
        moves.push({ row: i, col });
      }
      if (isEnemy && !isUpBreak) {
        moves.push({ row: i, col });
        isUpBreak = true;
      }

      const distance = Math.abs(i - row);

      if (isFriends && distance === 1) {
        break;
      }
      if (isFriends) {
        break;
      }
      if (isFriends && !isUpBreak && distance > 1) {
        moves.push({ row: i + 1, col });
        isUpBreak = true;
        break;
      }
    }

    for (let i = row + 1; i < 8; i++) {
      const isEmpty = isEmptyCell(i, col);
      const isEnemy = isEnemyPiece(piece, i, col);
      const isFriends = isFriendPiece(piece, i, col);
      const distance = Math.abs(i - row);
      if (isEmpty) {
        moves.push({ row: i, col });
      }
      if (isEnemy && !isDownBreak) {
        moves.push({ row: i, col });
        isDownBreak = true;
      }

      if (isFriends && distance === 1) {
        break;
      }
      if (isFriends) {
        break;
      }
      console.log({ piece, isFriends, isDownBreak, distance });
      if (isFriends && !isDownBreak && distance > 1) {
        moves.push({ row: i - 1, col });
        isDownBreak = true;
        break;
      }
    }
    for (let i = col - 1; i >= 0; i--) {
      const isEmpty = isEmptyCell(row, i);
      const isEnemy = isEnemyPiece(piece, row, i);
      const isFriends = isFriendPiece(piece, row, i);

      if (isEmpty) {
        moves.push({ row, col: i });
      }

      if (isEnemy && !isLeftBreak) {
        moves.push({ row, col: i });
        isLeftBreak = true;
      }
      const distance = Math.abs(i - col);
      if (isFriends && distance === 1) {
        break;
      }
      if (isFriends) {
        break;
      }

      if (isFriends && !isLeftBreak && distance > 1) {
        moves.push({ row, col: i });
        isUpBreak = true;
        break;
      }
    }

    for (let i = col + 1; i < 8; i++) {
      const isEmpty = isEmptyCell(row, i);
      const isEnemy = isEnemyPiece(piece, row, i);
      const isFriends = isFriendPiece(piece, row, i);

      if (isEmpty) {
        moves.push({ row, col: i });
      }

      if (isEnemy && !isRightBreak) {
        moves.push({ row, col: i });
        isDownBreak = true;
      }
      const distance = Math.abs(i - col);
      if (isFriends && distance === 1) {
        break;
      }
      if (isFriends) {
        break;
      }
      if (isFriends && !isRightBreak && distance > 1) {
        moves.push({ row, col: i - 1 });
        isRightBreak = true;
        break;
      }
    }

    return moves;
  };

  //funcion alfil
  const moveBishop = (piece: Piece, row: number, col: number) => {
    const moves: Move[] = [];
    //arriba izq
    for (let i = 1; i < 8; i++) {
      const newRow = row - i;
      const newCol = col - i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        break;
      }
    }
    //arriba derecha
    let breakLeftDown = false;
    for (let i = 1; i < 8; i++) {
      const newRow = row - i;
      const newCol = col + i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }

      if (isEnemyPiece(piece, newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        break;
      }
    }
    //abajo izquierda
    for (let i = 1; i < 8; i++) {
      const newRow = row + i;
      const newCol = col - i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      const distance = newRow - row / newCol - col;
      console.log({ distance, row, col, newRow, newCol });
      if (isEnemyPiece(piece, newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        break;
      }
    }
    //abajo derecha
    for (let i = 1; i < 8; i++) {
      const newRow = row + i;
      const newCol = col + i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        break;
      }
    }

    return moves;
  };
  //funcion peon
  const movePawn = (piece: Piece, row: number, col: number): Move[] => {
    const moves: Move[] = [];

    const defaultRows = [1, 6];
    const multiplier = defaultRows.includes(row) ? 2 : 1;
    const direction = piece.color === "white" ? -1 : 1;

    // avance hacia adelante
    for (let index = 0; index < multiplier; index++) {
      const nextRow = row + (index + 1) * direction;

      if (!isInsideBoard(nextRow, col)) break;

      // si hay una pieza al frente, ya no puede seguir avanzando
      if (!isEmptyCell(nextRow, col)) break;

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
      if (isEnemyPiece(piece, move.row, move.col)) {
        moves.push(move);
      }
    });

    return moves;
  };

  //obtener los movimientos
  const getPossibleMoves = (row: number, col: number): Move[] => {
    const piece = board[row][col];

    if (!piece) return [];
    //casos
    switch (piece.type) {
      case "C":
        return moveHorse(piece, row, col);
      case "R":
        return moveKing(piece, row, col);
      case "D":
        return moveQueen(piece, row, col);
      case "T":
        return moveTower(piece, row, col);
      case "A":
        return moveBishop(piece, row, col);
      case "P":
        return movePawn(piece, row, col);
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
  const findKing = (color: PieceColor) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];

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
  const getAttackMoves = (row: number, col: number): Move[] => {
    const piece = board[row][col];

    if (!piece) return [];

    if (piece.type === "P") {
      return getPawnAttackMoves(piece, row, col);
    }

    return getPossibleMoves(row, col);
  };

  // funcion que detecta el jaque
  const isKingInCheck = (color: PieceColor) => {
    const kingPosition = findKing(color);

    if (!kingPosition) return false;

    const enemyColor = color === "white" ? "black" : "white";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const currentCell = board[row][col];
        const piece =
          Object.keys(currentCell || {}).length === 0 ? null : currentCell;
        if (!piece || (piece && piece.color !== enemyColor)) continue;

        {
          const attackMoves = getAttackMoves(row, col);
          const isThreateningKing = attackMoves.some(
            (move) =>
              move.row === kingPosition.row && move.col === kingPosition.col,
          );

          console.log({ piece, row, col, attackMoves, isThreateningKing });
          if (isThreateningKing) {
            return true;
          }
        }
      }
    }
    return false;
  };

  //   useEffect(() => {
  //     if (isCheckmate("white")) {
  //       setMessage("Jaque mate al rey Blanco. ¡Gana Negro!");
  //       setIsRunning(false);
  //       return;
  //     }

  //     if (isCheckmate("black")) {
  //       setMessage("Jaque mate al rey Negro. ¡Gana Blanco!");
  //       setIsRunning(false);
  //       return;
  //     }

  //     if (isKingInCheck("white")) {
  //       setMessage("Jaque al rey Blanco");
  //     } else if (isKingInCheck("black")) {
  //       setMessage("Jaque al rey Negro");
  //     } else {
  //       setMessage("");
  //     }
  //   }, [board]);

  //que pieza esta dando jaque
  const getCheckingPieces = (color: PieceColor): Move[] => {
    const kingPosition = findKing(color);

    if (!kingPosition) return [];

    const enemyColor = color === "white" ? "black" : "white";
    const threats: Move[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];

        if (!piece || piece.color !== enemyColor) continue;

        const attackMoves = getAttackMoves(row, col);

        const isThreateningKing = attackMoves.some(
          (move) =>
            move.row === kingPosition.row && move.col === kingPosition.col,
        );

        if (isThreateningKing) {
          threats.push({ row, col });
        }
      }
    }

    return threats;
  };
  //jaque mate
  // Simula un movimiento y evalúa si el rey sigue en jaque
  const movementLeavesKingInCheck = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    color: PieceColor,
  ): boolean => {
    const newBoard = board;
    const originalSource = { ...newBoard[fromRow][fromCol] } as Cell;
    const originalTarget = { ...newBoard[toRow][toCol] } as Cell;

    newBoard[toRow][toCol] = originalSource;
    newBoard[fromRow][fromCol] = null;
    let checkingAfterMove = false;
    if (toRow === 4 && toCol === 2) {
      checkingAfterMove = isKingInCheck(color);
      console.log({
        checkingAfterMove,
        fromRow,
        fromCol,
        toRow,
        toCol,
        newBoard,
      });
    }

    newBoard[fromRow][fromCol] = originalSource;
    newBoard[toRow][toCol] =
      Object.keys(originalTarget || {}).length === 0 ? null : originalTarget;

    return checkingAfterMove;
  };

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

  // Cronometro
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (turn === "white") {
        setWhiteTime((prev) => prev + 10);
      } else {
        setBlackTime((prev) => prev + 10);
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
    setWhiteTime(0);
    setBlackTime(0);
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
    setWhiteTime(0);
    setBlackTime(0);
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
  return (
    <div className="mt-50">
      <div className="absolute left-80 top-85 w-60 rounded-2xl text-center flex">
        <p>Piezas blancas capturadas: </p>
        <div className="grid grid-cols-4 text-4xl ">
          {capturedWhite.map((piece) => pieceRender(piece)) || "Ninguna"}
        </div>
      </div>
      <div className="p-4">
        <p className="font-bold font-mono text-[30px] text-center">Ajedrez</p>
        <p className="mt-2 text-center">Turno de "{turn}"</p>
      </div>
      <div className="flex justify-center items-center w-full">
        Tiempo: {formatTime(blackTime)}
      </div>

      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex border w-95">
          {row.map((cell, colIndex) => {
            const isWhite = (rowIndex + colIndex) % 2 === 0;
            const isPossibleMove = pieceSelected?.suggestions.some(
              (move) => move.row === rowIndex && move.col === colIndex,
            );

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`relative w-12 h-12 ${
                  isWhite ? "bg-white text-black" : "bg-black text-white"
                }`}
                onClick={() => handleSelectPiece(rowIndex, colIndex)}
              >
                {isPossibleMove && (
                  <span className="absolute inset-0 bg-green-400/40"></span>
                )}

                <span className="relative z-10 text-4xl">
                  {pieceRender(cell)}
                </span>
              </button>
            );
          })}
        </div>
      ))}
      <div className="flex justify-center items-center w-full">
        Tiempo: {formatTime(whiteTime)}
      </div>
      <div className="  absolute   rounded-2xl right-40 w-70 flex">
        <p className="text-center">Piezas negras capturadas: </p>
        <div className="grid grid-cols-4 text-4xl">
          {capturedBlack.map((cell: Cell) => pieceRender(cell)) || "Ninguna"}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button
          className="w-25 h-10 left-35 bg-amber-400 border border-amber-100 hover:bg-amber-300 rounded-md"
          onClick={startBoard}
        >
          Start
        </button>
        <button
          className="w-25 h-10 left-35 bg-amber-400 border border-amber-100 hover:bg-amber-300 rounded-md"
          onClick={resetBoard}
        >
          Reset
        </button>
        <button
          className="w-25 h-10 left-35 bg-amber-400 border border-amber-100 hover:bg-amber-300 rounded-md"
          onClick={finish}
        >
          Terminar
        </button>
      </div>

      <div className="relative top-10">
        {" "}
        {messaje && (
          <p className="text-center font-bold flex text-[20px]">{messaje}</p>
        )}
      </div>
    </div>
  );
};

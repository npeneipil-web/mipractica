import { Braces, Rose } from "lucide-react";
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

interface PieceAttribute {
  label: string;
  src: string;
}
const pieceAttribute: Record<string, PieceAttribute> = {
  C: { label: "Caballo", src: "" },
  P: { label: "Peon", src: "" },
};

//tablero por defecto
const boardDefault: Cell[][] = [
  [
    { type: "T", color: "black" },
    { type: "C", color: "black" },
    { type: "A", color: "black" },
    { type: "R", color: "black" },
    { type: "D", color: "black" },
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
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
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
    { type: "R", color: "white" },
    { type: "D", color: "white" },
    { type: "A", color: "white" },
    { type: "C", color: "white" },
    { type: "T", color: "white" },
  ],
];

export const Ajedrez = () => {
  // ESTADOS
  //tablero
  const [board, setBoard] = useState<Cell[][]>(boardDefault);
  // guarda las sugerencia
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);
  //pieza tomada

  const [pieceSelected, setPieceSelected] = useState<PieceSelected>(null);

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
      { row: row - 1, col: col - 1 },
      { row: row - 1, col },
      { row: row - 1, col: col + 1 },
      { row, col: col - 1 },
      { row, col: col + 1 },
      { row: row + 1, col: col - 1 },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
    ];
    return moves.filter((move) => {
      if (!isInsideBoard(move.row, move.col)) return false;

      if (isFriendPiece(piece, move.row, move.col)) return false;

      return true;
    });
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
      const isFriend = isFriendPiece(piece, i, col);

      if (isEmpty) {
        moves.push({ row: i, col });
      }
      if (isEnemy && !isUpBreak) {
        moves.push({ row: i, col });
        isUpBreak = true;
        break;
      }

      const distance = Math.abs(i - row);

      if (isFriend && distance === 1) {
        break;
      }

      if (isFriend && !isUpBreak && distance > 1) {
        moves.push({ row: i + 1, col });
        isUpBreak = true;
        break;
      }
    }

    for (let i = row + 1; i < 8; i++) {
      const isEmpty = isEmptyCell(i, col);
      const isEnemy = isEnemyPiece(piece, i, col);
      const isFriend = isFriendPiece(piece, i, col);
      const distance = Math.abs(i - row);
      if (isEmpty) {
        moves.push({ row: i, col });
      }
      if (isEnemy && !isDownBreak) {
        moves.push({ row: i, col });
        isDownBreak = true;
        break;
      }

      if (isFriend && distance === 1) {
        break;
      }
      console.log({ piece, isFriend, isDownBreak, distance });
      if (isFriend && !isDownBreak && distance > 1) {
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
        break;
      }
      const distance = Math.abs(i - col);
      if (isFriends && distance === 1) {
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
        break;
      }
      const distance = Math.abs(i - col);
      if (isFriends && distance === 1) {
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
      }
      break;
    }
    //abajo izq
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
      }
      break;
    }
    //derecha arriba
    for (let i = 1; i < 8; i++) {
      const newRow = row + i;
      const newCol = col - i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol)) {
        moves.push({ row: newRow, col: newCol });
      }
      break;
    }
    //derecha abajo
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
      }
      break;
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
    const diagonalLeftCol = col - 1;
    const diagonalRightCol = col + 1;
    const nextRow = row + direction;

    if (
      isInsideBoard(nextRow, diagonalLeftCol) &&
      isEnemyPiece(piece, nextRow, diagonalLeftCol)
    ) {
      moves.push({ row: nextRow, col: diagonalLeftCol });
    }

    if (
      isInsideBoard(nextRow, diagonalRightCol) &&
      isEnemyPiece(piece, nextRow, diagonalRightCol)
    ) {
      moves.push({ row: nextRow, col: diagonalRightCol });
    }

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

    newBoard[toRow][toCol] = pieceSelected.piece;
    newBoard[pieceSelected.row][pieceSelected.col] = null;

    setBoard(newBoard);
    setPieceSelected(null);
  };

  const handleSelectPiece = (row: number, col: number) => {
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

    const suggestions = getPossibleMoves(row, col);
    setPieceSelected({ piece, row, col, suggestions });
  };

  return (
    <div className="mt-50 ">
      <div className="p-2">
        <p className="font-bold font-mono text-[25px] text-center">Ajedrez</p>
      </div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex border">
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

                <span className="relative z-10">
                  {cell
                    ? `${cell.type}${cell.color && cell.color == "white" ? "" : "+"}`
                    : ""}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

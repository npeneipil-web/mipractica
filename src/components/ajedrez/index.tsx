import { useState } from "react";
//crear los tipos de pieza y su color
type PieceType = "R" | "D" | "T" | "C" | "A" | "P";
type PieceColor = "white" | "black";

//estructura asignar valores
interface Piece {
  type: PieceType;
  color?: PieceColor;
}
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
    { type: "T" },
    { type: "C" },
    { type: "A" },
    { type: "R" },
    { type: "D" },
    { type: "A" },
    { type: "C" },
    { type: "T" },
  ],
  [
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, { type: "R" }, null, null, null, null],
  [
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
    { type: "P" },
  ],
  [
    { type: "T" },
    { type: "C" },
    { type: "A" },
    { type: "R" },
    { type: "D" },
    { type: "A" },
    { type: "C" },
    { type: "T" },
  ],
];

export const Ajedrez = () => {
  //tablero
  const [board, setBoard] = useState<Cell[][]>(boardDefault);
  //funcion para validar limites | sirve para no devolver posiciones fuera del tablero
  const isInsideBoard = (row: number, col: number) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };
  // funcion rey
  const moveKing = (row: number, col: number) => {
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
    const isBusy = moves.filter((move) => {
      const cell = board[move.row][move.col];
      return cell !== null;
    });
    return moves.filter(
      (move) =>
        isInsideBoard(move.row, move.col) &&
        //some busca cualquier elemento que coincida con esa condicion
        !isBusy.some((b) => {
          return b.row == move.row && b.col == move.col;
        }),
    );
  };
  //funcion del caballo
  const moveHorse = (row: number, col: number): Move[] => {
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
    //funcion que evalua si hay casillas ocupadas
    const isBusy = moves.filter((move) => {
      const cell = board[move.row][move.col];
      return cell !== null;
    });
    console.log(isBusy);
    return moves.filter(
      (move) =>
        isInsideBoard(move.row, move.col) &&
        //some busca cualquier elemento que coincida con esa condicion
        !isBusy.some((b) => {
          return b.row == move.row && b.col == move.col;
        }),
    );
  };

  //funcion reina|dama
  const moveQueen = () => {};
  //funcion torre
  const moveTower = () => {};
  //funcion alfil
  const moveBishop = () => {};
  //funcion peon
  const movePawn = () => {};

  //obtener los movimientos
  const getPossibleMoves = (row: number, col: number): Move[] => {
    const piece = board[row][col];

    if (!piece) return [];
    //casos
    switch (piece.type) {
      case "C":
        return moveHorse(row, col);
      case "R":
        return moveKing(row, col);

      default:
        return [];
    }
  };

  // guarda las sugerencia
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);

  const handleSelectPiece = (row: number, col: number) => {
    const moves = getPossibleMoves(row, col);
    setPossibleMoves(moves);
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
            const isPossibleMove = possibleMoves.some(
              (move) => move.row === rowIndex && move.col === colIndex,
            );

            return (
              <button
                title={
                  cell && cell.type
                    ? pieceAttribute[cell.type]?.label
                    : undefined
                }
                key={`${rowIndex} - { colIndex }`}
                className={`w-12 h-12 ${
                  isPossibleMove
                    ? "bg-green-400"
                    : isWhite
                      ? "bg-white text-black"
                      : "bg-black text-white"
                }`}
                onClick={() => handleSelectPiece(rowIndex, colIndex)}
              >
                {cell ? `${cell.type}` : ""}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

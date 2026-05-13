import { useState } from "react";
type Player = "X" | "O";
type Cell = Player | null;


export const Cat = () => {
  const button = "h-20 w-20 border text-3xl font-bold"

  //turno actual 
  const [turn, setTurn] = useState<Player>("X");
  //guarda el tablero 9 posiciones
  const [board, setBoard] = useState<Cell[]>([
    null, null, null,
    null, null, null,
    null, null, null,
  ]);



  //Si la casilla está ocupada, no hago nada.
  //Si está vacía, copio el tablero.
  //Pongo X u O en esa posición.
  //Actualizo el tablero.
  //Cambio el turno.

  const play = (index: number) => {
    if (board[index] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;

    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <>    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Juego del gato</h1>
      <p>Turno de: {turn}</p>

      <div className="grid grid-cols-3 gap-2 bg-amber-200">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => play(index)}
            className="h-20 w-20 border text-3xl font-bold"
          >
            {cell}
          </button>
        ))}
      </div>

    </div>
    </>
  );
};

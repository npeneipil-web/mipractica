import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@outlier-spa/component";
import { useState } from "react";
import { Ajedrez } from "../ajedrez";
//type se usa para definir estructura de un objeto pero mas flexible
type Player = "X" | "O";
type Cell = Player | null;

const defaultBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export const Cat = () => {
  const button = "h-20 w-20 border text-3xl font-bold";

  //turno actual
  const [turn, setTurn] = useState<Player>("X");

  //guarda el tablero 9 posiciones
  const [board, setBoard] = useState<Cell[][]>(defaultBoard);

  //cree un estado ganador Si gana X o gana O o nadie
  const [winner, setWinner] = useState<Player | null>(null);

  const checkWinner = (board: Cell[][]) => {
    const lines = [
      //filas

      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],

      //columnas
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],

      //diagonales
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      const xCount = line.filter((cell) => cell === "X").length;
      const oCount = line.filter((cell) => cell === "O").length;

      if (xCount === 3) return "X";
      if (oCount === 3) return "O";
    }

    return null;
  };

  //Si la casilla está ocupada, no hago nada.
  //Si está vacía, copio el tablero.
  //Pongo X u O en esa posición.
  //Actualizo el tablero.
  //Cambio el turno.
  const play = (row: number, column: number) => {
    if (winner !== null) {
      return;
    }

    if (board[row][column] !== null) {
      return;
    }

    const newBoard = board.map((evento) => [...evento]);
    newBoard[row][column] = turn;

    const gameWinner = checkWinner(newBoard);

    //comprobacion del chequeo
    setBoard(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    //operador ternario
    setTurn(turn === "X" ? "O" : "X");
  };

  console.log({
    board,
    flat: board.flatMap((x) => x),
    flat2: board.map((x) => x).flat(),
  });

  return (
    <>
      <Tabs>
        <TabsList>
          <TabsTrigger value="cat">Gato</TabsTrigger>
          <TabsTrigger value="ajedrez">Ajedrez</TabsTrigger>
        </TabsList>
        <TabsContent value="cat">
          <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-2xl font-bold">Juego del gato</h1>

            <p>{winner ? `Ganó: ${winner}` : `Turno de: ${turn}`}</p>

            <div className="grid grid-cols-3">
              {board.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => play(rowIndex, colIndex)}
                    className={button}
                  >
                    {col}
                  </button>
                )),
              )}
            </div>
            <button
              onClick={() => {
                setBoard(defaultBoard);
                setTurn("X");
                setWinner(null);
              }}
            >
              Resetear
            </button>
          </div>
        </TabsContent>
        <TabsContent value="ajedrez">
          <Ajedrez></Ajedrez>
        </TabsContent>
      </Tabs>
    </>
  );
};

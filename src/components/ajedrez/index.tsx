import { useEffect, useState } from "react";
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

type HasMoved = {
  whiteKing: boolean;
  blackKing: boolean;
  whiteLeftTower: boolean;
  whiteRightTower: boolean;
  blackLeftTower: boolean;
  blackRightTower: boolean;
};

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
    { type: "D", color: "white" },
    { type: "R", color: "white" },
    { type: "A", color: "white" },
    { type: "C", color: "white" },
    { type: "T", color: "white" },
  ],
];

const initialHasMoved: HasMoved = {
  whiteKing: false,
  blackKing: false,
  whiteLeftTower: false,
  whiteRightTower: false,
  blackLeftTower: false,
  blackRightTower: false,
};

export const Ajedrez = () => {
  // ESTADOS
  //tablero
  const [board, setBoard] = useState<Cell[][]>(boardDefault);

  //turnos
  const [turn, setTurn] = useState<Player>("white");
  const [pieceSelected, setPieceSelected] = useState<PieceSelected>(null);

  //piezas capturadas
  const [capturedWhite, setCapturedWhite] = useState<Cell[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<Cell[]>([]);

  //mensaje en jaque
  const [messaje, setMessage] = useState("");

  //tiempo por jugador
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  // El rey y torre no se ha movido
  const [hasMoved, setHasMoved] = useState<HasMoved>(initialHasMoved);

  //FUNCIONES
  //funcion para validar limites | sirve para no devolver posiciones fuera del tablero
  const isInsideBoard = (row: number, col: number) => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  const isEmptyCell = (row: number, col: number, gameBoard = board) => {
    return gameBoard[row][col] === null;
  };

  const isEnemyPiece = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
  ) => {
    const target = gameBoard[row][col];
    return target !== null && target.color !== piece.color;
  };
  const isFriendPiece = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
  ) => {
    const target = gameBoard[row][col];
    return target !== null && target.color === piece.color;
  };

  //VALIDACIONES DE CASILLAS

  // funcion rey
  const moveKing = (
    piece: Piece,
    row: number,
    col: number,
    includeCastling = true,
    gameBoard = board,
  ) => {
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
    const normalMoves = moves.filter((move) => {
      if (!isInsideBoard(move.row, move.col)) return false;

      if (isFriendPiece(piece, move.row, move.col, gameBoard)) return false;

      return true;
    });

    if (!includeCastling) return normalMoves;

    const castlingMoves =
      gameBoard === board ? getCastlingMoves(piece, row, col) : [];
    return [...normalMoves, ...castlingMoves];
  };
  //funcion del caballo
  const moveHorse = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
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

      if (isFriendPiece(piece, move.row, move.col, gameBoard)) return false;

      return true;
    });
  };

  //funcion reina|dama
  const moveQueen = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
  ) => {
    return [
      ...moveTower(piece, row, col, gameBoard),
      ...moveBishop(piece, row, col, gameBoard),
    ];
  };
  //funcion torre
  const moveTower = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
  ): Move[] => {
    const moves: Move[] = [];

    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    directions.forEach((direction) => {
      for (let i = 1; i < 8; i++) {
        const nextRow = row + direction.row * i;
        const nextCol = col + direction.col * i;

        if (!isInsideBoard(nextRow, nextCol)) break;

        if (isEmptyCell(nextRow, nextCol, gameBoard)) {
          moves.push({ row: nextRow, col: nextCol });
          continue;
        }

        if (isEnemyPiece(piece, nextRow, nextCol, gameBoard)) {
          moves.push({ row: nextRow, col: nextCol });
        }

        break;
      }
    });

    return moves;
  };

  //funcion alfil
  const moveBishop = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
  ) => {
    const moves: Move[] = [];
    //arriba izq
    for (let i = 1; i < 8; i++) {
      const newRow = row - i;
      const newCol = col - i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
      }
      break;
    }
    //abajo izq
    for (let i = 1; i < 8; i++) {
      const newRow = row - i;
      const newCol = col + i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
      }
      break;
    }
    //derecha arriba
    for (let i = 1; i < 8; i++) {
      const newRow = row + i;
      const newCol = col - i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
      }
      break;
    }
    //derecha abajo
    for (let i = 1; i < 8; i++) {
      const newRow = row + i;
      const newCol = col + i;
      if (!isInsideBoard(newRow, newCol)) break;
      if (isEmptyCell(newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
        continue;
      }
      if (isEnemyPiece(piece, newRow, newCol, gameBoard)) {
        moves.push({ row: newRow, col: newCol });
      }
      break;
    }

    return moves;
  };
  //funcion peon
  const movePawn = (
    piece: Piece,
    row: number,
    col: number,
    gameBoard = board,
  ): Move[] => {
    const moves: Move[] = [];

    const defaultRows = [1, 6];
    const multiplier = defaultRows.includes(row) ? 2 : 1;
    const direction = piece.color === "white" ? -1 : 1;

    // avance hacia adelante
    for (let index = 0; index < multiplier; index++) {
      const nextRow = row + (index + 1) * direction;

      if (!isInsideBoard(nextRow, col)) break;

      // si hay una pieza al frente, ya no puede seguir avanzando
      if (!isEmptyCell(nextRow, col, gameBoard)) break;

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
      if (isEnemyPiece(piece, move.row, move.col, gameBoard)) {
        moves.push(move);
      }
    });

    return moves;
  };

  //obtener los movimientos
  const getPossibleMoves = (
    row: number,
    col: number,
    gameBoard = board,
    includeCastling = true,
  ): Move[] => {
    const piece = gameBoard[row][col];

    if (!piece) return [];
    //casos
    switch (piece.type) {
      case "C":
        return moveHorse(piece, row, col, gameBoard);
      case "R":
        return moveKing(piece, row, col, includeCastling, gameBoard);
      case "D":
        return moveQueen(piece, row, col, gameBoard);
      case "T":
        return moveTower(piece, row, col, gameBoard);
      case "A":
        return moveBishop(piece, row, col, gameBoard);
      case "P":
        return movePawn(piece, row, col, gameBoard);
      default:
        return [];
    }
  };

  const movePiece = (toRow: number, toCol: number) => {
    if (!pieceSelected) return;

    const newBoard = board.map((row) => [...row]);

    const capturedPiece = newBoard[toRow][toCol];

    if (capturedPiece?.color === pieceSelected.piece.color) {
      setPieceSelected(null);
      return;
    }

    if (capturedPiece?.type === "R") {
      setPieceSelected(null);
      return;
    }

    if (capturedPiece) {
      if (pieceSelected.piece.color === "white") {
        setCapturedBlack((prev) => [...prev, capturedPiece]);
      } else {
        setCapturedWhite((prev) => [...prev, capturedPiece]);
      }
    }

    newBoard[toRow][toCol] = pieceSelected.piece;
    newBoard[pieceSelected.row][pieceSelected.col] = null;
    const isCastling =
      pieceSelected.piece.type === "R" &&
      Math.abs(toCol - pieceSelected.col) === 2;

    if (isCastling) {
      // enroque izquierda
      if (toCol < pieceSelected.col) {
        newBoard[toRow][toCol + 1] = newBoard[toRow][0];
        newBoard[toRow][0] = null;
      }

      // enroque derecha
      if (toCol > pieceSelected.col) {
        newBoard[toRow][toCol - 1] = newBoard[toRow][7];
        newBoard[toRow][7] = null;
      }
    }

    setHasMoved((prev) => {
      const next = { ...prev };

      if (pieceSelected.piece.type === "R") {
        if (pieceSelected.piece.color === "white") {
          next.whiteKing = true;
        } else {
          next.blackKing = true;
        }
      }

      if (pieceSelected.piece.type === "T") {
        if (
          pieceSelected.piece.color === "white" &&
          pieceSelected.row === 7 &&
          pieceSelected.col === 0
        ) {
          next.whiteLeftTower = true;
        }
        if (
          pieceSelected.piece.color === "white" &&
          pieceSelected.row === 7 &&
          pieceSelected.col === 7
        ) {
          next.whiteRightTower = true;
        }
        if (
          pieceSelected.piece.color === "black" &&
          pieceSelected.row === 0 &&
          pieceSelected.col === 0
        ) {
          next.blackLeftTower = true;
        }
        if (
          pieceSelected.piece.color === "black" &&
          pieceSelected.row === 0 &&
          pieceSelected.col === 7
        ) {
          next.blackRightTower = true;
        }
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

    const suggestions = getLegalMovesForPiece(row, col);

    setPieceSelected({ piece, row, col, suggestions });
  };

  //Rey en Jaque
  //encontar al rey
  const findKing = (color: PieceColor, gameBoard = board) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = gameBoard[row][col];

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
  const isSquareAttacked = (
    targetRow: number,
    targetCol: number,
    byColor: PieceColor,
    gameBoard = board,
  ) => {
    const horseMoves = [
      { row: -2, col: -1 },
      { row: -2, col: 1 },
      { row: -1, col: -2 },
      { row: -1, col: 2 },
      { row: 1, col: -2 },
      { row: 1, col: 2 },
      { row: 2, col: -1 },
      { row: 2, col: 1 },
    ];

    const kingMoves = [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ];

    const towerDirections = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    const bishopDirections = [
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    const isAttackingWithRay = (
      row: number,
      col: number,
      directions: Move[],
    ) => {
      for (const direction of directions) {
        for (let distance = 1; distance < 8; distance++) {
          const nextRow = row + direction.row * distance;
          const nextCol = col + direction.col * distance;

          if (!isInsideBoard(nextRow, nextCol)) break;

          if (nextRow === targetRow && nextCol === targetCol) return true;

          if (gameBoard[nextRow][nextCol] !== null) break;
        }
      }

      return false;
    };

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = gameBoard[row][col];

        if (!piece || piece.color !== byColor) continue;

        if (
          piece.type === "P" &&
          getPawnAttackMoves(piece, row, col).some(
            (move) => move.row === targetRow && move.col === targetCol,
          )
        ) {
          return true;
        }

        if (
          piece.type === "C" &&
          horseMoves.some(
            (move) =>
              row + move.row === targetRow && col + move.col === targetCol,
          )
        ) {
          return true;
        }

        if (
          piece.type === "R" &&
          kingMoves.some(
            (move) =>
              row + move.row === targetRow && col + move.col === targetCol,
          )
        ) {
          return true;
        }

        if (
          (piece.type === "T" || piece.type === "D") &&
          isAttackingWithRay(row, col, towerDirections)
        ) {
          return true;
        }

        if (
          (piece.type === "A" || piece.type === "D") &&
          isAttackingWithRay(row, col, bishopDirections)
        ) {
          return true;
        }
      }
    }

    return false;
  };

  // funcion que detecta el jaque

  const isKingInCheck = (color: PieceColor, gameBoard = board) => {
    const kingPosition = findKing(color, gameBoard);

    if (!kingPosition) return false;

    const enemyColor = color === "white" ? "black" : "white";

    return isSquareAttacked(
      kingPosition.row,
      kingPosition.col,
      enemyColor,
      gameBoard,
    );
  };

  const getLegalMovesForPiece = (
    row: number,
    col: number,
    gameBoard = board,
  ) => {
    const piece = gameBoard[row][col];

    if (!piece) return [];

    const moves = getPossibleMoves(row, col, gameBoard);

    return moves.filter((move) => {
      const target = gameBoard[move.row][move.col];

      if (target?.color === piece.color) return false;
      if (target?.type === "R") return false;

      const newBoard = gameBoard.map((row) => [...row]);

      newBoard[move.row][move.col] = piece;
      newBoard[row][col] = null;

      return !isKingInCheck(piece.color, newBoard);
    });
  };
  //jaque mate
  const isCheckmate = (color: PieceColor) => {
    if (!isKingInCheck(color, board)) return false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];

        if (!piece || piece.color !== color) continue;

        if (getLegalMovesForPiece(row, col).length > 0) return false;
      }
    }

    return true;
  };
  useEffect(() => {
    const whiteInCheckmate = isCheckmate("white");
    const blackInCheckmate = isCheckmate("black");
    const whiteInCheck = isKingInCheck("white");
    const blackInCheck = isKingInCheck("black");

    if (whiteInCheckmate) {
      setMessage("Jaque mate al rey Blanco");
      setIsRunning(false);
    } else if (blackInCheckmate) {
      setMessage("Jaque mate al rey Negro");
      setIsRunning(false);
    } else if (whiteInCheck) {
      setMessage("Jaque al rey Blanco");
    } else if (blackInCheck) {
      setMessage("Jaque al rey Negro");
    } else {
      setMessage("");
    }
  }, [board]);

  //Enroque
  const getCastlingMoves = (piece: Piece, row: number, col: number): Move[] => {
    const moves: Move[] = [];

    if (piece.type !== "R") return moves;
    if (isKingInCheck(piece.color)) return moves;

    const isWhite = piece.color === "white";
    const kingStartRow = isWhite ? 7 : 0;
    const kingStartCol = 4;

    if (row !== kingStartRow || col !== kingStartCol) return moves;

    const enemyColor = isWhite ? "black" : "white";
    const kingMoved = isWhite ? hasMoved.whiteKing : hasMoved.blackKing;

    if (kingMoved) return moves;

    const leftTowerMoved = isWhite
      ? hasMoved.whiteLeftTower
      : hasMoved.blackLeftTower;

    const rightTowerMoved = isWhite
      ? hasMoved.whiteRightTower
      : hasMoved.blackRightTower;


    // Enroque hacia la izquierda
    if (
      !leftTowerMoved &&
      board[row][0]?.type === "T" &&
      board[row][0]?.color === piece.color &&
      board[row][1] === null &&
      board[row][2] === null &&
      board[row][3] === null &&
      !isSquareAttacked(row, 3, enemyColor) &&
      !isSquareAttacked(row, 2, enemyColor)
    ) {
      moves.push({ row, col: 2 });
    }

    // Enroque hacia la derecha
    if (
      !rightTowerMoved &&
      board[row][7]?.type === "T" &&
      board[row][7]?.color === piece.color &&
      board[row][5] === null &&
      board[row][6] === null &&
      !isSquareAttacked(row, 5, enemyColor) &&
      !isSquareAttacked(row, 6, enemyColor)
    ) {
      moves.push({ row, col: 6 });
    }

    return moves;
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
    setHasMoved(initialHasMoved);
    setIsRunning(true);
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
    setHasMoved(initialHasMoved);
    setIsRunning(false);
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
  return (
    <div className="mt-50">
      <div className="absolute left-80 top-85 w-60 rounded-2xl text-center">
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
        <div key={rowIndex} className="flex border">
          {row.map((cell, colIndex) => {
            const isWhite = (rowIndex + colIndex) % 2 === 0;
            const isPossibleMove = pieceSelected?.suggestions.some(
              (move) => move.row === rowIndex && move.col === colIndex,
            );

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`relative w-12 h-12 ${isWhite ? "bg-white text-black" : "bg-black text-white"
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
      <div className="  absolute   rounded-2xl right-40 w-70">
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
          <p className="text-center font-bold text-[20px]">{messaje}</p>
        )}
      </div>
    </div>
  );
};

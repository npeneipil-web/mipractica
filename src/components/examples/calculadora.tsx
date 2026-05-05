import { useEffect, useState } from "react";

export const CalculadoraTable = () => {
  //retorna InputCalPage, componente que se encarga de mostrar el contenido de la calculadora.
  return <InputCalPage></InputCalPage>;
};

//interface InputCalPageP es una interfaz que define las propiedades con las que puede
//trabajar el componente InputCalPage
interface InputCalPageP {
  defaultNum?: number;
  name?: string;
}

export const InputCalPage: React.FC<InputCalPageP> = ({ defaultNum }) => {
  //num es un estado que se inicializa con el valor de defaultNum,
  // que puede ser un número o undefined.
  const [num, setNum] = useState<number | undefined>(defaultNum);

  const sumar = () => {
    //lo que hace esta función es actualizar el estado num sumándole 1 al valor actual.
    //prev es el valor anterior de num, en caso de que num sea undefined,
    // se le asigna el valor 0 antes de sumarle 1.
    setNum((prev) => (prev ?? 0) + 1);
    // if (num !== undefined) setNum(num ?? 0 + 1); Forma tradicional
  };
  const restar = () => {
    setNum((prev) => (prev ?? 0) - 1);
    //if (num !== undefined) setNum(num - 1);
  };
  const multiplicar = () => {
    setNum((prev) => (prev ?? 0) * 2);
    //if (num !== undefined) setNum(num * 2);
  };
  const dividir = () => {
    setNum((prev) => (prev ?? 0) / 3);
    //if (num !== undefined) setNum(num / 3);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr className=" bg-yellow-50">
            <input
              type="number"
              placeholder="Ingrese numero"
              value={num}
              //Cuando el usuario cambia el valor del input, esta función toma ese nuevo valor,
              //  lo convierte a número y actualiza el estado num
              onChange={(e) => setNum(Number(e.target.value))}
            />
          </tr>

          <tr className="w-100px h-100px bg-white">
            <td>
              <p>Suma</p>
            </td>
            <td>
              <button className="w- bg-red-200" onClick={sumar}>
                Sumar+1
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Resta</p>
            </td>
            <td>
              <button className="bg-green-200" onClick={restar}>
                Restar-1
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Multiplique</p>
            </td>
            <td>
              <button className="bg-blue-200" onClick={multiplicar}>
                Multiplique x2
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Divida</p>
            </td>
            <td>
              <button className="bg-yellow-400" onClick={dividir}>
                Dividir en 3
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

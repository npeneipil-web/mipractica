import { useState } from "react";

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
  const [num, setNum] = useState<number | undefined>(defaultNum);

  const reset = () => {
    setNum(() => 0);
  };

  const sumar = () => {
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
  const button =
    " bg-[#ff9200] text-white border border-[#ff9200] rounded-2xl w-30 h-10";

  return (
    <div className=" w-full  ">
      <div className="flex w-full mt-30  justify-center items-center h-70  ">
        <table className=" w-100  bg-[#252e32] justify-center items-center flex border rounded-2xl ">
          <tbody className=" w-full h-full flex flex-col items-center">
            <tr className=" bg-white mt-5 w-90 h-10 justify-center flex border rounded-2xl ">
              <input
                className="text-center w-full"
                type="number"
                placeholder="Ingrese numero"
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
              />
            </tr>
            <tr className="w-15 mt-2 flex justify-center border rounded-2xl bg-amber-50">
              <td className="">
                <button onClick={reset}>Reset</button>
              </td>
            </tr>
            <div className="flex flex-col gap-3 p-3 ">
              <tr>
                <td>
                  <button className={button} onClick={sumar}>
                    Sumar+1
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className={button} onClick={restar}>
                    Restar-1
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className={button} onClick={multiplicar}>
                    Multiplique x2
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className={button} onClick={dividir}>
                    Dividir en 3
                  </button>
                </td>
              </tr>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

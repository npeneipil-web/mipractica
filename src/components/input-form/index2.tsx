import { CalculadoraTable } from "../examples/calculadora";
import { useState } from "react";

export const InputCalPage: React.FC = () => {
  const [num, setNum] = useState<number | undefined>();

  return (
    <div>
      <table>
        <tbody>
          <tr className=" bg-yellow-50">
            <input type="number" placeholder="Ingrese numero" />
          </tr>

          <tr className="w-100px h-100px bg-white">
            <td>
              <p>Suma</p>
            </td>
            <td>
              <button className="w- bg-red-200">Sumar+1</button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Resta</p>
            </td>
            <td>
              <button className="bg-green-200">Restar-1</button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Multiplique</p>
            </td>
            <td>
              <button className="bg-blue-200">Multiplique x2</button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Divida</p>
            </td>
            <td>
              <button className="bg-yellow-400">Dividir en 3</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

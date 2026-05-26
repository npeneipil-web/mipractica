import {
  Card,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@outlier-spa/component";
import { useState } from "react";
import { Calculator } from "../examples/calculator";

export const CalculadoraTable = () => {
  //retorna InputCalPage, componente que se encarga de mostrar el contenido de la calculadora.
  return (
    <>
      <div>
        <Tabs>
          <TabsList>
            <TabsTrigger value="cal1">Calculadora</TabsTrigger>
            <TabsTrigger value="cal2">Calculadora 2</TabsTrigger>
          </TabsList>
          <TabsContent value="cal1">
            <InputCalPage></InputCalPage>
          </TabsContent>
          <TabsContent value="cal2">
            <Calculator></Calculator>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
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
    <div className="flex justify-center mt-20 ">
      <Card>
        <tbody>
          <div className="flex justify-center w-90">
            <tr className="h-10 ">
              <input
                className=" text-right border text-[20px]"
                type="number"
                placeholder="Ingrese numero"
                value={num}
                //Cuando el usuario cambia el valor del input, esta función toma ese nuevo valor,
                //  lo convierte a número y actualiza el estado num
                onChange={(e) => setNum(Number(e.target.value))}
              />
            </tr>
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            <tr className="bg-white">
              <td>
                <Button
                  variant="outline"
                  className=" bg-red-200 w-30"
                  onClick={sumar}
                >
                  Sumar+1
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  className="bg-green-700 w-30"
                  variant="default"
                  onClick={restar}
                >
                  Restar-1
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button className="bg-blue-200 w-30" onClick={multiplicar}>
                  Multiplique x2
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button className="bg-yellow-400 w-30" onClick={dividir}>
                  Dividir en 3
                </Button>
              </td>
            </tr>
          </div>
        </tbody>
      </Card>
    </div>
  );
};

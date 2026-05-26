// COLORES
// numeros de botones #4e5456
// operadores #ff9200
// borrar #7b8182
// fondo #252e32

import {
  BorderBeam,
  Card,
  CardContent,
  CardHeader,
  Tabs,
} from "@outlier-spa/component";
import { Delete } from "lucide-react";
import { useState } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isOperator?: boolean;
}
// al apretar = ejecuart eval("cadena de texto con la operacion matematica")

const ButtonCustom: React.FC<ButtonProps> = ({
  children,
  isOperator = false,
  hidden,
  ...buttonProps
}) => {
  const buttonCls =
    "border-black rounded-full bg-[#4e5456] text-white flex items-center justify-center ";
  const operatorCls =
    "border-black rounded-full bg-[#ff9200] text-white flex items-center justify-center ";
  const hiddenCls = "bg-transparent ";
  const classes = hidden ? hiddenCls : isOperator ? operatorCls : buttonCls;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  // funcion para borrar todo
  const clearDisplay = () => {
    setDisplay("0");
  };

  //funcion para añadir valores
  // si la pantalla tiene "0" y se toca 7, reemplaza el 0 por 7

  const appendValue = (value: string) => {
    setDisplay((prev) => {
      if (prev === "0") {
        return value;
      }

      return prev + value;
    });
  };

  return (
    <>
      <div className=" w-full h-full ">
        <div className="flex justify-center mt-50  ">
          <Card className="w-120 h-140 rounded-md bg-[#252e32]   ">
            <CardHeader>
              <div className="flex ">
                <input
                  className="bg-[#252e32] w-full   text-white text-right text-[50px]"
                  type="text"
                  value={display}
                />
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-100 h-100 text  grid grid-flow-col grid-rows-5  grid-cols-4 gap-4 bg-[#252e32]">
                <ButtonCustom>
                  <Delete />
                </ButtonCustom>
                <ButtonCustom onClick={() => appendValue("7")}>7</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("4")}>4</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("1")}>1</ButtonCustom>
                <ButtonCustom hidden></ButtonCustom>
                <ButtonCustom onClick={clearDisplay}>AC</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("8")}>8</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("5")}>5</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("2")}>2</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("0")}>0</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("%")}>%</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("9")}>9</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("6")}>6</ButtonCustom>
                <ButtonCustom onClick={() => appendValue("3")}>3</ButtonCustom>
                <ButtonCustom hidden></ButtonCustom>
                <ButtonCustom isOperator onClick={() => appendValue("/")}>
                  /
                </ButtonCustom>
                <ButtonCustom isOperator onClick={() => appendValue("*")}>
                  X
                </ButtonCustom>
                <ButtonCustom isOperator onClick={() => appendValue("-")}>
                  -
                </ButtonCustom>
                <ButtonCustom isOperator onClick={() => appendValue("+")}>
                  +
                </ButtonCustom>
                <ButtonCustom
                  isOperator
                  onClick={() => setDisplay((prev) => eval(prev))}
                >
                  =
                </ButtonCustom>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

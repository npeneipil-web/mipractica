import { useState } from "react";

//una interfaz declara las propiedades con su respectivo tipo de dato
interface LoremPicsumData {
  width: number;
  height: number;
}

//crea una funcion
export const LoremPicsumPage = () => {
  //crea useState
  const [data, setData] = useState<LoremPicsumData>({
    width: 100,
    height: 100,
  });

  const [url, setUrl] = useState<string>();

  function handleClick() {
    //reeemplanza los datos ingresados desde data ancho y alto
    const nurl = `https://picsum.photos/${data.width}/${data.height}`;
    setUrl(nurl);
  }
  //const img = `https://picsum.photos/${data.width}/${data.height}`;

  const obj = {
    prop1: "1",
    prop2: 2,
  };
  const obj2 = {
    prop3: "3",
    prop4: "otyra cosa",
  };

  const arry = ["1", "pablo", "laura"];
  const arr2 = [2, 3, 4, 5, 6];

  const cloneObject = { ...obj, ...obj2 };
  const cloneArray = [...arry, arr2];

  console.log({
    obj,
    obj2,
    arry,
    arr2,
    cloneArray,
    cloneObject,
  });

  return (
    <>
      <div>
        <img src={url} />
        <p>ingrese ancho</p>
        <input
          type="number"
          value={data.width}
          onChange={(evento) =>
            setData({ ...data, width: Number(evento.target.value) })
          }
        />
        <p>ingrese altura</p>
        <input
          type="number"
          value={data.height}
          onChange={(evento) =>
            setData({ ...data, height: Number(evento.target.value) })
          }
        />
        <button onClick={handleClick}>Buscar</button>
      </div>
    </>
  );
};

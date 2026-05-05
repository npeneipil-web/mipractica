import { useState } from "react";
interface LoremPicsumPageProps {
  width?: number;
  height?: number;
}

export const LoremPicsumPage = () => {
  const [dimentions, setDimention] = useState<LoremPicsumPageProps>({
    width: 100,
    height: 100,
  });
  const [url, setUrl] = useState<string>();
  function handleClick() {
    // https://picsum.photos/200/300
    setUrl(
      "https://picsum.photos/" + dimentions.width + "/" + dimentions.height,
    );
  }
  console.log(dimentions);
  return (
    <div>
      <img src={url} alt="" />
      <p>Ingrese altura</p>
      <input
        type="number"
        value={dimentions.height}
        onChange={(e) =>
          setDimention({
            ...dimentions,
            height: e.target.value !== "" ? Number(e.target.value) : undefined,
          })
        }
      />
      <p>Ingrese ancho</p>
      <input
        type="number"
        value={dimentions.width}
        onChange={(event) =>
          setDimention({ ...dimentions, width: Number(event.target.value) })
        }
      />
      <button onClick={handleClick}>Buscar</button>
    </div>
  );
};

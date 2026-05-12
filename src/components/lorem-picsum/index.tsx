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
    height: 200,
  });

  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick() {
    //reemplaza los datps ingresados desde data ancho y alto
    const newUrl = `https://picsum.photos/${data.width}/${data.height}?random=${Date.now()}`;
    setImages((prev) => {
      const updateImages = [...prev, newUrl];
      const newIndex = Math.max(updateImages.length - 3, 0);
      setCurrentIndex(newIndex);
      return updateImages;
    });
  }

  const visibleImages = images.slice(currentIndex, currentIndex + 3);

  //const img = `https://picsum.photos/${data.width}/${data.height}`;

  // funcion para avanzar y retroceder en el carrusel
  //antes
  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  //despues

  const handleNext = () => {
    if (currentIndex + 3 >= images.length) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const input = "text-center border border-gray-300 rounded-2xl bg-white";
  const button = "px-4 py-2 bg-gray-300 rounded-md";
  return (
    <>
      <div className="w-full ">
        <div className=" w-150 p-4 relative top-20 border border-gray-300 rounded-2xl bg-amber-50 flex flex-col m-auto">
          <div className="inline-block  mt-5 mx-auto">
            <div className="flex gap-4 justify-center">
              {visibleImages.map((image, index) => (
                <img
                  key={`${image}-${index}`} // propiedad que React necesita cuando renderizas listas.
                  src={image}
                  alt="Lorem Picsum"
                  className="w-40 h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button className={button} onClick={handlePrevious}>
              Anterior
            </button>
            <button className={button} onClick={handleNext}>
              Siguiente
            </button>
          </div>
          <div className="bg-amber-50 w-full text-center border border-gray-100 ">
            <h1>Ingrese Ancho</h1>
            <input
              className={input}
              type="number"
              value={data.width}
              onChange={(evento) =>
                setData({ ...data, width: Number(evento.target.value) })
              }
            />
            <h1>Ingrese Altura</h1>
            <input
              className={input}
              type="number"
              value={data.height}
              onChange={(evento) =>
                setData({ ...data, height: Number(evento.target.value) })
              }
            />
          </div>
          <div className="p-4 m-auto ">
            <button
              className="rounded-2xl w-50 h-10 border  bg-amber-600 border-gray-300 text-white transition-all duration-400 ease-in-out 
               transform active:scale-110"
              onClick={handleClick}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

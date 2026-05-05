import { sculptureList } from "../../../data.js";
import { useState } from "react";

// export default function Gallery() {
// en palabras simples, esta función es un componente de React
// que muestra una galería de esculturas. Utiliza el hook useState para
//  mantener el índice de la escultura actual que se muestra en la galería.
// Cada vez que se hace clic en el botón "Siguiente", el índice se incrementa
// y se muestra la siguiente escultura en la lista. La información de cada escultura,
// como su nombre, artista, descripción y URL de la imagen,
// se muestra en la interfaz de usuario.
export default function Gallery() {
  //agregar una variable de estado para mantener los datos renderizados
  const [index, setIndex] = useState(0);

  //función para actualizar el estado cada vez que se hace clic en el botón
  function handleClick() {
    if (index === sculptureList.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        className="bg-yellow-300 border-2 border-yellow-400 rounded-md px-4 py-2 mb-4"
        onClick={handleClick}
      >
        Siguiente
      </button>
      <h2>
        <i>{sculpture.name} </i>
        por {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} de {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}

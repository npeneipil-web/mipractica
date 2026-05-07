import { useState } from "react";

export const Article = () => {
  //Reemplaza el nuevo articulo
  const [newArticle, setNewArticle] = useState<string>("");
  //realiza una busqueda
  const [search, setSearch] = useState<string>("");
  //guarda historial
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  return (
    <>
      <div>
        <h1>Buscador Articulos de Supermercado</h1>
        <input
          type="text"
          placeholder="leche"
          className="bg-amber-100 "
          value={search}
          onChange={(evento) => setSearch(evento.target.value)}
        ></input>
        <button
          className="bg-gray-300"
          onClick={() => {
            //se limpia los espacios en blanco y se verifica si esta vacio
            const trimmedSearch = search.trim();
            if (trimmedSearch == "") {
              console.log("Campo vacío");
              return;
            }

            // validar que no este repetido
            //.includes() devuelve true si el elemento ya existe en el array
            if (searchHistory.includes(trimmedSearch)) {
              alert("El articulo ya se encuentra");
              return;
            }

            //si se valida, se actualiza el estado
            setNewArticle(trimmedSearch);
            setSearchHistory([...searchHistory, trimmedSearch]);
            //limpia el input
            setSearch("");
          }}
        >
          Buscar
        </button>
      </div>
      <table>
        <tr>
          <td>Nombre Producto Actual= {newArticle}</td>
        </tr>
        <tr>
          {/*tarea crear una funcion de filtrado desde map */}

          {/* map se usa para recorrer el arreglo searchHistory y muestra cada elemento.*/}
          <ul className="flex flex-col gap-1.5">
            {searchHistory
              //función de filtrado sería decidir qué elementos se muestran en pantalla

              //   .filter((item) =>
              //     item.toLowerCase().includes(search.toLowerCase()),
              //   )
              //muestra los elementos por pantalla
              .map((item) => (
                <div key={item} className="flex gap-2">
                  <li>{item}</li>
                  <button
                    onClick={() => {
                      // Filtramos el array original para eliminar el elemento seleccionado
                      const filtered = searchHistory.filter((i) => i !== item);
                      setSearchHistory(filtered);
                    }}
                    className="border border-red-500 bg-red-500/50 rounded-md p-1 text-xs text-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
          </ul>
        </tr>
      </table>

      <RenderChildren>
        <h1>Este es un H1</h1>
      </RenderChildren>
    </>
  );
};

const RenderChildren = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <div className="bg-gray-300 p-2.5">
        <p className="mb-2.5">
          Abajo esta el render de los hijos del componente
        </p>
      </div>
    </>
  );
};

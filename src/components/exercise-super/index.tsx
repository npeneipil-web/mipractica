import { useState } from "react";
import { Trash } from "lucide-react";

interface ArticleItem {
  id: number;
  name: string;
  completed: boolean; //si esta completado o no
}

export const Article = () => {
  //Reemplaza el nuevo articulo
  const [newArticle, setNewArticle] = useState<string>("");
  //realiza una busqueda
  const [search, setSearch] = useState<string>("");
  //guarda historial
  const [searchHistory, setSearchHistory] = useState<ArticleItem[]>([]);

  return (
    <>
      <div className=" w-full font-mono">
        <div className=" w-100 bg-gray-50 rounded-2xl relative top-15 left-40 border border-gray-200 ">
          <h1 className="text-center font-bold text-[20px] mt-5 mb-5 ">
            Articulos de Supermercado
          </h1>

          <div className="relative  ml-3">
            <input
              type="text"
              placeholder="leche"
              className="bg-white w-75 h-8  border border-gray-400 "
              value={search}
              onChange={(evento) => setSearch(evento.target.value)}
            ></input>
            <button
              className="bg-gray-500 rounded-full p-1 font-bold  text-[12px] text-white w-18 ml-2 "
              onClick={() => {
                //se limpia los espacios en blanco y se verifica si esta vacio
                const trimmedSearch = search.trim();
                if (trimmedSearch == "") {
                  console.log("Campo vacío");
                  alert("campo vacío");
                  return;
                }

                // validar que no este repetido
                if (searchHistory.some((item) => item.name == trimmedSearch)) {
                  alert("El articulo ya se encuentra");
                  return;
                }

                //si se valida, se actualiza el estado
                setNewArticle(trimmedSearch);
                setSearchHistory([
                  ...searchHistory,
                  { id: Date.now(), name: trimmedSearch, completed: false },
                ]);
                //limpia el input
                setSearch("");
              }}
            >
              Agregar
            </button>
          </div>
          <table className="bg-gray-50 w-full relative mt-3 ">
            <tr>
              <td className=" pl-3">Último producto agregado</td>
              <td> ={newArticle}</td>
            </tr>
            <div className=" relative left-10">
              <tr className="flex flex-col">
                {/*tarea crear una funcion de filtrado desde map */}

                {/* map se usa para recorrer el arreglo searchHistory y muestra cada elemento.*/}
                <ul className="flex flex-col  gap-2 ml-10 mt-5 ">
                  {searchHistory
                    //función de filtrado sería decidir qué elementos se muestran en pantalla

                    //   .filter((item) =>
                    //     item.toLowerCase().includes(search.toLowerCase()),
                    //   )
                    //muestra los elementos por pantalla
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between w-full gap-4"
                      >
                        <input
                          className=" h-5 w-5 bg-white border transition-all duration-200 checked:p-1 checked:bg-amber-500 checked:border-amber-600 checked:border-2 border-gray-400  rounded-full appearance-none"
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {
                            const updated = searchHistory.map((article) =>
                              article.id === item.id
                                ? { ...article, completed: !article.completed }
                                : article,
                            );

                            setSearchHistory(updated);
                          }}
                        />
                        <li
                          className={
                            item.completed ? "line-through text-gray-400" : ""
                          }
                        >
                          {item.name}
                        </li>

                        <button
                          onClick={() => {
                            // Filtramos el array original para eliminar el elemento seleccionado
                            const filtered = searchHistory.filter(
                              (article) => article.id !== item.id,
                            );
                            setSearchHistory(filtered);
                          }}
                          className="border border-transparent bg-transparent  rounded-md p-1 text-xs hover:text-red-500 "
                        >
                          <Trash />
                        </button>
                      </div>
                    ))}
                </ul>
              </tr>
            </div>
          </table>
        </div>
      </div>
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

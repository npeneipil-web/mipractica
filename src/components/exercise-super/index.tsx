import React from "react";
import { useState } from "react";

interface articleProps {
  nameArticle?: string;
}

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
            setNewArticle(search);
            setSearchHistory([...searchHistory, search]);
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
          {/* map se usa para recorrer el arreglo searchHistory y pintar cada elemento.*/}
          <ul className="flex flex-col gap-1.5">
            {searchHistory.map((item, index) => (
              <div className="flex gap-2">
                <li key={item}>{item}</li>
                <button className="border border-red-500 bg-red-500/50 rounded-md p-1 text-xs text-red-500">
                  Eliminar
                </button>
              </div>
            ))}
          </ul>
        </tr>
      </table>
    </>
  );
};

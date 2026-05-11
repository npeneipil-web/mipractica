import { useEffect, useState } from "react";

interface PokemonData {
  src: string;
  name: string;
  height: number;
  weight: number;
  skills: string[];
}

// interface Props {
//   name: string;
// }

// function PokeApiPage({ name }: Props) {

//   return (
//     <>
//       <div></div>
//       <div></div>
//     </>
//   );
// }

// const PokeApiPAge: React.FC<Props> = ({ name }) => {
//   return <></>;
// };

// const PokeApiPAge = ({ name }: Props) => {
//   return <></>;
// };
const nonePokemon: PokemonData = {
  src: "",
  name: "",
  height: 0,
  weight: 0,
  skills: [],
};
export const PokeApiPage = () => {
  //guarda el arrelgo con lo que fue buscado
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [tempSearch, setTempSearch] = useState<string>("");
  const [historyIndex, setIndex] = useState<number>(0);

  //crear historial
  const [searchHistory, setSearchHistory] = useState<PokemonData[]>([]);

  //agregue un estado para saber si ya busque algo
  const [hasSearch, setHasSearch] = useState(false);

  //flechas puedan moverse dentro
  //Busca en qué posición del historial está el pokemon actual

  const handlePreviousPokemon = () => {
    if (historyIndex < 1) {
      return;
    }

    const currentIndex = historyIndex - 1;
    const historyData = searchHistory[currentIndex];
    setIndex(currentIndex);
    setPokemonData(historyData);
  };

  const handleNextPokemon = () => {
    if (historyIndex >= searchHistory.length - 1) {
      return;
    }

    const currentIndex = historyIndex + 1;
    const historyData = searchHistory[currentIndex];
    setIndex(currentIndex);
    setPokemonData(historyData);
  };

  useEffect(() => {
    if (!searchPokemon) {
      setPokemonData(null);
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon no encontrado");
        }
        return response.json();
      })

      .then((data) => {
        console.log(data);
        //Transforma los datos de la API en el formato que define la interfaz PokemonData para poder mostrarlos.
        if (!data && !data.name) {
          return;
        }

        console.log({ data });
        const currentData = {
          src: data.sprites.front_default,
          name: data.name,
          height: data.height,
          weight: data.weight,
          skills: data.abilities.map((a: any) => a.ability.name),
        };
        setPokemonData(currentData);
        setSearchHistory((prev) => {
          return [...prev, currentData];
        });
        setIndex(searchHistory.length);
      })
      .catch((error) => {
        setPokemonData(null);
        console.error("Error fetching data:", error);
      });
  }, [searchPokemon]);

  return (
    <>
      <div className="p-10 flex flex-col items-center">
        <PokemonTable {...(pokemonData ?? nonePokemon)} />
        {/**revisa si se busco algo y si no encontró datos */}
        <div className="flex gap-2 mb-8 absolute top-40 left-160  ">
          <input
            className="border p-2 rounded shadow-sm items-center justify-center"
            type="text"
            placeholder="Ej: ditto, pikachu..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-red-700 w-7 h-7 text-white text-center
         rounded-full relative bottom-39 left-38 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-0 hover:scale-110 hover:bg-red-600"
          onClick={() => {
            setTempSearch("");
          }}
        ></button>
        <button
          className=" transition delay-150 duration-300 ease-in-out hover:-translate-y-0 hover:scale-110 hover:bg-green-600 bg-green-700 w-12 h-12 text-white px-4 py-2 rounded-full relative bottom-38 left-41"
          onClick={() => {
            const trimmedSearch = tempSearch.trim();

            if (!trimmedSearch) return;

            setHasSearch(true);
            setSearchPokemon(trimmedSearch);
          }}
        >
          {/* <img src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png" /> */}
        </button>
        {hasSearch && !pokemonData && (
          <p className="text-gray-500 absolute top-70">
            No se encontró el Pokémon.
          </p>
        )}
        <div className="w-16 h-10  relative bottom-53 right-41">
          <button
            className="bg-amber-400 w-7 relative top-2 transition delay-150 duration-100 ease-in-out hover:-translate-y-0 hover:scale-110"
            onClick={handlePreviousPokemon}
          >
            <img
              src="https://e7.pngegg.com/pngimages/693/235/png-clipart-green-arrow-computer-icons-left-arrow-angle-text-thumbnail.png"
              alt=""
            />
          </button>
          <button
            onClick={handleNextPokemon}
            className="left-1 bg-amber-400 w-7 relative  top-2 transition delay-150 duration-100 ease-in-out hover:-translate-y-0 hover:scale-110"
          >
            <img
              src="https://e7.pngegg.com/pngimages/912/69/png-clipart-arrow-computer-icons-black-and-white-arrows-angle-rectangle-thumbnail.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </>
  );
};

export const PokemonTable: React.FC<PokemonData> = ({
  src,
  name,
  height,
  weight,
  skills,
}) => {
  return (
    <>
      <div className="font-serif bg-red-500 p-6 rounded-xl shadow-sm border border-slate-200 w-full max-w-md mb-10">
        <div>
          <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
          <div className="bg-white w-88 border border-slate-800 mt-3 m-6 h-70 ">
            {src.length > 0 && (
              <img
                src={src}
                alt={name}
                className="w-60 h-60 mx-auto mb-auto relative
                 top-9 left-0"
              />
            )}
          </div>
          <div className="bg-gray-600 w-100 rounded-2xl pb-5 pt-2 ">
            <div className="bg-lime-300 px-4 mx-1.5  border border-black rounded-full my-4 flex justify-between ">
              <span className="font-bold text-[18px]">Pokemon</span>
              <span className=" text-[18px] ">{name}</span>
              <span className="text-[18px]">{name}</span>
            </div>

            <table className=" mx-auto text-center border  border-black  ">
              <tbody>
                <tr className="bg-lime-300 ">
                  <td className="font-bold text-[15px]  w-30">Altura</td>
                  <td>{height || "-"}</td>
                </tr>
                <tr className="bg-lime-300 ">
                  <td className="font-bold text-[15px] w-30">Peso</td>
                  <td>{weight || "-"}</td>
                </tr>
                <tr className="bg-lime-300 ">
                  <td className="font-bold text-[15px] w-30 ">Habilidades</td>
                  <td className="w-35">
                    {skills.length ? skills.join(", ") : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

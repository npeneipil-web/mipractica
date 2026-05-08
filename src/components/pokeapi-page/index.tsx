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
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [tempSearch, setTempSearch] = useState<string>("");
  //cree un objeto vacío con valores por defecto

  //agregue un estado para saber si ya busque algo
  const [hasSearch, setHasSearch] = useState(false);

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
        setPokemonData({
          src: data.sprites.front_default,
          name: data.name,
          height: data.height,
          weight: data.weight,
          skills: data.abilities.map((a: any) => a.ability.name),
        });
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
        <div className="flex gap-2 mb-8 absolute top-40 left-215  ">
          <input
            className="border p-2 rounded shadow-sm"
            type="text"
            placeholder="Ej: ditto, pikachu..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded relative"
          onClick={() => {
            (setHasSearch(true), setSearchPokemon(tempSearch.trim()));
          }}
        >
          Buscar
        </button>
        {hasSearch && !pokemonData && (
          <p className="text-gray-500 absolute top-70">
            No se encontró el Pokémon.
          </p>
        )}
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
          <div className="bg-white w-60 border border-slate-800 mt-3 m-6 h-60 ">
            {src.length > 0 && (
              <img src={src} alt={name} className="w-60 h-60 mx-auto mb-auto" />
            )}
          </div>
          <div className="bg-gray-600 w-70 rounded-2xl pb-4 pt-1">
            <div className="bg-lime-300 px-4 mx-1.5  border border-black rounded-full my-4 flex justify-between ">
              <span className="font-bold text-[18px]">Pokemon</span>
              <span className=" text-[18px] ">{name}</span>
              <span className="text-[18px]">{name}</span>
            </div>

            <table className=" mx-auto text-center border border-black  ">
              <tbody>
                <tr className="bg-lime-300 ">
                  <td className="font-bold text-[15px]">Altura</td>
                  <td>{height}</td>
                </tr>
                <tr className="bg-lime-300 ">
                  <td className="font-bold text-[15px]">Peso</td>
                  <td>{weight}</td>
                </tr>
                <tr className="bg-lime-300 ">
                  <td className="font-bold text-[15px]">Habilidades</td>
                  <td>
                    {skills.length ? skills.join(" , ") : "sin habilidades"}
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

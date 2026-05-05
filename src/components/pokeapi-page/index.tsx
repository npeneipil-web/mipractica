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

export const PokeApiPage = () => {
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [tempSearch, setTempSearch] = useState<string>("");

  useEffect(() => {
    if (!searchPokemon) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
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
        console.error("Error fetching data:", error);
      });
  }, [searchPokemon]);

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="flex gap-2 mb-8">
        <input
          className="border p-2 rounded shadow-sm"
          type="text"
          placeholder="Ej: ditto, pikachu..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setSearchPokemon(tempSearch)}
        >
          Buscar
        </button>
      </div>

      {!pokemonData && (
        <p className="text-gray-500">No se encontró el Pokémon.</p>
      )}
      {pokemonData && (
        <PokemonTable
          {...pokemonData}
          //   src={pokemonData.src}
          //   name={pokemonData.name}
          //   height={pokemonData.height}
          //   weight={pokemonData.weight}
          //   skills={pokemonData.skills}
        />
      )}
    </div>
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 w-full max-w-md mb-10">
      <img src={src} alt={name} className="w-60 h-60 mx-auto mb-4" />
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-bold text-[18px]">Nombre</td>
            <td className="capitalize">{name}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Altura</td>
            <td>{height}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Peso</td>
            <td>{weight}</td>
          </tr>
          <tr>
            <td className="font-bold text-[18px]">Habilidades</td>
            <td>{skills.join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

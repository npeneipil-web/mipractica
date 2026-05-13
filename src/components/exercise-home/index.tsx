import { useState } from 'react'

export const App=()=>{
  // 1. Definimos los tipos de datos con TypeScript (un arreglo de strings)
  const [regalos, setRegalos] = useState<string[]>(['car', 'doll#arm', 'ball', '#train']);

  // 2. La función del reto adaptada a TSX
  const filtrarLosRegalos = (lista: string[]): string[] => {
    return lista.filter(regalo => !regalo.includes('#'));
  };

  const regalosLimpios = filtrarLosRegalos(regalos);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-red-600 mb-4 text-center">
          Reto #1: 🎁 Filtrar Regalos
        </h1>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Lista Original:</h2>
          <div className="flex flex-wrap gap-2">
            {regalos.map((r, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm ${r.includes('#') ? 'bg-red-100 text-red-600 line-through' : 'bg-gray-200'}`}>
                {r}
              </span>
            ))}
          </div>
        </div>

        <hr className="mb-6" />

        <div>
          <h2 className="text-sm font-semibold text-green-600 uppercase mb-2">Regalos sin defectos:</h2>
          <div className="flex flex-wrap gap-2">
            {regalosLimpios.length > 0 ? (
              regalosLimpios.map((r, i) => (
                <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold border border-green-200">
                  {r}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No quedan regalos válidos.</p>
            )}
          </div>
        </div>

        {/* Botón para resetear o probar otro caso del ejemplo */}
        <button 
          onClick={() => setRegalos(['#broken', '#rusty'])}
          className="mt-8 w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          Probar Caso #2 (Vacío)
        </button>
      </div>
      
      <p className="mt-4 text-xs text-gray-400">
        Practicando .filter() en TypeScript
      </p>
    </div>
  );
}

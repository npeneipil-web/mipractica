import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center font-sans">
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        ir a home
      </Link>
      <Link
        to="/employee"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a la página de empleados
      </Link>
      <Link
        to="/404"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a la página de error
      </Link>
      <Link
        to="/input-form"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a la página de formulario
      </Link>
      <Link to="/pokeApi"> Ir a la pagina de poke api</Link>
      <Link to="/calculadora" className="bg-yellow-300">
        Ir a la pagina de ejemplo Calculadora
      </Link>
      <Link to="/lorempicsum">Ir a Lorem</Link>
      <Link to="/practica"> Ir a Practica </Link>
      <Link to="/articulos" className="border-2 bg-gray-500">
        Buscar Articulos de Supermercado
      </Link>
    </div>
  );
};

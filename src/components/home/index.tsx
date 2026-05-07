import { Link } from "react-router-dom";

export const Home = ({ children }: React.PropsWithChildren) => {
  const design =
    "w-35  text-white flex hover:text-black font-bold py-2 px-4 bg-gray-400 hover:bg-gray-100 transform transition hover:translate-1 motion-reduce:hover:transform-none";

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-8 flex  font-sans shado">
        <div className="flex flex-col">
          <Link to="/" className={design}>
            Home
          </Link>
          <Link to="/employee" className={design}>
            Empleados
          </Link>
          <Link to="/404" className={design}>
            Error 404
          </Link>
          <Link to="/input-form" className={design}>
            Formulario
          </Link>
          <Link to="/pokeApi" className={design}>
            PokeApi
          </Link>
          <Link to="/calculadora" className={design}>
            Calculadora
          </Link>
          <Link to="/lorempicsum" className={design}>
            Lorem
          </Link>
          <Link to="/practica" className={design}>
            Practica
          </Link>
          <Link to="/articulos" className={design}>
            Supermercado
          </Link>
        </div>
        <div className="flex w-full bg-white justify-center">{children}</div>
      </div>
    </>
  );
};

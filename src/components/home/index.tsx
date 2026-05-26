import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@outlier-spa/component";
import { Link } from "react-router-dom";

export const Home = () => {
  const design =
    "text-white w-90  flex hover:text-black font-bold py-2 px-4 bg-gray-400 hover:bg-gray-100 transform transition hover:translate-1 motion-reduce:hover:transform-none";

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>
        <SheetContent>
          <div className="min-h-screen bg-slate-0 p-4 flex justify-center  font-sans shado">
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
              <Link to="/calculator" className={design}>
                Calculadora 2
              </Link>
              <Link to="/cat" className={design}>
                Gato
              </Link>
              <Link to="/ajedrez" className={design}>
                Ajedrez
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

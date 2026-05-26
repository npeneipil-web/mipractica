import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@outlier-spa/component";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>
        <SheetContent>
          <div className="min-h-screen w-full  bg-slate-0 p-5 flex justify-center  font-sans shado]">
            <div className="flex flex-col w-full">
              <Button variant="outline" className="w-full">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/employee">Empleados</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/404">Error 404</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/input-form">Formulario</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/pokeApi">PokeApi</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/calculadora">Calculadora</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/lorempicsum">Lorem</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/practica">Practica</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/articulos">Supermercado</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/calculator">Calculadora 2</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/cat">Gato</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/ajedrez">Ajedrez</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

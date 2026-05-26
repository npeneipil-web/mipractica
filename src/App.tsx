import { PresentationLetter } from "./components/presentation-letter";

import {
  BrowserRouter as BrouserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/home";
import { InputFormPage } from "./components/input-form";
import { PokeApiPage } from "./components/pokeapi-page";
import { ErrorPage } from "./components/error";
import { CalculadoraTable } from "./components/examples/calculadora";
import Gallery from "./components/examples/component";
import { LoremPicsumPage } from "./components/lorem-picsum";
import { Presentations } from "./components/practice";
import { Article } from "./components/exercise-super";
import { Calculator } from "./components/examples/calculator";
import { Cat } from "./components/cat/index";
import { Ajedrez } from "./components/ajedrez";

import { Button, Switch, Sheet, Outlier } from "@outlier-spa/component";
const { ThemeProvider } = Outlier;

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrouserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home></Home>
                <div>
                  <Button variant="default">Destructive button</Button>
                  <p>Bienvenido a mi práctica</p>
                  <Switch>ejemplo</Switch>
                </div>
              </>
            }
          />
          <Route
            path="/employee"
            element={
              <>
                <Home></Home> <PresentationLetter />
              </>
            }
          />
          <Route
            path="/404"
            element={
              <>
                <Home></Home> <ErrorPage />
              </>
            }
          />
          <Route
            path="/input-form"
            element={
              <>
                <Home></Home>
                <InputFormPage />
              </>
            }
          />
          <Route
            path="/pokeapi"
            element={
              <>
                <Home></Home>
                <PokeApiPage />
              </>
            }
          />
          <Route
            path="/calculadora"
            element={
              <>
                {" "}
                <Home></Home>
                <CalculadoraTable />
              </>
            }
          />
          <Route
            path="/gallery"
            element={
              <>
                <Home></Home>
                <Gallery />
              </>
            }
          />
          <Route
            path="/lorempicsum"
            element={
              <>
                <Home></Home>
                <LoremPicsumPage />
              </>
            }
          />
          <Route
            path="/practica"
            element={
              <>
                <Home></Home>
                <Presentations />
              </>
            }
          />
          <Route
            path="/articulos"
            element={
              <>
                <Home></Home>
                <Article />
              </>
            }
          />
          <Route
            path="/calculator"
            element={
              <>
                <Home></Home>
                <Calculator />
              </>
            }
          />
          <Route
            path="/cat"
            element={
              <>
                <Home></Home>
                <Cat />
              </>
            }
          />
          <Route
            path="/ajedrez"
            element={
              <>
                <Home></Home>
                <Ajedrez />
              </>
            }
          />

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrouserRouter>
    </ThemeProvider>
  );
}

export default App;

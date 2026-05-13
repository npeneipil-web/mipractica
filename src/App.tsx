import { useState } from "react";
import { EmployeeTable } from "./components/emloy-table";
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

function App() {
  return (
    <BrouserRouter>
      <Home>
        <Routes>
          <Route path="/" element={<>Bienvenido a mi práctica</>} />
          <Route path="/employee" element={<PresentationLetter />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/input-form" element={<InputFormPage />} />
          <Route path="/pokeapi" element={<PokeApiPage />} />
          <Route path="/calculadora" element={<CalculadoraTable />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/lorempicsum" element={<LoremPicsumPage />} />
          <Route path="/practica" element={<Presentations />} />
          <Route path="/articulos" element={<Article />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/cat" element={<Cat/>}/>

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Home>
    </BrouserRouter>
  );
}

export default App;

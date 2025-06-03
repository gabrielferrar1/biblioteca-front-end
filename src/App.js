import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./componentes/Menu";
import FormCategoria from "./paginas/FormCategoria";
import Home from "./paginas/Home";
import ListaCategoria from "./paginas/ListaCategoria";
import FormAutor from "./paginas/FormAutor";
import ListaAutor from "./paginas/ListaAutor";
import FormEditora from "./paginas/FormEditora";
import ListaEditora from "./paginas/ListaEditora";
import FormLivros from "./paginas/FormLivros";
import ListaLivros from "./paginas/ListaLivros";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listacategoria" element={<ListaCategoria />} />
            <Route path="/cadastrocategoria" element={<FormCategoria />} />
            <Route path="/cadastrocategoria/:id" element={<FormCategoria />} />
            <Route path="/listaautor" element={<ListaAutor />} />
            <Route path="/cadastroautor" element={<FormAutor />} />
            <Route path="/cadastroautor/:id" element={<FormAutor />} />
            <Route path="/listaeditora" element={<ListaEditora />} />
            <Route path="/cadastroeditora" element={<FormEditora />} />
            <Route path="/cadastroeditora/:id" element={<FormEditora />} />
            <Route path="/listalivros" element={<ListaLivros />} />
            <Route path="/cadastrolivros" element={<FormLivros />} />
            <Route path="/cadastrolivros/:id" element={<FormLivros />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

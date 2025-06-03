import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaLivros() {
  //Declarando uma variavel de estado (useState) para armazenar os dados
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/livro`);
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Livros"
        descricao="Gerencie aqui os livros da biblioteca"
        rota="/cadastrolivros"
      />

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Código</th>
                <th scope="col">Titulo</th>
                <th scope="col">Ano de Publicação</th>
                <th scope="col">Categoria</th>
                <th scope="col">Editora</th>
                <th scope="col">Número de Edição</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((d, i) => (
                <tr>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/cadastrolivros/${d.id_livro}`}
                    >
                      Alterar
                    </a>
                  </td>
                  <td>{d.id_livro}</td>
                  <td>{d.titulo}</td>
                  <td>{d.publicacao}</td>
                  <td>{d.id_categoria}</td>
                  <td>{d.id_editora}</td>
                  <td>{d.edicao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaAutor() {
  //Declarando uma variavel de estado (useState) para armazenar os dados
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/autor`);
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Autores"
        descricao="Gerencie aqui os autores dos livros da biblioteca"
        rota="/cadastroautor"
      />

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">Nascimento</th>
                <th scope="col">Fotografia</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((d, i) => (
                <tr>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/cadastroautor/${d.id_autor}`}
                    >
                      Alterar
                    </a>
                  </td>
                  <td>{d.id_autor}</td>
                  <td>{d.nome_autor}</td>
                  <td>{d.data_nascimento}</td>
                  <td>
                    <img
                      className="img-thumbnail"
                      src={d.foto}
                      style={{ width: "80px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

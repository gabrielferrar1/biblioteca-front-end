import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaEditora() {
  //Declarando uma variavel de estado (useState) para armazenar os dados
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/editora`);
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Editoras"
        descricao="Gerencie aqui as editoras da biblioteca"
        rota="/cadastroeditora"
      />

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Código</th>
                <th scope="col">Nome Editora</th>
                <th scope="col">CNPJ</th>
                <th scope="col">Endereço</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((d, i) => (
                <tr>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/cadastroeditora/${d.id_editora}`}
                    >
                      Alterar
                    </a>
                  </td>
                  <td>{d.id_editora}</td>
                  <td>{d.nome_editora}</td>
                  <td>{d.cnpj}</td>
                  <td>{d.endereco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

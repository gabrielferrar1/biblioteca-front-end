import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaFuncionario() {
  //Declarando uma variavel de estado (useState) para armazenar os dados
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/funcionario`);
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Funcionários"
        descricao="Gerencie aqui os funcionários da biblioteca"
        rota="/cadastrofuncionario"
      />

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Código</th>
                <th scope="col">Nome Funcionário</th>
                <th scope="col">E-mail</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((d, i) => (
                <tr>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/cadastrofuncionario/${d.id_funcionario}`}
                    >
                      Alterar
                    </a>
                  </td>
                  <td>{d.id_funcionario}</td>
                  <td>{d.nome_funcionario}</td>
                  <td>{d.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

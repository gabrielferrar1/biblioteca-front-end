import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaUsuario() {
  //Declarando uma variavel de estado (useState) para armazenar os dados
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/usuario`);
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Usuários"
        descricao="Gerencie aqui os usuários da biblioteca"
        rota="/cadastrousuario"
      />

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((d, i) => (
                <tr>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/cadastrousuario/${d.id_usuario}`}
                    >
                      Alterar
                    </a>
                  </td>
                  <td>{d.id_usuario}</td>
                  <td>{d.nome}</td>
                  <td>{d.email}</td>
                  <td>{d.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

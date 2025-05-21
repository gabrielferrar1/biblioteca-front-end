import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaCategoria() {
  //Declarando uma variavel de estado (useState) para armazenar os dados
  const [dados, setDados] = useState([]);

  const listar = async () => {
    let { data } = await axios.get(`http://localhost:4000/categoria`);
    console.log(data);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista
        titulo="Categorias"
        descricao="Gerencie aqui as categorias dos livros da biblioteca"
        rota="/cadastrocategoria"
      />

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Código</th>
                <th scope="col">Categoria</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((d, i) => (
                <tr>
                  <td>
                    <a
                      className="btn btn-primary"
                      href={`/cadastrocategoria/${d.id_categoria}`}
                    >
                      Alterar
                    </a>
                  </td>
                  <td>{d.id_categoria}</td>
                  <td>{d.nome_categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

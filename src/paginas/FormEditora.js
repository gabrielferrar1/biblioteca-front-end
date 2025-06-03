import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormEditora() {
  const navegacao = useNavigate();
  const { id } = useParams();
  const [nomeeditora, setNomeEditora] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  const voltar = () => {
    navegacao("/listaeditora");
  };

  const excluir = async () => {
    await axios.delete(`http://localhost:4000/editora/${id}`);
    voltar();
  };

  const selecionar = async () => {
    let { data } = await axios.get(`http://localhost:4000/editora/${id}`);
    setNomeEditora(data.nome_editora);
    setCnpj(data.cnpj);
    setEndereco(data.endereco);
  };

  const alterar = async () => {
    let body = {
      nome_editora: nomeeditora,
      cnpj: cnpj,
      endereco: endereco,
    };
    await axios.put(`http://localhost:4000/editora/${id}`, body);
    voltar();
  };

  const inserir = async () => {
    let body = {
      nome_editora: nomeeditora,
      cnpj: cnpj,
      endereco: endereco,
    };
    await axios.post(`http://localhost:4000/editora`, body);
    voltar();
  };

  const salvar = async () => {
    if (id) {
      alterar();
    } else {
      inserir();
    }
  };

  useEffect(() => {
    if (id) {
      selecionar();
    }
  }, []);

  return (
    <>
      <TituloCadastro id={id} titulo="Editora" />

      <form>
        {id && (
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input type="text" className="form-control" value={id} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Nome da Editora</label>
          <input
            type="text"
            className="form-control"
            value={nomeeditora}
            onChange={(evento) => setNomeEditora(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CNPJ</label>
          <input
            type="text"
            className="form-control"
            value={cnpj}
            onChange={(evento) => setCnpj(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Endereço</label>
          <input
            type="text"
            className="form-control"
            value={endereco}
            onChange={(evento) => setEndereco(evento.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => salvar()}
        >
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => voltar()}
        >
          Cancelar
        </button>
        {id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => excluir()}
          >
            Excluir
          </button>
        )}
      </form>
    </>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormAutor() {
  const navegacao = useNavigate();
  const { id } = useParams();
  //Declarar um useState para cada campo da tabela
  const [nomeautor, setNomeAutor] = useState("");
  const [datanascimento, setDataNascimentoAutor] = useState("");
  const [biografia, setBiografiaAutor] = useState("");
  const [nacionalidade, setNacionalidadeAutor] = useState("");
  const [foto, setFoto] = useState("");

  const voltar = () => {
    navegacao("/listaautor");
  };

  const excluir = async () => {
    await axios.delete(`http://localhost:4000/autor/${id}`);
    voltar();
  };

  const selecionar = async () => {
    let { data } = await axios.get(`http://localhost:4000/autor/${id}`);
    //Carregar cada campo na sua respectiva variável de estado
    setNomeAutor(data.nome_autor);
    setDataNascimentoAutor(data.data_nascimento);
    setBiografiaAutor(data.biografia);
    setNacionalidadeAutor(data.nacionalidade);
    setFoto(data.foto);
  };

  const alterar = async () => {
    //Criar o corpo da requisição com os dados do formulário
    let body = {
      nome_autor: nomeautor,
      data_nascimento: datanascimento,
      biografia: biografia,
      nacionalidade: nacionalidade,
      foto: foto,
    };
    await axios.put(`http://localhost:4000/autor/${id}`, body);
    voltar();
  };

  const inserir = async () => {
    let body = {
      nome_autor: nomeautor,
      data_nascimento: datanascimento,
      biografia: biografia,
      nacionalidade: nacionalidade,
      foto: foto,
    };
    await axios.post(`http://localhost:4000/autor`, body);
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
      <TituloCadastro id={id} titulo="Autor" />

      <form>
        {id && (
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input type="text" className="form-control" value={id} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Nome do Autor</label>
          <input
            type="text"
            className="form-control"
            value={nomeautor}
            onChange={(evento) => setNomeAutor(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="text"
            className="form-control"
            value={datanascimento}
            onChange={(evento) => setDataNascimentoAutor(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Biografia</label>
          <textarea
            className="form-control"
            value={biografia}
            onChange={(evento) => setBiografiaAutor(evento.target.value)}
            rows={5}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Nacionalidade</label>
          <input
            type="text"
            className="form-control"
            value={nacionalidade}
            onChange={(evento) => setNacionalidadeAutor(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foto</label>
          <input
            type="text"
            className="form-control"
            value={foto}
            onChange={(evento) => setFoto(evento.target.value)}
          />
          <img className="img-thumbnail" style={{ width: "80px" }} />
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

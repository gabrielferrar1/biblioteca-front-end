import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivros() {
  const navegacao = useNavigate();
  const { id } = useParams();
  const [nometitulo, setTitulo] = useState("");
  const [publicacao, setPublicacao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editora, setEditora] = useState("");
  const [edicao, setEdicao] = useState("");
  const [paginas, setPaginas] = useState("");
  const [resumo, setResumo] = useState("");

  const voltar = () => {
    navegacao("/listalivros");
  };

  const excluir = async () => {
    await axios.delete(`http://localhost:4000/livro/${id}`);
    voltar();
  };

  const selecionar = async () => {
    let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
    setTitulo(data.titulo);
    setPublicacao(data.publicacao);
    setCategoria(data.id_categoria);
    setEditora(data.id_editora);
    setEdicao(data.edicao);
    setPaginas(data.paginas);
    setResumo(data.resumo);
  };

  const alterar = async () => {
    let body = {
      titulo: nometitulo,
      publicacao: publicacao,
      id_editora: 2,
      id_categoria: categoria,
      edicao: edicao,
      paginas: paginas,
      resumo: resumo,
    };
    await axios.put(`http://localhost:4000/livro/${id}`, body);
    voltar();
  };

  const inserir = async () => {
    let body = {
      titulo: nometitulo,
      publicacao: publicacao,
      id_editora: editora,
      id_categoria: categoria,
      edicao: edicao,
      paginas: paginas,
      resumo: resumo,
    };
    await axios.post(`http://localhost:4000/livro`, body);
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
      <TituloCadastro id={id} titulo="Livro" />

      <form>
        {id && (
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input type="text" className="form-control" value={id} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Titulo</label>
          <input
            type="text"
            className="form-control"
            value={nometitulo}
            onChange={(evento) => setTitulo(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ano de Publicação</label>
          <input
            type="integer"
            className="form-control"
            value={publicacao}
            onChange={(evento) => setPublicacao(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <input
            type="integer"
            className="form-control"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Editora</label>
          <input
            type="integer"
            className="form-control"
            value={editora}
            onChange={(evento) => setEditora(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Edição</label>
          <input
            type="text"
            className="form-control"
            value={edicao}
            onChange={(evento) => setEdicao(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Resumo</label>
          <input
            type="text"
            className="form-control"
            value={resumo}
            onChange={(evento) => setResumo(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantidade de Páginas</label>
          <input
            type="text"
            className="form-control"
            value={paginas}
            onChange={(evento) => setPaginas(evento.target.value)}
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

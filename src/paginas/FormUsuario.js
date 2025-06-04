import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormUsuario() {
  const navegacao = useNavigate();
  const { id } = useParams();
  //Declarar um useState para cada campo da tabela
  const [nomeusuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [datanascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  const voltar = () => {
    navegacao("/listausuario");
  };

  const excluir = async () => {
    await axios.delete(`http://localhost:4000/usuario/${id}`);
    voltar();
  };

  const selecionar = async () => {
    let { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
    //Carregar cada campo na sua respectiva variável de estado
    setNomeUsuario(data.nome);
    setEmail(data.email);
    setTelefone(data.telefone);
    setCpf(data.cpf);
    setDataNascimento(data.data_nascimento);
    setSenha(data.senha);
  };

  const alterar = async () => {
    //Criar o corpo da requisição com os dados do formulário
    let body = {
      nome: nomeusuario,
      cpf: cpf,
      data_nascimento: datanascimento,
      email: email,
      telefone: telefone,
      senha: senha,
    };
    await axios.put(`http://localhost:4000/usuario/${id}`, body);
    voltar();
  };

  const inserir = async () => {
    let body = {
      nome: nomeusuario,
      cpf: cpf,
      data_nascimento: datanascimento,
      email: email,
      telefone: telefone,
      senha: senha,
    };
    await axios.post(`http://localhost:4000/usuario`, body);
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
      <TituloCadastro id={id} titulo="Usuários" />

      <form>
        {id && (
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input type="text" className="form-control" value={id} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Nome do Usuário</label>
          <input
            type="text"
            className="form-control"
            value={nomeusuario}
            onChange={(evento) => setNomeUsuario(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            value={cpf}
            onChange={(evento) => setCpf(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            value={datanascimento}
            onChange={(evento) => setDataNascimento(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={(evento) => setTelefone(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
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

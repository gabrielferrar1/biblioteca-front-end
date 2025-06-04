import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormFuncionario() {
  const navegacao = useNavigate();
  const { id } = useParams();
  //Declarar um useState para cada campo da tabela
  const [nomefuncionario, setNomeFuncionario] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [datanascimento, setDataNascimento] = useState("");
  const [salario, setSalario] = useState("");
  const [contratacao, setContratacao] = useState("");
  const [demissao, setDemissao] = useState("");
  const [senha, setSenha] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [token, setToken] = useState("");

  const voltar = () => {
    navegacao("/listafuncionario");
  };

 
const demitir = async () => {
  let body = {
    id_funcionario: id,
    demissao: demissao,
  };
  await axios.put(`http://localhost:4000/funcionarioDemitir`, body);
  voltar();
};

  const selecionar = async () => {
    let { data } = await axios.get(`http://localhost:4000/funcionario/${id}`);
    //Carregar cada campo na sua respectiva variável de estado
    setNomeFuncionario(data.nome_funcionario);
    setCpf(data.cpf);
    setEmail(data.emaiL);
    setTelefone(data.telefone);
    setDataNascimento(data.data_nascimento);
    setSalario(data.salario);
    setContratacao(data.contratacao);
    setDemissao(data.demissao);
    setAtivo(data.ativo);
    setSenha(data.senha);
    setToken(data.token);
  };

  const alterar = async () => {
    //Criar o corpo da requisição com os dados do formulário
    let body = {
      id_funcionario: id,
      nome_funcionario: nomefuncionario,
      cpf: cpf,
      email: email,
      telefone: telefone,
      data_nascimento: datanascimento,
      salario: salario,
      contratacao: contratacao,
    };
    await axios.put(`http://localhost:4000/funcionario/${id}`, body);
    voltar();
  };

  const inserir = async () => {
    let body = {
      nome_funcionario: nomefuncionario,
      cpf: cpf,
      email: email,
      telefone: telefone,
      data_nascimento: datanascimento,
      salario: salario,
      contratacao: contratacao,
    };
    await axios.post(`http://localhost:4000/funcionario`, body);
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
      <TituloCadastro id={id} titulo="Funcionários" />

      <form>
        {id && (
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input type="text" className="form-control" value={id} />
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Nome do Funcionário</label>
          <input
            type="text"
            className="form-control"
            value={nomefuncionario}
            onChange={(evento) => setNomeFuncionario(evento.target.value)}
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
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            value={datanascimento}
            onChange={(evento) => setDataNascimento(evento.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salário</label>
          <input
            type="numeric"
            className="form-control"
            value={salario}
            onChange={(evento) => setSalario(evento.target.value)}
          />
        </div>
         <div className="mb-3">
          <label className="form-label">Contratação</label>
          <input
            type="date"
            className="form-control"
            value={contratacao}
            onChange={(evento) => setContratacao(evento.target.value)}
          />
        </div>
     
         <div className="mb-3">
          <label className="form-label">Ativo</label>
          <input
            type="boolean"
            className="form-control"
            value={ativo}
            onChange={(evento) => setAtivo(evento.target.value)}
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
        <div className="mb-3">
          <label className="form-label">Token</label>
          <input
            type="token"
            className="form-control"
            value={token}
            onChange={(evento) => setToken(evento.target.value)}
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
            onClick={() => demitir()}
          >
            Demitir
          </button>
        )}
      </form>
    </>
  );
}

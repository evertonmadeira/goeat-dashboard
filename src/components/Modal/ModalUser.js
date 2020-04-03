import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function ModalUser() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function onSubmit(e) {
    e.preventDefault();

    const user = {
      nome,
      sobrenome,
      cpf,
      email,
      senha
    }

    try {
      await axios.post('http://localhost:5000/user/register', user);
      history.go('/user')
    } catch (error) {
      alert('Erro ao adicionar usuário');
    }

    setNome();
    setSobrenome();
    setCpf();
    setEmail();
    setSenha();

  }

  return (
    <div>
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addUserModal">
          Add
          </button>
      </div>

      <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Novo Usuário</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Nome: </label>
                  <input type="text"
                    name="nome"
                    required
                    className="form-control"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Sobrenome: </label>
                  <input type="text"
                    name="sobrenome"
                    required
                    className="form-control"
                    value={sobrenome}
                    onChange={e => setSobrenome(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>CPF: </label>
                  <input type="text"
                    name="cpf"
                    maxLength={11}
                    required
                    className="form-control"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>E-mail: </label>
                  <input type="email"
                    name="email"
                    placeholder="nome@exemplo.com"
                    required
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Senha: </label>
                  <input type="password"
                    name="senha"
                    required
                    className="form-control"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" >Adicionar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



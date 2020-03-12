import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeSobrenome = this.onChangeSobrenome.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSenha = this.onChangeSenha.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nome: '',
      sobrenome: '',
      cpf: 0,
      email: '',
      senha: '',
      users: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/user/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          nome: res.data.nome,
          sobrenome: res.data.sobrenome,
          cpf: res.data.cpf,
          email: res.data.email,
          senha: res.data.senha,
        })
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:5000/user/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            user: res.data.map(user => user.nome),
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    })
  }
  onChangeSobrenome(e) {
    this.setState({
      sobrenome: e.target.value
    })
  }
  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeSenha(e) {
    this.setState({
      senha: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      nome: this.state.nome,
      sobrenome: this.state.sobrenome,
      cpf: this.state.cpf,
      email: this.state.email,
      senha: this.state.senha
    }

    console.log(user);

    axios.post('http://localhost:5000/user/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/admin/user'
  }

  render() {
    return (
      <div>
        <h3>Alterar dados do usuário</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nome: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.nome}
              onChange={this.onChangeNome}
            />
          </div>
          <div className="form-group">
            <label>Sobrenome: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.sobrenome}
              onChange={this.onChangeSobrenome}
            />
          </div>
          <div className="form-group">
            <label>CPF: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.cpf}
              onChange={this.onChangeCpf}
            />
          </div>
          <div className="form-group">
            <label>E-mail: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Senha: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.senha}
              onChange={this.onChangeSenha}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Salvar alterações" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.nome}</td>
    <td>{props.user.sobrenome}</td>
    <td>{props.user.cpf}</td>
    <td>
      <Link to={"/edit-user/" + props.user._id}>Editar</Link> |
        <a href="#" onClick={() => { props.deleteUser(props.user._id) }}> Excluir</a>
    </td>
  </tr>
)

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = { user: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/user/')
      .then(res => {
        this.setState({ user: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/user/delete/' + id)
      .then(res => { console.log(res.data) });

    this.setState({
      user: this.state.user.filter(element => element._id !== id)
    })
  }

  userList() {
    return this.state.user.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Usuários</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.userList()}
          </tbody>
        </table>
      </div>
    )
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => (
  <tr>
    <td>{props.item.nome}</td>
    <td>{props.item.categoria}</td>
    <td>R${props.item.preco}</td>
    <td>
      <Link to={"/edit-item/" + props.item._id}>Editar</Link> | 
        <a href="/edit-item/" onClick={() => { props.deleteItem(props.item._id) }}> Excluir</a>
    </td>
  </tr>
)

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this)

    this.state = { item: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/product/')
      .then(res => {
        this.setState({ item: res.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteItem(id) {
    axios.delete('http://localhost:5000/product/delete/' +id)
      .then(res => { console.log(res.data) });

    this.setState({
      item: this.state.item.filter(element => element._id !== id)
    })
  }

  itemList() {
    return this.state.item.map(currentitem => {
      return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Produtos</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.itemList()}
          </tbody>
        </table>
      </div>
    )
  }
}
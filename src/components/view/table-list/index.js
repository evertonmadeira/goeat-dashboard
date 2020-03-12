import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Table = props => (
  <tr>
    <td>{props.table.num}</td>
    <td>{props.table.estado}</td>
    <td>{props.table.qrcode}</td>
    <td>
      <Link to={"/edit-table/" + props.table._id}>Editar</Link> |
        <a href="#" onClick={() => { props.deleteTable(props.table._id) }}> Excluir</a>
    </td>
  </tr>
)

export default class TableList extends Component {
  constructor(props) {
    super(props);

    this.deleteTable = this.deleteTable.bind(this)

    this.state = { table: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/table/')
      .then(res => {
        this.setState({ table: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteTable(id) {
    axios.delete('http://localhost:5000/table/delete/' + id)
      .then(res => { console.log(res.data) });

    this.setState({
      table: this.state.table.filter(element => element._id !== id)
    })
  }

  tableList() {
    return this.state.table.map(currenttable => {
      return <Table table={currenttable} deleteTable={this.deleteTable} key={currenttable._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Mesas</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Número</th>
              <th>Estado</th>
              <th>QR Code</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.tableList()}
          </tbody>
        </table>
      </div>
    )
  }
}

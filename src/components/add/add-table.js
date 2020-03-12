import React, { Component } from 'react';
import axios from 'axios';
import TableList from '../view/table-list'
// import { Container } from './styles';

export default class CreateTable extends Component {
  constructor(props) {
    super(props);

    this.onChangeNum = this.onChangeNum.bind(this);
    this.onChangeEstado = this.onChangeEstado.bind(this);
    this.onChangeQr = this.onChangeQr.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      num: '',
      estado: '',
      qrcode: '',
    }
  }

  onChangeNum(e) {
    this.setState({
      num: e.target.value
    })
  }
  onChangeEstado(e) {
    this.setState({
      estado: e.target.value
    })
  }
  onChangeQr(e) {
    this.setState({
      qrcode: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const table = {
      num: this.state.num,
      estado: this.state.estado,
      qrcode: this.state.qrcode,
    }

    console.log(table);

    axios.post('http://localhost:5000/table/add', table)
      .then(res => console.log(res.data));

    this.setState({
      num: '',
      estado: '',
      qrcode: '',
    })

    window.location = 'admin/table'
  }
  render() {
    return (
      <div>
        <h3>Adicionar Mesa</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Número: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.num}
              onChange={this.onChangeNum}
            />
          </div>
          <div className="form-group">
            <label>Estado: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.estado}
              onChange={this.onChangeEstado}
            />
          </div>
          <div className="form-group">
            <label>QR Code: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.qrcode}
              onChange={this.onChangeQr}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Adicionar" className="btn btn-primary" />
          </div>
        </form>
        <TableList />
      </div>
    )
  }
}

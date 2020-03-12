import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.OnChangeNum = this.OnChangeNum.bind(this);
    this.OnChangeEstado = this.OnChangeEstado.bind(this);
    this.OnChangeQr = this.OnChangeQr.bind(this);

    this.state = {
      numero: '',
      estado: '',
      qrcode: '',
      tables: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/table/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          numero: res.data.numero,
          estado: res.data.estado,
          qrcode: res.data.qrcode,
        })
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:5000/table/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            table: res.data.map(table => table.numero),
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  OnChangeNum(e) {
    this.setState({
      numero: e.target.value
    })
  }
  OnChangeEstado(e) {
    this.setState({
      estado: e.target.value
    })
  }
  OnChangeQr(e) {
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

    axios.post('http://localhost:5000/table/update/' + this.props.match.params.id, table)
      .then(res => console.log(res.data));

    window.location = '/admin/table'
  }

  render() {
    return (
      <div>
        <h3>Alterar Dados da Mesa</h3>
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
            <input type="submit" value="Salvar" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
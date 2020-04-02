import React, { Component } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

export default class EditItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeCategoria = this.onChangeCategoria.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nome: '',
      descricao: '',
      categoria: '',
      preco: '',
    }
  }

  // componentDidMount() {
  //   axios.get('http://localhost:5000/product/' + this.props.match.params.id)
  //     .then(res => {
  //       this.setState({
  //         nome: res.data.nome,
  //         descricao: res.data.descricao,
  //         categoria: res.data.categoria,
  //         preco: res.data.preco,
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })

  //   axios.get('http://localhost:5000/product/')
  //     .then(res => {
  //       if (res.data.length > 0) {
  //         this.setState({
  //           item: res.data.map(item => item.nome),
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })

  // }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    })
  }
  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    })
  }
  onChangeCategoria(e) {
    this.setState({
      categoria: e.target.value
    })
  }
  onChangePreco(e) {
    this.setState({
      preco: e.target.value
    })
  }
  onChangeImg(e) {
    this.setState({
      img: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const item = {
      nome: this.state.nome,
      descricao: this.state.descricao,
      categoria: this.state.categoria,
      preco: this.state.preco,
    }

    console.log(item);

    axios.post('http://localhost:5000/product/update/' + this.props.match.params.id, item)
      .then(res => console.log(res.data));

    window.location = '/item';
  }

  render() {
    return (
      <div>
        <div>
          <button  className="btn btn-warning" type="button" data-toggle="modal" data-target="#addUserModal" style={{marginRight: 5}}>
            <FaEdit color="black" />
          </button>
        </div>

        <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addUserModalLabel">Novo Produto</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Nome: </label>
                    <input type="text"
                      name="nome"
                      required
                      className="form-control"
                      value={this.state.nome}
                      onChange={this.onChangeNome}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrição: </label>
                    <textarea type="text"
                      name="descricao"
                      required
                      className="form-control rows=3"
                      value={this.state.descricao}
                      onChange={this.onChangeDescricao}
                    />
                  </div>

                  <div className="form-group">
                    <label>Categoria: </label>
                    <input type="text"
                      name="categoria"
                      required
                      className="form-control"
                      value={this.state.categoria}
                      onChange={this.onChangeCategoria}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preço: </label>
                    <input type="text"
                      name="preco"
                      required
                      className="form-control"
                      value={this.state.preco}
                      onChange={this.onChangePreco}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
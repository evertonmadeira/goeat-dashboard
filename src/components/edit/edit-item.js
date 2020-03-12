import React, { Component } from 'react';
import axios from 'axios';

export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeCategoria = this.onChangeCategoria.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nome: '',
      descricao: '',
      categoria: '',
      preco: 0,
      img: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/product/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          nome: '',
          descricao: '',
          categoria: '',
          preco: '',
          img:'',
        })
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:5000/product/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            item: res.data.map(item => item.nome),
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
      categoria: this.state.categoria,
      preco: this.state.preco,
    }

    console.log(item);

    axios.post('http://localhost:5000/product/update/'+this.props.match.params.id, item)
      .then(res => console.log(res.data));

    window.location = '/item';
  }

  render() {
    return (
      <div>
        <h3>Alterar dados do produto</h3>
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
            <label>Categoria: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.categoria}
              onChange={this.onChangeCategoria}
            />
          </div>
          <div className="form-group">
            <label>Preço: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.preco}
              onChange={this.onChangePreco}
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
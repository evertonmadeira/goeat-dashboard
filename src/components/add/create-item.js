import React, { Component } from 'react';
import axios from 'axios';
import ItemList from '../item-list';
import Upload from '../upload'
import FileList from '../file-list';
import { uniqueId } from "lodash";
import filesize from "filesize";
import '../../App.css';

export default class CreateItem extends Component {
  state = {
    uploadedFiles: [],
  }
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
      img: this.state.img,
    }

    console.log(item);

    axios.post('http://localhost:5000/product/add', item)
      .then(res => console.log(res.data));

    this.setState({
      nome: '',
      descricao: '',
      categoria: '',
      preco: '',
      img: '',
    })

    window.location = '/item'
  }

  async componentDidMount() {
    const response = await axios.get("product");

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    });
  }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    axios
      .post("product", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  handleDelete = async id => {
    await axios.delete(`product/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    return (
      <div>
        <h3>Adicionar Produto</h3>
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
            <label>Descrição: </label>
            <textarea type="text"
              required
              className="form-control rows=3"
              value={this.state.descricao}
              onChange={this.onChangeDescricao}
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
          <div>
          <Upload onUpload={this.handleUpload} />
          {/* {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )} */}
          </div>
          <p />
          <div className="form-group">
            <input type="submit"
              value="Adicionar"
              className="btn btn-primary"
            />
          </div>
        </form>
        <ItemList />
      </div>

    )
  }
}
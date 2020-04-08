import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Upload from "../Upload";
import FileList from "../FileList";
import { uniqueId } from "lodash";
import filesize from "filesize";

export default function ModalItem(props) {
  const [nome, setNome] = useState("");
  const [descricao] = useState("");
  const [categoria] = useState("");
  const [preco] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (props.item) console.log(props.item);
  }, [props.item]);

  const getFile = async () => {
    const response = await axios.get("product");

    setUploadedFiles(
      response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      }))
    );
  };

  useEffect(() => {
    getFile();

    return function Unmount() {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  function handleUpload(files) {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.nome,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles(uploadedFiles);
  }

  function updateFile(id, data) {
    setUploadedFiles(
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    );
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/product/delete/${id}`);

    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const item = {
      nome: e.target.elements["nome"].value,
      descricao: e.target.elements["descricao"].value,
      categoria: e.target.elements["categoria"].value,
      preco: e.target.elements["preco"].value,
      img: e.target.elements["img"].value,
      file: e.target.elements["file"].value[uploadedFiles[0].file],
    };

    const formData = new FormData();

    formData.append("nome", item.nome);
    formData.append("descricao", item.descricao);
    formData.append("categoria", item.categoria);
    formData.append("preco", item.preco);
    formData.append("img", item.img);
    formData.append("file", item.file, uploadedFiles[0].name);

    try {
      if (formData) {
        await axios.post(
          "http://localhost:5000/product/update/" + props.item._id,
          formData
        );
      } else {
        axios.post("http://localhost:5000/product/add", formData, {
          onUploadProgress: (e) => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));

            updateFile(uploadedFiles[0].id, {
              progress,
            });
          },
        });
      }
    } catch (error) {
      if (props.item._id) {
        alert("Erro ao editar item.");
      } else {
        alert("Erro ao adicionar item.");
      }
    }

    props.setSelectedItem({});
    history.go("item");
  }

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#addUserModalItem"
        >
          Add
        </button>
      </div>
      <div
        className="modal fade"
        id="addUserModalItem"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Novo Produto
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Nome: </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Descrição: </label>
                  <textarea
                    type="text"
                    name="descricao"
                    required
                    className="form-control rows=3"
                    value={descricao}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Categoria: </label>
                  <input
                    type="text"
                    name="categoria"
                    required
                    className="form-control"
                    value={categoria}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Preço: </label>
                  <input
                    type="text"
                    name="preco"
                    required
                    className="form-control"
                    value={preco}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div>
                  <Upload onUpload={handleUpload} />
                  {<FileList files={uploadedFiles} onDelete={handleDelete} />}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

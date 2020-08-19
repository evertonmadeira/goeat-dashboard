import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalItem from "../Modal/ModalItem";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Navbar from "../Navbar";
import './styles.css';
import formatValue from '../../utils/formatValue'

export default function ItemList(props) {
  const [item, setItem] = useState([]);
  const [setSelectedItem] = useState({});

  function getItem() {
    axios
      .get("http://localhost:5000/product/")
      .then((res) => {
        setItem(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getItem()
  }, []);

  function deleteItem(id) {
    axios.delete("http://localhost:5000/product/delete/" + id).then((res) => {
      console.log(res.data);
    });

    setItem(item.filter((element) => element._id !== id));
  }

  function itemRow(item) {
    return (
      <tr key={item._id}>
        <td>
          <img
            src={"https://mernbucket.s3.amazonaws.com/" + item.img.key}
            alt={item.img.nome}
            width="70px"
            style={{ borderRadius: '5px' }}
          ></img>
        </td>
        <td>{item.nome}</td>
        <td>{item.descricao}</td>
        <td>{item.categoria}</td>
        <td>{formatValue(item.preco)}</td>
        <td>
          <div className="row">
            <div>
              <button
                className="btn btn-warning"
                type="button"
                data-toggle="modal"
                data-target="#addUserModal"
                onClick={() => setSelectedItem(item)}
                style={{ marginRight: 5 }}
              >
                <FaEdit color="black" />
              </button>
            </div>
            <button
              href="!#"
              className="btn btn-danger"
              onClick={() => {
                deleteItem(item._id);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  function itemList() {
    return item.map(itemRow);
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container row">
          <h3 style={{ marginRight: 5 }}>Produtos</h3>
          <ModalItem get={getItem} />
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{itemList()}</tbody>
        </table>
      </div>
    </>
  );
}

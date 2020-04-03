import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalUser from "../Modal/ModalUser";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../Navbar";

export default function UserList(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteUser(id) {
    axios.delete("http://localhost:5000/user/delete/" + id).then((res) => {
      console.log(res.data);
    });

    setUser(user.filter((element) => element._id != id));
  }

  function userRow(user) {
    return (
      <tr key={user._id}>
        <td>{user.nome}</td>
        <td>{user.sobrenome}</td>
        <td>{user.cpf}</td>
        <td>
          <button
            href="#"
            className="btn btn-danger"
            onClick={() => {
              deleteUser(user._id);
            }}
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>
    );
  }

  function userList() {
    return user.map(userRow);
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="container row">
          <h3 style={{ marginRight: 5 }}>Usuários</h3>
          <ModalUser />
        </div>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{userList()}</tbody>
        </table>
      </div>
    </>
  );
}

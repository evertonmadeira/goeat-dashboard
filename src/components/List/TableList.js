import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPrint } from "react-icons/fa";
import ModalTable from "../Modal/ModalTable";
import Navbar from "../Navbar";
import QRCode from "qrcode.react";

export default function TableList() {
  const [table, setTable] = useState([]);
  const [selectedTable, setSelectedTable] = useState({});

  const getData = async () => {
    const res = await axios.get("http://localhost:5000/table/");
    // const data = await getDataImage(res.data);
    //Depois que setei res.data renderizou as mesas
    setTable(res.data[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  const downloadQR = (num) => {
    const canvas = document.getElementById(num);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `mesa${num}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  function deleteTable(id) {
    axios.delete("http://localhost:5000/table/delete/" + id).then((res) => {
      console.log(res.data);
    });

    setTable(table.filter((element) => element._id !== id));
  }

  function tableRow(table) {
    return (
      <tr key={table._id}>
        <td>{table.num}</td>
        <td>{table.estado}</td>
        <td>
          <div className="row">
            {/* <img id={table._id} src={getQrCode} alt="qr" width="50px" /> */}
            <QRCode
              id={table.num}
              value={table._id}
              size={300}
              className='qr-class'
              includeMargin={true}
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={() => downloadQR(table.num)}
              style={{ marginLeft: "5px" }}
            >
              <FaPrint size={20} />
            </button>
          </div>
        </td>
        <td>
          <div className="row">
            <div>
              <button
                className="btn btn-warning"
                type="button"
                data-toggle="modal"
                data-target="#addUserModalTable"
                onClick={() => setSelectedTable(table)}
                style={{ marginRight: 5 }}
              >
                <FaEdit color="black" />
              </button>
            </div>
            <button
              href="!#"
              className="btn btn-danger"
              onClick={() => deleteTable(table._id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </td>
      </tr >
    );
  }

  function tableList() {
    return table.map(tableRow);
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container row">
          <h3 style={{ marginRight: 5 }}>Mesas</h3>
          <ModalTable
            table={selectedTable}
            setSelectedTable={setSelectedTable}
          />
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Número</th>
              <th>Estado</th>
              <th>QR Code</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{tableList()}</tbody>
        </table>
      </div>
    </>
  );
}

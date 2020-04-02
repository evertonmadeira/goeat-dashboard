import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import AddTable from '../../add/add-table';
import { FaEdit } from 'react-icons/fa';
import useQrCode from '../../QRCode';

export default function TableList() {

  const [table, setTable] = useState([]);
  const [selectedTable, setSelectedTable] = useState({});

  const qrCode = useQrCode('http://localhost:5000/table/');

  useEffect(() => {
    axios.get('http://localhost:5000/table/')
      .then(res => {
        setTable(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function deleteTable(id) {
    axios.delete('http://localhost:5000/table/delete/' + id)
      .then(res => { console.log(res.data) });

    setTable(table.filter(element => element._id !== id));

  }

  const downloadQR = (table) => {
    const canvas = document.getElementById(table);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("qr");
    downloadLink.href = pngUrl;
    downloadLink.download = (table.num + ".png");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function tableRow(table) {
    return (
      <tr key={table._id}>
        <td>{table.num}</td>
        <td>{table.estado}</td>
        <td>
          <div className="row">
            <img id={table} src={qrCode + table.qrcode} alt="qr" width='50px'/>
            <button onClick={downloadQR}>Imprimir</button>
          </div>

        </td>
        <td>
          <div className="row">
            <div>
              <button className="btn btn-warning" type="button" data-toggle="modal" data-target="#addUserModal" onClick={() => setSelectedTable(table)} style={{ marginRight: 5 }}>
                <FaEdit color="black" />
              </button>
            </div>
            <button href="!#" className="btn btn-danger" onClick={() => deleteTable(table._id)}>
              <FaTrashAlt />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  function tableList() {
    return table.map(tableRow)
  }

  return (
    <>
      <div>
        <div className="container row">
          <h3 style={{ marginRight: 5 }}>Produtos</h3>
          <AddTable table={selectedTable} setSelectedTable={setSelectedTable} />
        </div>
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
            {tableList()}
          </tbody>
        </table>
      </div>
    </>
  )
}


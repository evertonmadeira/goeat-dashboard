import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ModalTable(props) {
  const history = useHistory();

  useEffect(() => {
    if (props.table) console.log(props.table);
  }, [props.table]);

  async function onSubmit(e) {
    e.preventDefault();

    const table = {
      num: e.target.elements["num"].value,
      estado: e.target.elements["estado"].value,
    };

    try {
      if (props.table.num) {
        await axios.post(
          "http://localhost:5000/table/update/" + props.table._id,
          table
        );
      } else {
        await axios.post("http://localhost:5000/table/add", table);
      }

      history.go("/table");
    } catch (error) {
      if (props.table.num) {
        alert("Erro ao editar mesa");
      } else alert("Erro ao adicionar mesa");
    }

    props.setSelectedTable({});
    history.go('/table');
  }

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#addUserModalTable"
        >
          Add
        </button>
      </div>
      <div
        className="modal fade"
        id="addUserModalTable"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={onSubmit}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addUserModalLabel">
                  {props.table.num ? "Editar Mesa" : "Nova Mesa"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.setSelectedTable({})}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nº: </label>
                  <input
                    type="text"
                    name="num"
                    defaultValue={props.table.num ? props.table.num : ""}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Status: </label>
                  <select name="estado" className="custom-select">
                    <option value="">Selecione um estado</option>
                    <option
                      value="Livre"
                      selected={
                        props.table && props.table.estado === "Livre"
                          ? true
                          : false
                      }
                    >
                      Livre
                    </option>
                    <option
                      value="Ocupada"
                      selected={
                        props.table && props.table.estado === "Ocupada"
                          ? true
                          : false
                      }
                    >
                      Ocupada
                    </option>
                  </select>
                </div>
                {/* <div className="form-group">
                  <label>QR Code: </label>
                  <input
                    type="text"
                    name="qrcode"
                    defaultValue={props.table.qrcode ? props.table.qrcode : ""}
                    className="form-control"
                  />
                </div> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => props.setSelectedTable({})}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {props.table.num ? "Editar" : "Adicionar"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

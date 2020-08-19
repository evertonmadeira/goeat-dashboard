import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FiUsers } from "react-icons/fi";
import { GiHotMeal, GiTable } from "react-icons/gi";
import { Container, Content, Card } from './styles'
import axios from 'axios';

const Principal = () => {
  const [userCount, setUserCount] = useState([]);
  const [foodCount, setFoodCount] = useState([]);
  const [tableCount, setTableCount] = useState([]);
  const name = localStorage.getItem("adminName");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/")
      .then((res) => {
        setUserCount(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/")
      .then((res) => {
        setFoodCount(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/table/")
      .then((res) => {
        setTableCount(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h2 style={{ marginLeft: 40 }}>Bem vindo, {capitalizeFirstLetter(name)}!</h2>
      <Container>
        <Content>
          <Card customer>
            <div>
              <FiUsers size={48} />
              <strong>
                {userCount}
              </strong>
              <strong>
                Clientes
              </strong>
            </div>
          </Card>
          <Card food>
            <div>
              <GiHotMeal size={48} />
              <strong>
                {foodCount}
              </strong>
              <strong>
                Refeições
              </strong>
            </div>
          </Card>
          <Card table>
            <div>
              <GiTable size={48} />
              <strong>
                {tableCount}
              </strong>
              <strong>
                Mesas
              </strong>
            </div>
          </Card>
        </Content>
      </Container>
      {/* <div className="container">
        <div className=" content-section introduction" style={{}}>
          <div className="feature-intro">
            <h1>Página Principal</h1>
            <p>Bem vindo {admin}!</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Principal;
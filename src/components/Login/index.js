import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Section, Form, Input, Button } from "./styles";
import { FaSignInAlt } from "react-icons/fa";
import logoImg from "../../assets/dashboard.png";
import restImg from "../../assets/restaurant.jpg";
import axios from "axios";

export default function Login() {
  const history = useHistory();

  async function handleLogin(e) {
    const admin = {
      adminEmail: e.target.elements["adminEmail"].value,
      password: e.target.elements["password"].value,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/authenticate",
        { admin }
      );
      
      localStorage.setItem("adminEmail", admin.adminEmail);
      localStorage.setItem("adminName", admin.name);
      history.push('/')
    } catch (error) {
      alert("Falha no login, tente novamente.");
    }
  }
  return (
    <Container>
      <Section>
        <img src={logoImg} alt="dashboard" width="200px" />
        <Form onSubmit={handleLogin}>
          <h4 style={{ marginBottom: "27px", size: "32px", margin: "5px" }}>
            Faça seu login
          </h4>
          <Input placeholder="Usuário" name="adminEmail" />
          <Input type="password" placeholder="Senha" name="password" />
          <Button type="submit">Entrar</Button>
        </Form>
        <Link
          to="/register"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
            margin: "5px",
            color: "#41414d",
            fontSize: "18px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <FaSignInAlt style={{ marginRight: "8px" }} />
          Não tenho cadastro
        </Link>
      </Section>
      {/* <img src={restImg} alt="restaurant" width='400px' /> */}
    </Container>
  );
}

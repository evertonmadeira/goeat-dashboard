import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaRProject } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/dashboard.png";
import { Button, Container, Form, Input, Section } from "./styles";

export default function Login(props) {
  const [name] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const admin = {
      name,
      adminEmail,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/authenticate",
        admin
      );
      localStorage.setItem("adminEmail", response.data.admin.adminEmail);
      localStorage.setItem("adminName", response.data.admin.name);

      if (response.status === 200) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
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
          <Input
            placeholder="Usuário"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

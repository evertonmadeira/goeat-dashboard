import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Content, Section, Form, Button, Input } from "./styles";
import logoImg from "../../assets/GoEats..svg";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const admin = {
      name,
      adminEmail,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/register",
        admin
      );

      console.log(response.data.admin);
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar usuário");
    }
  }
  return (
    <Container>
      <Content>
        <Section>
          <img src={logoImg} alt="logo" />
          <h1 style={{ margin: "64px 0 32px", fontSize: "32px" }}>
            Faça seu cadastro
          </h1>
          <p>Cadastre-se na plataforma para gerir a aplicação.</p>
          <Link
            to="/"
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
            <FaArrowLeft style={{ marginRight: "8px" }} />
            Já tenho cadastro
          </Link>
        </Section>
        <Form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
}

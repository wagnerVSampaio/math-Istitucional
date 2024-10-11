"use client"
import React, {useState} from "react";
import { Form, Input } from "antd/lib";
import Link from "next/link";
import Image from "next/image";
import {
  ButtonLogin,
  ButtonWithEmail,
  ParagraphPassword,
  StyledInput,
} from "./style";
import { ConfigProvider } from "antd/lib";
import "../app/globals.css";
import HeaderOverall from "../components/header-overall";

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

const App: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  {/*FUNÇÃO DE LOGIN*/}
  const Login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email e senha são obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      {/*FAZENDO REQUISIÇÃO A API */}
      const response = await fetch('https://sua-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(email);
      } else {
        setErrorMessage(data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com a API.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <HeaderOverall />
      <ConfigProvider theme={{ token: { colorPrimary: "#006b3f" } }}>
        <section className="flex flex-col md:flex-row justify-center items-center md:mt-10 mx-4 md:mx-auto max-w-7xl">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            className="md:mr-8"
            onFinish={Login}
          >
            <p className="text-green-900 font-bold text-[20px] mb-4">
              FAÇA LOGIN AGORA MESMO!
            </p>
            <p>E-mail</p>
            <Form.Item<LoginProps>
              rules={[{ required: true, message: "Insira seu e-mail!" }]}
            >
              <StyledInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Item>

            <p>Senha</p>
            <Form.Item<LoginProps>
              rules={[{ required: true, message: "Insira sua senha!" }]}
              className="mb-0"
            >
              <StyledInput.Password
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{width: "270px", border: "1px solid #228B22", padding: "6px"}}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 1, span: 16 }}
              className="text-customDark"
            >
              <Link href={"../password-reset"}>
                <ParagraphPassword className="text-xs">
                  Esqueceu a senha?
                </ParagraphPassword>
              </Link>
            </Form.Item>

            <Form.Item className="mb-0">
              <ButtonLogin  type="submit">ENTRAR</ButtonLogin>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 11 }}>
              <p className="text-customDark text-xs mt-6">
                Ao clicar em Continuar para se cadastrar ou entrar, você aceita
                os <strong>Termos de Uso</strong> e{" "}
                <strong>Política de Privacidade</strong> da Match Institucional.
              </p>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <p className="text-customDark">———————— ou —————————</p>
            </Form.Item>

            <Form.Item>
              <Link href={"../register"}>
                <ButtonWithEmail>CADASTRE-SE</ButtonWithEmail>
              </Link>
            </Form.Item>
          </Form>
          <div className="mt-6 md:mt-0">
            <Image
              src={"/page-login-img.png"}
              alt={"Login"}
              width={450}
              height={400}
              style={{  width: "400px", height: "400px",marginLeft: "auto" }}
            />
          </div>
        </section>
      </ConfigProvider>
    </>
  );
};

export default App;

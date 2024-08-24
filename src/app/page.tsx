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
import { useRouter } from 'next/navigation';
import HeaderOverall from "../components/header-overall";

interface User {
  id: number;
  email: string;
  password: string;
};

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  //Metodo de autenticação de login
  const loginAuthentication = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/usersData.json");

      const usersData = await response.json();

      const user = usersData.find((user: User) => user.email === email && user.password === password);

      if (user) {
        router.push(`/inside`);
        console.log(user.id)
      } else {
        setError("E-mail ou senha inválido");
      }
    } catch (error: any) {
      setError("Erro ao fazer login");
      console.error("Erro ao fazer login:", error);
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
          >
            <p className="text-green-900 font-bold text-[20px] mb-4">
              FAÇA LOGIN AGORA MESMO!
            </p>
            <p>E-mail</p>
            <Form.Item<User>
              name="email"
              rules={[{ required: true, message: "Insira seu e-mail!" }]}
            >
              <StyledInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <p>Senha</p>
            <Form.Item<User>
              name="password"
              rules={[{ required: true, message: "Insira sua senha!" }]}
              className="mb-0"
            >
              <StyledInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <ButtonLogin onClick={loginAuthentication} type="submit">ENTRAR</ButtonLogin>
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

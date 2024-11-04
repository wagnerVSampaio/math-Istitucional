"use client";
import React, { useState } from "react";
import { Form, message, Spin } from "antd/lib";
import Link from "next/link";
import Image from "next/image";
import {
  ButtonLogin,
  ButtonWithEmail,
  ParagraphPassword,
  Section,
  StyledInput,
  StyledInputSenha
} from "./style";
import { ConfigProvider } from "antd/lib";
import "../app/globals.css";
import { useRouter } from 'next/navigation';
import HeaderOverall from "../components/header-overall";

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loginAuthentication = async (values: { email: string; password: string; }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro na autenticação");
      }

      // Recebe o JWT e os dados do usuário
      const { token, user } = await response.json();

      if (response.ok) {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userData", JSON.stringify(user));

        setUserData(user); // Atualiza o estado com os dados do usuário

        if (user.user_type === 'recruiter' && user.status === 'approved') {
          router.push("/inside-recruiter");
        } else if (user.user_type === 'server') {
          router.push("/inside");
        } else if (user.user_type === 'recruiter' && user.status === 'pending') {
          message.info('Aguarde a aprovação', 5);
        } else if (user.user_type === 'adm') {
          router.push("/adm-inside");
        }
      }
    } catch (error: any) {
      message.error(error.message || "Erro ao fazer login");
      setLoading(false);
    }
  };

  const onFinish = (values: { email: string; password: string; }) => {
    loginAuthentication(values);
  };
  return (
    <>
      <HeaderOverall />
      <ConfigProvider theme={{ token: { colorPrimary: "#006b3f" } }}>
        <Section>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '600px' }}
            initialValues={{ remember: true }}
            autoComplete="off"
            className="md:mr-8"
            onFinish={onFinish}
          >
            <p className="text-green-900 font-bold text-[20px] mb-4">
              FAÇA LOGIN AGORA MESMO!
            </p>
            <p>E-mail</p>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Insira seu e-mail!" }]}
            >
              <StyledInput
                value={email}
                placeholder="Insira seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <p>Senha</p>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Insira sua senha!" }]}
              className="mb-0"
            >
              <StyledInputSenha
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha"
                aria-label="Senha"
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

            <ConfigProvider theme={{
              token: {
                colorPrimary: "#ffff",
              },
            }}>
              <Form.Item className="mb-0">
                <ButtonLogin type="submit" disabled={loading}>
                  {loading ? <Spin size="small"/> : "ENTRAR"}
                </ButtonLogin>
              </Form.Item>
            </ConfigProvider>

            {error && <p className="text-red-500">{error}</p>}

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
              src={"/atual-login.png"}
              alt={"Login"}
              width={450}
              height={400}
              style={{ width: "500px", height: "450px", marginLeft: "auto" }}
            />
          </div>
        </Section>
      </ConfigProvider>
    </>
  );
};

export default App;

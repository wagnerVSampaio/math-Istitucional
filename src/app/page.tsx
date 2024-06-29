"use client"
import React from "react";
import { Form } from "antd";
import Link from "next/link";
import Image from "next/image";
import NavLogin from "../components/navbar-login";
import {
  StyledInput,
  ButtonLogin,
  ButtonWithEmail,
  ParagraphPassword
} from "./style";

type FieldType = {
  username?: string;
  password?: string;
};

const App: React.FC = () => (
  <>
    <NavLogin />
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
        <p className="text-green-900 font-bold text-2xl mb-4">FAÇA LOGIN AGORA MESMO!</p>
        <p>E-mail</p>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Insira seu e-mail!" }]}
        >
          <StyledInput />
        </Form.Item>

        <p>Senha</p>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Insira sua senha!" }]}
          className="mb-0"
        >
          <StyledInput />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 1, span: 16 }}
          className="text-customDark"
        >
          <Link href={"../cadastro"}>
            <ParagraphPassword className="text-xs">Esqueceu a senha?</ParagraphPassword>
          </Link>
        </Form.Item>

        <Form.Item className="mb-0">
          <ButtonLogin>
            <Link href={"../cadastro"}>ENTRAR</Link>
          </ButtonLogin>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 1, span: 30 }}>
          <p className="text-customDark text-xs">Você ainda não tem uma conta?<Link href={"../cadastro"}> <ParagraphPassword className="flex">Sign Up</ParagraphPassword></Link>
          </p>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 11 }}>
          <p className="text-customDark text-xs">Ao clicar em Continuar para se cadastrar ou entrar, você aceita os <strong>Termos de Uso</strong> e <strong>Política de Privacidade</strong> da Match Institucional.</p>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
          <p className="text-customDark">———————— ou ————————</p>
        </Form.Item>

        <Form.Item>
          <ButtonWithEmail>
            <Link href={"../teste"}>Continue com o Google</Link>
          </ButtonWithEmail>
        </Form.Item>
      </Form>
      <div className="mt-6 md:mt-0">
        <Image
          src={"/login-img.png"}
          alt={"Login"}
          width={500}
          height={450}
          style={{ width: "500px", height: "450px", marginLeft: "auto" }}
        />
      </div>
    </section>
  </>
);

export default App;

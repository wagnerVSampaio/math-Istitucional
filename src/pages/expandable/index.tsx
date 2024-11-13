import React, { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Form, Input } from "antd/lib";
import FooterExpandable from "@/components/footer-expandable";
import HeaderOverall from "@/components/header-overall";
import * as style from "./style";

// Definindo o tipo de dados do usuário
type FieldType = {
  nome?: string;
  email?: string;
  telefone?: string;
  password?: string;
};

const CadastroExpansivel: React.FC = () => {
  // Definindo o estado para os dados do usuário
  const [userData, setUserData] = useState<FieldType>({
    nome: "",
    email: "",
    telefone: "",
    password: "",
  });

  const [expandidoDados, setExpandido] = useState<boolean>(false);

  const alternarExpansaoDados = (): void => {
    setExpandido(!expandidoDados);
  };

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log('Dados do usuário:', parsedData);
      setUserData(parsedData);
      //setIdUser(parsedData.id_user);
    }
  }, []);

  // Função para atualizar os dados do usuário ao editar os campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FieldType) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  return (
    <>
      <HeaderOverall />
      <div className="flex justify-center items-center flex-col">
        <div>
          <form>
            <h1 className="text-green-900 font-bold text-[20px] mb-[60px] mt-[15px] mr-[140px] ml-[140px]">
              Preencha os blocos com seus dados e mantenha seus dados atualizados para se candidatar a vagas.
              Caso realize alterações, estes ajustes serão replicados para todas as suas candidaturas ativas.
            </h1>
          </form>
        </div>
        <div className="mt-[20px] ">
          <form>
            <div style={{ color: "black" }}>
              <style.DivPersonalData onClick={alternarExpansaoDados}>
                <span
                  style={{
                    fontSize: "18px",
                    flex: 1,
                    fontWeight: "600",
                    color: "#272727",
                  }}
                >
                  Dados pessoais
                </span>
                <span style={{ padding: "30px" }}>
                  {expandidoDados ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </style.DivPersonalData>
              {expandidoDados && (
                <div
                  style={{
                    marginTop: "10px",
                    textAlign: "left",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div className="flex">
                    <div className="mr-[50px]">
                      <p className="mb-[3px]">
                        E-mail <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType> name="email">
                        <Input
                          className="w-[350px]"
                          value={userData.email}
                          onChange={(e) => handleChange(e, "email")}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <p className="mb-[3px]">
                        Telefone <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType> name="telefone">
                        <Input
                          className="w-[350px] bg-white"
                          value={userData.telefone}
                          onChange={(e) => handleChange(e, "telefone")}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-[50px]">
                      <p className="mb-[3px]">
                        Senha <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType>
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Por favor, insira a senha!",
                          },
                        ]}
                      >
                        <Input.Password
                          className="w-[350px]"
                          value={userData.password}
                          onChange={(e) => handleChange(e, "password")}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <p className="mb-[3px]">
                        Confirmação de senha{" "}
                        <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType>
                        //name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: "Por favor, insira a confirmação da senha!",
                          },
                        ]}
                      >
                        <Input.Password
                          className="w-[350px] bg-white"
                          value={userData.password}
                          onChange={(e) => handleChange(e, "password")}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <FooterExpandable />
    </>
  );
};

export default CadastroExpansivel;

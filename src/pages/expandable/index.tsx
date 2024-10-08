import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Form, Input } from "antd/lib";
import { AddButton } from "./style";
import FooterExpandable from "@/components/footer-expandable";
import HeaderOverall from "@/components/header-overall";

type FieldType = {
  nome?: string;
  email?: string;
  password?: string;
};

const CadastroExpansivel: React.FC = () => {
  const [expandidoDados, setExpandido] = useState<boolean>(false);

  const alternarExpansaoDados = (): void => {
    setExpandido(!expandidoDados);
  };

  const [expandidoHabilidades, setExpandidoHabilidades] =
    useState<boolean>(false);

  const alternarExpansaoHabilidades = (): void => {
    setExpandidoHabilidades(!expandidoHabilidades);
  };

  const [expandidoFormacao, setExpandidoFormacao] = useState<boolean>(false);

  const alternarExpansaoFormacao = (): void => {
    setExpandidoFormacao(!expandidoFormacao);
  };

  return (
    <>
    <HeaderOverall/>
      <div className="flex justify-center items-center flex-col">
        <div>
          <form>
            <h1 className="text-green-900 font-bold text-[20px] mb-[60px] mt-[15px] mr-[140px] ml-[140px]">
              Preencha os blocos com seus dados e mantenha seus dados
              atualizados para se candidatar as vagas. Caso realize alterações,
              estes ajustes serão replicados para todas as suas candidaturas
              ativas.
            </h1>
          </form>
        </div>
        <div className="mt-[20px] ">
          <form>
            <div style={{ color: "black" }}>
              <div
                onClick={alternarExpansaoDados}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "800px",
                  height: "80px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "30px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    flex: 1,
                    fontWeight: "600",
                    color: "#272727",
                  }}
                >
                  Dados pessoais{" "}
                </span>
                <span style={{ padding: "30px" }}>
                  {expandidoDados ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </div>
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
                        <Input className="w-[350px]" />
                      </Form.Item>
                    </div>
                    <div>
                      <p className="mb-[3px]">
                        Telefone <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType> name="email">
                        <Input className="w-[350px] bg-white" />
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
                        <Input.Password className="w-[350px]" />
                      </Form.Item>
                    </div>
                    <div>
                      <p className="mb-[3px]">
                        Confirmação de senha{" "}
                        <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType>
                        name="password"
                        rules={[
                          {
                            required: true,
                            message:
                              "Por favor, insira a confirmação da senha!",
                          },
                        ]}
                      >
                        <Input.Password className="w-[350px] bg-white" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        
        {/*
        <div className="mt-[20px]">
          <form>
            <div style={{ color: "black" }}>
              <div
                onClick={alternarExpansaoHabilidades}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "800px",
                  height: "80px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "30px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    flex: 1,
                    fontWeight: "600",
                    color: "#272727",
                  }}
                >
                  Habilidades{" "}
                </span>
                <span style={{ padding: "30px" }}>
                  {expandidoHabilidades ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </div>
              {expandidoHabilidades && (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "left",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <p className="mb-[3px] text-[15px] text-green-900 font-bold">
                    Você tem a opção de adicionar até 30 habilidades,
                    conhecimentos técnicos e ferramentas que domina.
                  </p>
                  <div className="flex mt-[20px]">
                    <Form.Item<FieldType>
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira o nome!",
                        },
                      ]}
                    >
                      <Input className="w-[350px]" />
                    </Form.Item>
                    <div>
                      <AddButton>ADICIONAR</AddButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div> */}


        {/*<div className="mt-[20px]">
          <form>
            <div style={{ color: "black" }}>
              <div
                onClick={alternarExpansaoFormacao}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "800px",
                  height: "80px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  padding: "30px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    flex: 1,
                    fontWeight: "600",
                    color: "#272727",
                  }}
                >
                  Formação{" "}
                </span>
                <span style={{ padding: "30px" }}>
                  {expandidoFormacao ? <SlArrowUp /> : <SlArrowDown />}
                </span>
              </div>
              {expandidoFormacao && (
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
                        Campus <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType> name="email">
                        <Input className="w-[350px]" />
                      </Form.Item>
                    </div>
                    <div>
                      <p className="mb-[3px]">
                        Graduação <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType> name="email">
                        <Input className="w-[350px] bg-white" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div> */}
      </div>
      <FooterExpandable />
    </>
  );
};

export default CadastroExpansivel;

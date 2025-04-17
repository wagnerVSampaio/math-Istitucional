import React, { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { Form, Input, Button, message } from "antd/lib";
import FooterExpandable from "@/components/footer-expandable";
import HeaderOverall from "@/components/header-overall";
import * as style from "./style";

type FieldType = {
  name?: string;
  email?: string;
  telefone?: string;
  password?: string;
  phone?: string;
};

const CadastroExpansivel: React.FC = () => {
  const [userData, setUserData] = useState<FieldType>({
    name: "",
    email: "",
    telefone: "",
    password: "",
    phone: ""
  });

  const [idUser, setIdUser] = useState<number | null>(null);
  const [expandidoDados, setExpandido] = useState<boolean>(false);

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    console.log(data)
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData({
        name: parsedData.full_name || "",
        email: parsedData.email || "",
        telefone: parsedData.telefone || "",
        password: parsedData.password || "",
        phone: parsedData.phone || "",
      });
      setIdUser(parsedData.id_user);
    }
  }, []);

  const alternarExpansaoDados = (): void => {
    setExpandido(!expandidoDados);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FieldType) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  const salvarDados = async () => {
    if (!idUser) {
      message.error("ID do usuário não encontrado.");
      return;
    }

    const payload = {
      full_name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone
    };

    try {
      const response = await fetch(`http://localhost:3002/api/updateUser/${idUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados.");
      }

      const data = await response.json();
      message.success("Dados atualizados com sucesso!");
      console.log(data)
      const updatedUser = {
        id_user: idUser,
        full_name: payload.full_name,
        email: payload.email,
        phone: userData.phone,
        password: payload.password,
      };
      sessionStorage.setItem("userData", JSON.stringify(updatedUser));
      console.log(updatedUser)
    } catch (error) {
      console.error("Erro:", error);
      message.error("Erro ao atualizar os dados. Tente novamente.");
    }
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

        <div className="mt-[20px]">
          <form>
            <div style={{ color: "black" }}>
              <style.DivPersonalData onClick={alternarExpansaoDados}>
                <span style={{ fontSize: "18px", flex: 1, fontWeight: "600", color: "#272727" }}>
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
                      <p className="mb-[3px]">Nome <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="name">
                        <Input
                          className="w-[350px]"
                          value={userData.name}
                          onChange={(e) => handleChange(e, "name")}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <p className="mb-[3px]">Telefone <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="phone">
                        <Input
                          className="w-[350px] bg-white"
                          value={userData.phone}
                          onChange={(e) => handleChange(e, "phone")}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-[50px]">
                      <p className="mb-[3px]">E-mail <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="email">
                        <Input
                          className="w-[350px] bg-white"
                          value={userData.email}
                          onChange={(e) => handleChange(e, "email")}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <p className="mb-[3px]">Senha <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="password">
                        <Input.Password
                          className="w-[350px] bg-white"
                          value={userData.password}
                          onChange={(e) => handleChange(e, "password")}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button type="primary" onClick={salvarDados}>
                      Salvar Alterações
                    </Button>
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

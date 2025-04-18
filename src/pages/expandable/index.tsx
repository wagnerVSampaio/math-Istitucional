import React, { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp, SlArrowLeftCircle } from "react-icons/sl";
import { Form, Input, Button, message } from "antd/lib";
import HeaderOverall from "@/components/header-overall";
import * as style from "./style";
import Link from "next/link";

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
    console.log(data);
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

  const saveDados = async () => {
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

      const updatedUser = {
        id_user: idUser,
        full_name: payload.full_name,
        email: payload.email,
        phone: userData.phone,
        password: payload.password,
      };
      sessionStorage.setItem("userData", JSON.stringify(updatedUser));
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
          <form className="flex mt-[15px]">
          <div className="ml-[2%] ">
                <Link href={"/inside"}><style.buttonReturn
                >
                  <SlArrowLeftCircle />
                </style.buttonReturn></Link>
                </div>
            <h1 className="text-green-900 font-bold text-[20px] mb-[60px] mr-[140px] ml-[140px]">
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
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <p className="mr-[7px]">Nome <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="name">
                        <Input
                          className="w-[350px]"
                          value={userData.name}
                          onChange={(e) => handleChange(e, "name")}
                        />
                      </Form.Item>
                    </div>
                    
                    <div>
                      <p className="mr-[7px]">E-mail <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="email">
                        <Input
                          className="w-[350px] bg-white"
                          value={userData.email}
                          onChange={(e) => handleChange(e, "email")}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <p className="mr-[7px]">Senha <strong className="text-red-500">*</strong></p>
                      <Form.Item<FieldType> name="password">
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

            <style.DivFooter>
              <h1 className='text-customDark font-bold p-[20px] text-[18px]'>
                Após clicar em Salvar, suas informações serão atualizadas
              </h1>
              <div className='pt-3 flex gap-4'>
                <style.FooterButton onClick={saveDados}>SALVAR</style.FooterButton>
              </div>
            </style.DivFooter>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastroExpansivel;

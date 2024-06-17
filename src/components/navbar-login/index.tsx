"use client"
import React from "react";
import { ButtonCreate } from "./style";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

const NavLogin = () => {
  return (
    <nav className="flex justify-between mx-4 my-4 text-blue-900">
      <p className="font-extrabold">Match Institucional</p>
      <section className="flex justify-between mx-4 my-4 text-blue-900">
        <div>
          <FloatButton
            icon={<QuestionCircleOutlined />}
            type="primary"
            style={{position: "fixed", top: 10, right: 180}}
          />
            
        </div>
        <div>
        <ButtonCreate>Cadastre-se</ButtonCreate>
        </div>
      </section>
    </nav>
  );
};

export default NavLogin;

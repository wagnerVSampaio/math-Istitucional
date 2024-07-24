"use client";
import React from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { ButtonCreate, ButtonCreateAccount } from "./style";
import { ConfigProvider } from "antd/lib";

const NavLogin = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#228B22",
        },
      }}
    >
      <nav className="flex justify-between mx-4 my-4 text-green-900">
        <p className="font-extrabold">Match Institucional</p>
        <section className="flex justify-between mx-4 my-4 text-green-900">
          <div>
            <ButtonCreate>
              <IoMdHelpCircleOutline className=" text-xl" />
            </ButtonCreate>
          </div>
          <div>
          <ButtonCreateAccount>Cadastre-se</ButtonCreateAccount>
        </div>
        </section>
      </nav>
    </ConfigProvider>
  );
};

export default NavLogin;
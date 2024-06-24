"use client";
import React from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { ButtonCreate } from "./style";

const NavLogin = () => {
  return (
    <nav className="flex justify-between mx-4 my-4 text-green-900">
      <p className="font-extrabold">Match Institucional</p>
      <section className="flex justify-between mx-4 my-4 text-green-900">
        <div>
          <ButtonCreate>
            <IoMdHelpCircleOutline className=" text-xl"/>
          </ButtonCreate>
        </div>
      </section>
    </nav>
  );
};

export default NavLogin;

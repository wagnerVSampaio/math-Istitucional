"use client";
import React from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import Link from "next/link";
import { ButtonIcon, ButtonCreateAccount, StyledNav, StyledP } from "./style";


const NavLogin = () => {
  return (
    <StyledNav >
      <StyledP >Match Institucional</StyledP>
      <section className="flex justify-between mx-1 my-1 text-green-900">
        <div>
          <ButtonIcon>
            <IoMdHelpCircleOutline className=" text-xl"/>
          </ButtonIcon>
        </div>
        <div>
        <Link href={"../register"}><ButtonCreateAccount>Cadastre-se</ButtonCreateAccount></Link>
        </div>
      </section>
    </StyledNav>
  );
};

export default NavLogin;

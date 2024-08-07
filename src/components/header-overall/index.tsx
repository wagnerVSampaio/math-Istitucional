"use client";
import React from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { ButtonIcon, StyledNav, StyledP } from "./style";


const HeaderOverall = () => {
  return (
    <StyledNav >
      <StyledP >Match Institucional</StyledP>
      <section className="flex justify-between mx-1 my-1 text-green-900">
        <div>
          <ButtonIcon>
            <IoMdHelpCircleOutline className=" text-xl"/>
          </ButtonIcon>
        </div>
      </section>
    </StyledNav>
  );
};

export default HeaderOverall;

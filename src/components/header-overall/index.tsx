"use client";
import React from "react";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { ButtonIcon, StyledNav, StyledP } from "./style";
import Link from "next/link";

const HeaderOverall = () => {
  return (
    <StyledNav >
      <StyledP >Match Institucional</StyledP>
      <section className="flex justify-between mx-1 my-1 text-green-900">
        <div>
          <Link href={"../helpPages"}><ButtonIcon>
            <IoMdHelpCircleOutline className=" text-xl"/>
          </ButtonIcon></Link>
        </div>
      </section>
    </StyledNav>
  );
};

export default HeaderOverall;

import React from "react";
import { Nav, Section, ButtonStyle } from "./style";
import { QuestionCircleOutlined } from '@ant-design/icons/lib';

const NavLogin = () => {
  return (
    <Nav>
      <p className="font-extrabold">Match Institucional</p>
      <Section>
        <div>
        <ButtonStyle icon={<QuestionCircleOutlined />} />
        </div>
      </Section>
    </Nav>
  );
};

export default NavLogin;

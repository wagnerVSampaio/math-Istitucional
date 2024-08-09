import React, { useState } from "react";
import {
  StyledButton,
  StyledButtonGoBack,
  StyledForm,
  StyledInput,
  StyledPasswordReset,
} from "./style";
import HeaderOverall from "@/components/header-overall";
import Link from "next/link";

type FieldType = {
  email: string;
};
const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <HeaderOverall />
      <StyledPasswordReset>
        <StyledForm>
          <h2 className="text-[35px]">Esqueceu a senha?</h2>
          <p>
            Não se preocupe! Insira seu e-mail abaixo e enviaremos um código
            para você redefinir sua senha.
          </p>
          <div>
            <StyledInput type="text" placeholder="E-mail" />
            <div>
              <Link href={'./'}>
                  <StyledButtonGoBack type="submit">
                    VOLTAR
                  </StyledButtonGoBack>
              </Link>
              <StyledButton type="submit">AVANÇAR</StyledButton>
            </div>
          </div>
        </StyledForm>
      </StyledPasswordReset>
    </>
  );
};
export default PasswordReset;

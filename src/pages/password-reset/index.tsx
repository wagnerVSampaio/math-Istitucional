import React, { useState } from "react";
import {
  StyledButton,
  StyledButtonGoBack,
  StyledForm,
  StyledInput,
  StyledPasswordReset,
  StyledSpan
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
            <p className='mb-[20px]'>Esqueceu o e-mail? <StyledSpan>Recuperar</StyledSpan></p>
              <Link href={'./'}>
                  <StyledButtonGoBack type="submit">
                    VOLTAR
                  </StyledButtonGoBack>
              </Link>
              <Link href={'../code-password-reset'}><StyledButton type="submit">AVANÇAR</StyledButton></Link>
            </div>
          </div>
        </StyledForm>
      </StyledPasswordReset>
    </>
  );
};
export default PasswordReset;

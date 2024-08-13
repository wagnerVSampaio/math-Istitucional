import React, { useState } from "react";
import {
  StyledButton,
  StyledButtonGoBack,
  StyledForm,
  StyledInput,
  StyledPasswordReset,
} from "./style";
import HeaderOverall from "../../components/header-overall";
import Link from "next/link";

type FieldType = {
  password: string;
};
const NewPassword: React.FC = () => {
  return (
    <>
      <HeaderOverall />
      <StyledPasswordReset>
        <StyledForm>
          <h2 className="text-[35px]">Insira sua nova senha</h2>
          <p>
            Falta pouco! Digite sua nova senha abaixo para concluir a
            redefinição.
          </p>
          <div>
            <StyledInput type="text" placeholder="Nova senha" />
            <div className="mb-[20px] flex">
              <p className="text-[13px]">
                Ao clicar em Redefinir para redefinição de senha, você aceita
                os <strong className="text-customGreen">Termos de Uso</strong> e{" "}
                <strong className="text-customGreen">Política de Privacidade</strong> da Match Institucional.
              </p>
            </div>
            <div>
              <Link href={"./code-password-reset"}>
                <StyledButtonGoBack type="submit">VOLTAR</StyledButtonGoBack>
              </Link>
              <Link href={"./"}>
                <StyledButton type="submit">REDEFINIR</StyledButton>
              </Link>
            </div>
          </div>
        </StyledForm>
      </StyledPasswordReset>
    </>
  );
};
export default NewPassword;

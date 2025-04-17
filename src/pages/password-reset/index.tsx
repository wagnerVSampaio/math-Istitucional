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
import { message } from "antd/lib";


const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3002/api/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (response.ok) {
             window.location.href = './code-password-reset';
             sessionStorage.setItem('resetPassword', email);
        } else {
          message.info('E-mail inválido', 5);
        }
    };

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
            <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
            <div>
            {/* <p className='mb-[20px]'>Esqueceu o e-mail? <StyledSpan>Recuperar</StyledSpan></p> */}
              <Link href={'./'}>
                  <StyledButtonGoBack type="submit">
                    VOLTAR
                  </StyledButtonGoBack>
              </Link>
              <StyledButton type="submit" onClick={handleSubmit}>AVANÇAR</StyledButton>
            </div>
          </div>
        </StyledForm>
      </StyledPasswordReset>
    </>
  );
};
export default PasswordReset;

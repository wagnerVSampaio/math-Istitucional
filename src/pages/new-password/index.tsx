import React, { useState, useEffect } from "react";
import {
  StyledButton,
  StyledButtonGoBack,
  StyledForm,
  StyledInput,
  StyledPasswordReset,
} from "./style";
import HeaderOverall from "../../components/header-overall";
import Link from "next/link";
import { message } from "antd/lib";

type FieldType = {
  password: string;
};
const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // Recupera o e-mail do localStorage
        const storedEmail = sessionStorage.getItem('resetPassword');
        setEmail(storedEmail);
    }, []);

    const handleSubmitNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verifica se as senhas coincidem
        if (newPassword !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        const response = await fetch('http://localhost:3002/api/reset/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
        });

        if (response.ok) {
            message.success('Senha redefinida com sucesso!');
            window.location.href = '/';
        } else {
            setErrorMessage('Erro ao redefinir a senha. Tente novamente.');
        }
    };
  return (
    <>
      <HeaderOverall />
      <StyledPasswordReset>
        <StyledForm onSubmit={handleSubmitNewPassword}>
          <h2 className="text-[35px]">Insira sua nova senha</h2>
          <p>
            Falta pouco! Digite sua nova senha abaixo para concluir a
            redefinição.
          </p>
          <div>
            <StyledInput type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}/>
            <StyledInput type="confirmationpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme a Nova Senha"
                        required/>
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
                <StyledButton type="submit">REDEFINIR</StyledButton>
            </div>
          </div>
        </StyledForm>
      </StyledPasswordReset>
    </>
  );
};
export default NewPassword;

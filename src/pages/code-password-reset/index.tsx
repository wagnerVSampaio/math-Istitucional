import React, { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import {
    StyledButton,
    StyledButtonGoBack,
    StyledForm,
    StyledInput,
    StyledPasswordReset,
    StyledSpan
  } from "./style";
import HeaderOverall from "../../components/header-overall"
import Link from "next/link";

const CodePasswordReset: React.FC = () => {
  // Estado para armazenar o código inserido
  const [code, setCode] = useState<string>('');
  
  // Referências para os inputs
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Função para atualizar o valor do código
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newCode = code.split('');
      newCode[index] = value.slice(0, 1); // Atualiza o valor do caractere atual
      setCode(newCode.join('')); // Atualiza o estado com o novo código

      // Move o foco para o próximo input
      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Função para tratar a navegação entre inputs
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <>
    <HeaderOverall />
      <StyledPasswordReset>
        <StyledForm>
          <h2 className="text-[35px]">Insira o código abaixo</h2>
          <p>
          Verifique o código enviado para seu e-mail para prosseguir com a redefinição da senha.
          </p>
          <div>
          {[...Array(6)].map((_, index) => (
            <StyledInput
            key={index}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            type="text"
            value={code[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
          />
          
          ))}
            <div>
                <p className='mb-[20px]'>Não recebeu o código? <StyledSpan>Reenviar</StyledSpan></p>
              <Link href={'../password-reset'}>
                  <StyledButtonGoBack type="submit">
                    VOLTAR
                  </StyledButtonGoBack>
              </Link>
              <Link href={'../new-password'}><StyledButton type="submit">AVANÇAR</StyledButton></Link>
            </div>
          </div>
        </StyledForm>
      </StyledPasswordReset>

    </>
  );
};

export default CodePasswordReset;

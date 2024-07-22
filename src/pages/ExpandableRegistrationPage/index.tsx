import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const CadastroExpansivel: React.FC = () => {
  const [expandido, setExpandido] = useState<boolean>(false);

  const alternarExpansao = (): void => {
    setExpandido(!expandido);
  };

  return (
    <div className="flex items-center flex-col">
    <h1 className="text-green-900 font-bold text-[20px] mb-[60px] mt-[15px] mr-[140px] ml-[140px]">Preencha os blocos com seus dados e mantenha seus dados atualizados para se candidatar as vagas. Caso realize
alterações , estes ajustes serão replicados para todas as suas candidaturas ativas.</h1>
    <div style={{ color: "black" }}>
      <div
        onClick={alternarExpansao}
        style={{
          cursor: 'pointer',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: "center",
          width: "800px",
          height: "80px",
          borderRadius: "10px",
          backgroundColor: "white"
        }}
      >
        <span style={{ fontSize: "18px",flex: 1, textAlign: 'left', fontWeight: "600", color: "#272727"}}>Dados pessoais </span>
        <span style={{flex: 1, textAlign: 'right' }}>{expandido ? <SlArrowUp /> : <SlArrowDown />}</span>
      </div>
      {expandido && (
        <div style={{ marginTop: '10px', textAlign: 'left' }}>
          <h3>Formulário de Cadastro</h3>
          <form>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="senha">Senha:</label>
              <input type="password" id="senha" name="senha" />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default CadastroExpansivel;

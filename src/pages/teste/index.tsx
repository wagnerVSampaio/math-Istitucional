import React from 'react';
import styled from 'styled-components';

export const DivTop = styled.div`
    background-color: white;
    min-height: 100px; /* Altura mínima */
    height: auto; /* Altura adaptável ao conteúdo */
    border-radius: 10px;
    position: relative;
    padding: 16px; /* Espaçamento interno */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para efeito visual */
`;

const App: React.FC = () => {
  return (
    <div>
      <h1>Exemplo de Div Adaptável</h1>
      <DivTop>
        <h2>Título do Componente</h2>
        <p>Este é um parágrafo dentro da DivTop. A altura da div se ajusta ao conteúdo. Este é um parágrafo dentro da DivTop. A altura da div se ajusta ao conteúdo. Este é um parágrafo dentro da DivTop. A altura da div se ajusta ao conteúdo. Este é um parágrafo dentro da DivTop. A altura da div se ajusta ao conteúdo.</p>
        <button style={{ padding: '10px 15px', marginTop: '10px' }}>Clique Aqui</button>
      </DivTop>
    </div>
  );
};

export default App;

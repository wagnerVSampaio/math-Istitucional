import React from 'react';
import styled from "styled-components";
import { Spin } from 'antd/lib';

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Ocupa a altura total da tela */
`;

function Index() {
  return (
    <Loading>
      <Spin size="large" /> {/* Tamanho grande para melhor visibilidade */}
    </Loading>
  );
}

export default Index;

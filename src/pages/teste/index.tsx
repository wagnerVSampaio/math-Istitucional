import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  position: relative;
`;

const HoverContainer = styled.div`
  display: inline-block;
  padding: 10px;
  background-color: lightgray;
  cursor: pointer;
  text-align: center;
`;

const HoverText = styled.div<{ isVisible: boolean }>`
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 10px;
  opacity: ${(props) => (props.isVisible ? 0.6 : 0)};
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
  display: inline-block;
  height: auto; 
`;

const App: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <HoverText isVisible={isHovered}>Texto ao passar o cursor</HoverText>
      <HoverContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Passe o cursor aqui
      </HoverContainer>
    </Container>
  );
};

export default App;

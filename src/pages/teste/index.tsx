import React, { useState } from "react";
import styled from "styled-components";

// Defina as props que o botão vai receber
interface ButtonProps {
  clicked: boolean;
}

// Tipagem correta no styled-component
const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.clicked ? "#008CBA" : "#008CBA")};
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.clicked ? "#005f73" : "#005f73")};
  }
`;

const InteresseButton: React.FC = () => {
  const [inscrito, setInscrito] = useState(false);

  const handleClick = () => {
    setInscrito(true);
  };

  return (
    <>
      {inscrito ? (
        <p>Inscrição enviada</p>
      ) : (
        <Button onClick={handleClick} clicked={inscrito}>
          Tenho interesse
        </Button>
      )}
    </>
  );
};

export default InteresseButton;

// src/components/CPFInput.tsx
import React from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";

const InputEdit = styled.input`
    width: 270px;
    height: 30px;
    border: 1px solid #228B22;
    padding: 6px;
    border-radius: 5px;
`;
    

const CPFInput: React.FC = () => {
  const [cpf, setCpf] = React.useState("");

  return (
    <InputMask
      mask="999.999.999-99" // Máscara de CPF
      value={cpf}
      onChange={(e) => setCpf(e.target.value)}
    >
      {({ onChange, value, ...rest }) => (
        <InputEdit
          {...rest}
          value={value}
          onChange={onChange}
        />
      )}
    </InputMask>
  );
};

export default CPFInput;

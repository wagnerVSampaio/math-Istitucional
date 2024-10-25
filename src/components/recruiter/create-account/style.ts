import styled from "styled-components";
import {Form, Button} from "antd/lib"

export const PStyled = styled.p`
    margin-bottom: 3px;
`
export const DateBirthUpload = styled.div`
  width: 100px; 
  height: 100px; 
  border-radius: 10px;
  overflow: hidden;
  border: 2px dotted #006b3f;
  position: relative;
`;

export const UploadButtonDate = styled.input`
  display: none;
`;

export const ButtonLabelDate = styled.label`
  display: inline-block; 
  cursor: pointer;
`;

export const ButtonCreate = styled(Button)`
  color: #ffff;
  background-color: #006B3F;
  font-weight: bold;
  width: 250px;
`;
export const ButtonExit = styled(Button)`
  color: #006B3F;
  background-color: #ffff;
  font-weight: bold;
  width: 250px;
  margin-right: 40px;
  border: 1px solid #006b3f;
`;

export const InputEdit = styled.input`
  width: 350px;
  height: 32px;
  border: 1px solid #006b3f;
  padding: 6px;
  border-radius: 5px;
  &:focus{
    outline: none;
  }
`;
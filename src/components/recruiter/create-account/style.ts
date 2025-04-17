import styled from "styled-components";
import {Form, Button, Input, Select} from "antd/lib"

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
  @media (min-width: 1024px) {
      width: 115px;
      height: 115px;
            
  }
  @media (min-width: 1440px) {
      width: 135px;
      height: 135px;
            
  }
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


export const InputEdit = styled.input`
  width: 350px;
  height: 32px;
  border: 1px solid #006b3f;
  padding: 6px;
  border-radius: 5px;
  &:focus{
    outline: none;
  }
  @media (min-width: 1024px) {
    width: 300px;
    height: 30px;
  }
  @media (min-width: 1440px) {
    width: 400px;
    height: 35px;
  }
`;
export const ParagraphStyled = styled.p`
  margin-bottom: 3px;
  @media (min-width: 1024px) {
      font-size: 14px;  
      max-width: 500px;
    }
  @media (min-width: 1440px) {
      font-size: 16px;      
    }
`;
export const InputEditForm = styled(Input)`
  width: 350px;
  @media (min-width: 1024px) {
      width: 300px;
      height: 30px;
            
    }
  @media (min-width: 1440px) {
      width: 400px;
      height: 35px;
            
    }
`;
export const InputEditFormPass = styled(Input.Password)`
  width: 250px;
  @media (min-width: 1024px) {
      width: 220px;
      height: 30px;
            
    }
  @media (min-width: 1440px) {
      width: 280px;
      height: 35px;
            
    }
`;
export const ButtonExit = styled(Button)`
  margin-right: 10px;
  color: #006B3F;
  font-weight: bold;
  border: 1px solid #006B3F;

`;
export const ButtonRegister = styled(Button)`
  color: #fff;
  font-weight: bold;
  border: 1px solid #006B3F;
`;

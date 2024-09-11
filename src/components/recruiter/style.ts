import styled from "styled-components";
import {Form} from "antd/lib"

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

export const StyledForm = styled(Form)`
  .ant-form-item {
       margin-bottom: 7px !important;
}
`;
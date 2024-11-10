import styled, {css} from "styled-components";
import { IoMdMail } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

export const DivNotification = styled.div`
    margin: 5px auto;
    width: 70%;
    border-radius: 10px;
    color: #272727;
    margin-top: 60px;
    height: 550px;
    overflow-x: auto;

    @media (min-width: 1280px) {
      width: 90%; /* Ajusta a largura para telas grandes mas não muito grandes */
  }

  @media (max-width: 768px) {
    width: 90%; /* Para tablets e dispositivos médios */
    height: auto; /* Permite que a altura se ajuste ao conteúdo */
    margin-top: 40px; /* Reduz o espaçamento superior */
  }

  @media (max-width: 480px) {
    width: 95%; /* Para dispositivos móveis */
    height: auto; /* A altura se ajusta conforme necessário */
    margin-top: 20px; /* Ainda menor espaçamento superior */
    border-radius: 5px; /* Reduz o raio da borda em telas menores */
  }
`;

export const StyledUl = styled.ul`
  margin: 20px;
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  list-style-type: none;
  box-shadow: 0 4px 8px rgba(0, 107, 63, 0.4);
`;
export const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 120px 1fr 150px 150px 120px;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1200px) {
    padding: 20px 0;
  }

  @media (min-width: 1440px) {
    padding: 40px 0;
  }

`;
export const StyledParagraph = styled.ul`
  font-size: 20px;
  color: #006b3f;
  margin-bottom: 15px;
  font-weight: bold;
`;
export const StyledP = styled.ul`
  display: flex;
`;
const iconsStyle = css`
  margin-right: 15px;
`;


export const ButtonApprove = styled.button`
    padding: 8px 40px;
    border: 1px solid #006B3F;
    background-color: #006B3F;
    color: white;
    border-radius: 10px;
    margin-left: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: .2s;
    &:hover{
        box-shadow:  0 4px 8px rgba(0, 107, 63, 0.3);
    }
`;
export const ButtonRefuse = styled.button`
    padding: 8px 40px;
    border: 1px solid #006B3F;
    border-radius: 10px;
    color: #006B3F;
    font-weight: 700;
    cursor: pointer;
    transition: .2s;
    &:hover{
        box-shadow:  0 4px 8px rgba(0, 107, 63, 0.3);
    }
`;

export const Email = styled( IoMdMail )`
  ${iconsStyle}
`;

export const Degree = styled( PiStudentFill )`
  ${iconsStyle}
`;

export const Address = styled(FaMapMarkerAlt)`
  ${iconsStyle}
`;

export const divNotUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #272727;
`;
export const ParagraphNotUser = styled.p`
  font-weight: 500;
`;
export const Info = styled(FaCircleInfo)`
  ${iconsStyle}
`;
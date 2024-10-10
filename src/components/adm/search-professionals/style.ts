import styled, {css} from "styled-components";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const DivSearch = styled.div`
    margin: 5px auto;
    width: 65%;
    border-radius: 10px;
    margin-top: 60px;
    color: #272727;

    @media (max-width: 1200px) {
    width: 80%; /* Ajusta a largura para telas grandes mas não muito grandes */
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
export const DivTopSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  flex-direction: column;
  margin: 8px auto;
  left: 10px;
  width: 220px;
  height: 33%; 
  z-index: 3; 
  color: #272727;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 107, 63, 0.4);
`;


export const StyleInput = styled.div`
    width: 200px;
`;

export const ButtonAddUser = styled.button`
    margin-top: 20px;
    padding: 4px 20px;
    border: 1px solid #006B3F;
    border-radius: 8px;
    background-color: #ffff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: flex;
    color: #006B3F;
  
  &:hover {
    border-color: #004c2b;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.3);
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const AddUser = styled(BsPersonFillAdd)`
    font-size: 30px;
    color: #005B3F;
    cursor: pointer;
    margin-left: 2px;
`;

export const ButtonRemoveUser = styled.button`
    margin-top: 5px;
    border: 1px solid #006B3F;
    border-radius: 8px;
    background-color: #ffff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: flex;
    padding: 4px 20px;
    color: #006B3F;
  
  &:hover {
    border-color: #004c2b;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.3);
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const RemoveUser = styled(MdPersonRemoveAlt1)`
    font-size: 30px;
    color: #005B3F;
    cursor: pointer;
    margin-left: 6px;
`;

export const DivNotification = styled.div`
    margin: 5px auto;
    color: #272727;
    width: 100%;
    height: 550px;
    overflow-x: auto;
`;

export const StyledUl = styled.ul`
  margin: 10px;
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
  gap: 5px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const Address = styled(FaMapMarkerAlt)`
  ${iconsStyle}
`;
export const Email = styled( IoMdMail )`
  ${iconsStyle}
`;
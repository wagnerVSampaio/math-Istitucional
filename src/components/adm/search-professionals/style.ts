import styled, { css } from "styled-components";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const Total = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivSearch = styled.div`
  width: 100%;
`;

export const DivTopSearch = styled.div`
    margin: 5px auto;
    width: 70%;
    border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #ffff;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.4);
    margin-top: 60px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyleInput = styled.div`
  width: 350px;
  margin-right: 20px;
  margin-left: 10px;
`;

export const ButtonRemoveUser = styled.button`
  border: 1px solid #006b3f;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  padding: 4px 20px;
  color: #006b3f;
  margin-right: 10px;

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
  color: #005b3f;
  cursor: pointer;
  margin-left: 6px;
`;

export const DivNotification = styled.div`
    margin: 5px auto;
    width: 70%;
    border-radius: 10px;
    color: #272727;
    margin-top: 10px;
    height: 450px;
    overflow-x: auto; 
`;

export const StyledUl = styled.ul`
  margin: 10px;
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 107, 63, 0.4);
`;

export const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
`;

export const StyledParagraph = styled.p`
  font-size: 20px;
  color: #006b3f;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const StyledP = styled.p`
  display: flex;
`;

const iconsStyle = css`
  margin-right: 15px;
`;

export const Address = styled(FaMapMarkerAlt)`
  ${iconsStyle}
`;

export const Email = styled(IoMdMail)`
  ${iconsStyle}
`;

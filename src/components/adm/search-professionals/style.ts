import styled, { css } from "styled-components";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";

export const Total = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivSearch = styled.div`
  width: 100%;
`;

export const DivTopSearch = styled.div`
    margin: 5px auto;
    width: 84%;
    //border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #ffff;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.2);
    margin-top: 60px;
    height: 60px;
    display: flex;
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
  padding: 4px;
  color: #006b3f;
  margin-left: 20px;

  &:hover {
    border-color: #004c2b;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.3);
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const RemoveUser = styled(MdPersonRemoveAlt1)`
  font-size: 22px;
  color: #005b3f;
  cursor: pointer;
`;
export const ConfirmRemoveUser = styled(RiDeleteBinLine)`
  font-size: 22px;
  color: #005b3f;
  cursor: pointer;
`;

export const DivNotification = styled.div`
    margin: 5px auto;
    width: 85%;
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
  box-shadow: 0 4px 8px rgba(0, 107, 63, 0.2);
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
  display: flex;
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
export const ViewProfile = styled(MdRemoveRedEye)`
  margin-left: 20px;
  margin-top: 8px;
  font-size: 20px;
`;

import styled, {css} from "styled-components";
import { IoMdMail } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
export const DivNotification = styled.div`
    margin: 25px auto;
    width: 70%;
    border-radius: 10px;
    color: #272727;
    margin-top: 80px;
    height: 500px;
    overflow-x: auto;
`;

export const StyledUl = styled.ul`
  margin: 20px;
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  list-style-type: none;
`;
export const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 120px 1fr 150px 150px 120px;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 40px 0;
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
export const ButtonFavorite = styled.button`
  padding: 8px 30px;
  border: 1px solid #006B3F;
  border-radius: 10px;
  color: #006B3F;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  margin-top: 10px;
`;

const iconsStyle = css`
  margin-right: 15px;
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
export const FavoriteNoSelect = styled(FaRegStar)`
  margin-top: 3px;
  margin-left: 5px;
  font-size: 15px;
  color: #006B3F;
  cursor: pointer;
`;
export const FavoriteSelect = styled(FaStar)`
  margin-top: 3px;
  margin-left: 5px;
  font-size: 15px;
  color: #006B3F;
  cursor: pointer;
`;
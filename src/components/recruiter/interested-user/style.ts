import styled, {css} from "styled-components";
import { IoMdMail } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
export const DivNotification = styled.div`
    margin: 5px auto;
    width: 90%;
    border-radius: 10px;
    color: #272727;
    margin-top: 20px;
    height: 500px;
    overflow-x: auto;
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  list-style-type: none;
  margin: 40px;
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
  font-size: 30px;
  color: #006b3f;
  font-weight: bold;
  margin-bottom: 4px;
`;
export const StyledP = styled.ul`
  display: flex;
  font-size: 18px;
  
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
  margin-top: 5px;
`;


export const Email = styled( IoMdMail )`
  ${iconsStyle}
`;

export const Degree = styled( GrCertificate )`
  ${iconsStyle}
`;

export const Address = styled(AiOutlineSafetyCertificate)`
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
export const StyledImageContainer = styled.div`
width: 100px;   
height: 100px;    
border-radius: 50%;  
overflow: hidden;     
display: flex;        
align-items: center;   
justify-content: center;
margin-left: 30px;
margin-right: 20px;
`;
export const StyledImage = styled.img`
width: 100%;    
height: auto;       
object-fit: cover;     
`;
export const ButtonRemove = styled.button`
  padding: 5px 20px;
  background-color: red;
  color: #ffff;
  border-radius: 5px;
  margin-right: 15px;
  font-weight: 500;
`;
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
width: 100px;           /* Largura do círculo */
height: 100px;          /* Altura do círculo */
border-radius: 50%;     /* Forma circular */
overflow: hidden;       /* Esconde a parte da imagem que sai do círculo */
display: flex;          /* Para centralizar a imagem */
align-items: center;    /* Centraliza verticalmente */
justify-content: center; /* Centraliza horizontalmente */
margin-left: 30px;
margin-right: 20px;
`;
export const StyledImage = styled.img`
width: 100%;            /* Ajusta a largura da imagem ao contêiner */
height: auto;           /* Mantém a proporção da imagem */
object-fit: cover;      /* Cobre o contêiner, cortando as partes que sobram */
`;
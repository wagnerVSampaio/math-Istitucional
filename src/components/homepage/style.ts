import styled from "styled-components";
import { MdOutlineExitToApp } from "react-icons/md";

export const DivTopHomePage = styled.div`
    background-color: white;
    margin: 25px auto;
    width: 70%;
    height: 500px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    margin-top: 65px;
    @media (min-width: 1024px) { 
        height: 500px; 
    }
    @media (min-width: 1440px) {
        height: 700px; 
    }
`;
export const DivMenu = styled.div`
  position: fixed;
  left: 20px;
  width: 150px;
  height: auto; 
  z-index: 3; 
  color: #272727;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
`;
export const StyledParagraph = styled.div`
    margin-top: 50px;
    padding-bottom: 10px;
    font-size: 11px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    color: #006B3F;
    font-weight: bold;
`;
export const ImageHome = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  object-fit: cover;
  z-index: 1;
  @media (min-width: 1280px) { 
    height: auto;
    }
`;
export const DivRadio = styled.div`
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%);
    width: 100px;
    height: 50px;
    z-index: 2;
    color: #272727;
`;
export const ImageWrapper = styled.div`
  position: absolute;
  left: 70px; 
  transform: translateX(-50%); 
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #fff; 
  background-color: #f0f0f0;  
`;
export const ImageCover = styled.div`
  position: relative;
  width: 100%;
  height: 20px; 
  border-radius: 10px 10px 0 0;
`;
export const ButtonStyled = styled.button`
  font-size: 14px;
  margin: 10px;
  display: flex;
`;

export const DivBottom = styled.div`
  border-top: 1px solid #ddd;
`;

export const Exit = styled(MdOutlineExitToApp)`
  font-size: 15px;
  margin-top: 4px;
  margin-left: 4px;
`;

export const LiStyled = styled.li`
  font-size: 12px;
  cursor: pointer;
`;
export const UlStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0 10px 10px;
`;
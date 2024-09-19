import styled from "styled-components";

export const DivTopHomePage = styled.div`
    background-color: white;
    margin: 25px auto;
    width: 70%;
    height: 500px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    margin-top: 65px;
`;
export const DivMenu = styled.div`
  position: fixed;
  left: 20px;
  width: 150px;
  height: 40%; 
  z-index: 3; 
  color: #272727;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
`;
export const StyledParagraph = styled.div`
    margin-top: 50px;
    padding-bottom: 10px;
    font-size: 14px;
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
`;
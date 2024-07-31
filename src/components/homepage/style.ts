import styled from "styled-components";

export const DivTopHomePage = styled.div`
    background-color: white;
    margin: 25px auto;
    width: 70%;
    height: 500px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
`;
export const DivMenu = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 150px;
  height: 90%; 
  z-index: 3; 
`;
export const DivContainer = styled.div`
    margin-left: 15px;
    color: #272727;
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
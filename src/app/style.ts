import styled from "styled-components";
import { Form, Input } from "antd/lib";

export const Section = styled.section`
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    margin-top: 10px;
    margin-left: 1rem;
    margin-right: 1rem; 
    margin: 55px 5%; 

    @media (min-width: 768px) {
        flex-direction: row; 
        margin-top: 10px; 
        margin-left: auto;
        margin-right: auto; 
        margin: 45px 120px; 
    } 
    
    @media (min-width: 1440px) {
       margin-top: 70px;
       margin-left: 300px;
    }
`;


export const StyledInput = styled(Input)`
    width: 100%; 
    max-width: 270px;
    border: 1px solid #228B22;
    padding: 6px;

    @media (min-width: 768px) {
        margin-bottom: 0;
    }
    @media (min-width: 1440px) {
        width: 100%; 
        max-width: 350px;
        border: 1px solid #228B22;
        padding: 6px;
        margin-bottom: 0;
        font-size: 15px;
    }
`;

export const StyledInputSenha = styled(Input.Password)`
    width: 100%;
    max-width: 270px; 
    border: 1px solid #228B22;
    padding: 6px;

    @media (min-width: 768px) {
        margin-bottom: 0; 
    }
    @media (min-width: 1440px) {
        margin-bottom: 0;
        width: 100%;
        max-width: 350px;
        font-size: 15px;
    }
`;

export const ButtonLogin = styled.button`
    color: white;
    font-weight: 800;
    width: 100%; 
    max-width: 270px;
    padding: 6px;
    background-color: #006b3f;
    border-radius: 5px; 

    @media (min-width: 768px) {
        margin-bottom: 0; 
    }
    @media (min-width: 1440px) {
        margin-bottom: 0; 
        width: 100%; 
        max-width: 350px;
        font-size: 16px;
    }
`;

export const ButtonWithEmail = styled.button`
    width: 100%; 
    max-width: 270px; 
    padding: 6px;
    font-size: 14px;
    font-weight: 800;
    background-color: #ffff;
    border: 1px solid #006b3f;
    border-radius: 30px; 
    cursor: pointer;
    transition: 0.2s;
    color: #006b3f;

    &:hover {
        color: white;
        background-color: #006b3f;
    }
    @media (min-width: 1440px) { 
        width: 100%; 
        max-width: 350px;
        font-size: 16px;
    }
`;

export const ParagraphPassword = styled.p`
    color: #272727;
    font-size: 12px;
    &:hover {
        color: green;
    }

    @media (min-width: 1440px) { 
        font-size: 15px;
    }
`;
export const TopParagraph = styled.p`
    color: #006b3f;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 16px;

    @media (min-width: 1440px) { 
        font-size: 25px;
    }
`;
export const ParagraphInfos = styled.p`
    font-size: 14px;

    @media (min-width: 1440px) { 
        font-size: 18px;
    }
`;
export const PararaphBottom = styled.p`
    font-size: 12px;

    @media (min-width: 1440px) { 
        font-size: 14px;
    }
`;
export const PararaphBottom2 = styled.p`
    font-size: 12px;

    @media (min-width: 1280px) { 
        margin-left: 23px
    }
    @media (min-width: 1440px) { 
        font-size: 14px;
        margin-left: 35px
    }
`;


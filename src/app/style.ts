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
    max-width: 1280px;

    @media (min-width: 768px) {
        flex-direction: row; /* Altera para linha em telas maiores */
        margin-top: 10px; /* Margem superior para md */
        margin-left: auto; /* Centraliza horizontalmente */
        margin-right: auto; /* Centraliza horizontalmente */
        margin: 55px 120px; /* Margem maior para telas grandes */
    }
    
    @media (min-width: 1024px) {
       margin-top: 70px;
       margin-left: 250px;
    }
`;


export const StyledInput = styled(Input)`
    width: 100%; /* Largura responsiva */
    max-width: 270px; /* Largura máxima */
    border: 1px solid #228B22;
    padding: 6px;
    margin-bottom: 16px; /* Espaçamento inferior entre os inputs */

    @media (min-width: 768px) {
        margin-bottom: 0; /* Remove margem inferior em telas maiores */
    }
`;

export const StyledInputSenha = styled(Input.Password)`
    width: 100%; /* Largura responsiva */
    max-width: 270px; /* Largura máxima */
    border: 1px solid #228B22;
    padding: 6px;
    margin-bottom: 16px; /* Espaçamento inferior entre os inputs */

    @media (min-width: 768px) {
        margin-bottom: 0; /* Remove margem inferior em telas maiores */
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
    margin-bottom: 16px; 

    @media (min-width: 768px) {
        margin-bottom: 0; 
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
`;

export const ParagraphPassword = styled.p`
    color: #272727;

    &:hover {
        color: green;
    }
`;

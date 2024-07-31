import styled from "styled-components";

export const ButtonCreate=styled.button`
    width: 40px;
    height: 40px;
    background-color: #ffff;
    border: 1px solid #006b3f;
    border-radius: 50%; 
    cursor: pointer;
    transition: .2s;
    color: #0B2A7A;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006b3f;

&:hover {
    color: white;
    background-color: #006b3f;
}
`
export const ButtonCreateAccount=styled.button`
    padding: 8px 25px;
    font-size: 14px;
    font-weight: 800;
    background-color: #ffff;
    border: 1px solid #006b3f;
    border-radius: 30px; 
    cursor: pointer;
    transition: .2s;
    color: #006b3f;
    margin-left: 30px;

&:hover {
    color: white;
    background-color: #006b3f;
}
`
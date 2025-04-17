import styled from "styled-components";

export const StyledPasswordReset = styled.div`
    color: #000;
`;
export const StyledForm = styled.form`
    display: flex;
    position: absolute;
    margin-top: 100px;
    left: 50%;
    transform: translate(-50%);
    flex-direction: column;
    width: 400px;
    gap: 10px;
`;
export const StyledInput = styled.input`
    border: 1px solid #006B3F;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 20px;
    &:focus{
        border: 1px solid #006B3F;
        outline: none;
    }
`;
export const StyledButtonGoBack = styled.button`
    background-color: white;
    color: #006B3F;
    font-weight: bold;
    border: 1px solid #006B3F;
    border-radius: 5px;
    padding: 6px 60px;
    cursor: pointer;
    transition: .2s;
    &:hover{
        border: 1px solid #006B3F;
        box-shadow: 0px 4px 10px rgba(0, 107, 63, 0.5);
    };
`;

export const StyledButton = styled.button`
    background-color: #006B3F;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    padding: 6px 60px;
    margin-left: 18px;
    cursor: pointer;
    transition: .2s;
    border: 1px solid #006B3F;
    &:hover{
        border: 1px solid #006B3F;
        background-color: white;
        color: #006B3F;
    };
`;

export const StyledSpan = styled.span`
    cursor: pointer;
    transition: text-decoration 0.3s ease;

    &:hover {
        text-decoration: underline;
    }
`;
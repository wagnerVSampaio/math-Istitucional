import styled from "styled-components";
import {Input, Form} from "antd/lib"

export const Section=styled.section`
    display: flex;
    margin: 55px 120px 0 180px;

`
export const StyledInput = styled(Input)`
    width: 270px;
    border: 1px solid #228B22;
    padding: 6px;
`;
export const ButtonLogin = styled.button`
    color: white;
    font-weight: 800;
    width: 270px;
    padding: 6px;
    background-color: #006b3f;
    border-radius: 5px;
`;
export const ButtonWithEmail=styled.button`
    width: 270px;
    padding: 6px;
    font-size: 14px;
    font-weight: 800;
    background-color: #ffff;
    border: 1px solid #006b3f;
    border-radius: 30px; 
    cursor: pointer;
    transition: .2s;
    color: #006b3f;

&:hover {
    color: white;
    background-color: #006b3f;
}
`
export const ParagraphPassword = styled.p`
    color: #272727;

    &:hover{
        color: green;
    }
`

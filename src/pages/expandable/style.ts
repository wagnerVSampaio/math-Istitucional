import styled from "styled-components";

export const AddButton = styled.button`
    font-size: 14px;
    font-weight: 800;
    background-color: #006b3f;
    border: 1px solid #006b3f;
    border-radius: 10px; 
    cursor: pointer;
    transition: .2s;
    color: white;
    margin-left: 30px;
    padding: 5px 50px;

    &:hover {
        color: #228B22;
        background-color: #FFFFFF;
}
`
export const DivPersonalData = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    height: 80px;
    border-radius: 10px;
    background-color: aliceblue;
    padding: 30px;
`
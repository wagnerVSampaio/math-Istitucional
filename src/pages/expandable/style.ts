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

export const DivFooter = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 -10px 15px -5px rgba(34, 139, 34, 0.5);
    background: rgb(230, 230, 250)
`;

export const FooterButton = styled.button`
    padding: 8px 50px;
    font-size: 14px;
    font-weight: 800;
    background-color: #006b3f;
    border: 1px solid #006b3f;
    border-radius: 10px; 
    cursor: pointer;
    transition: .2s;
    color: white;
    margin-left: 30px;
    margin-bottom: 10px;
    &:hover {
        color: #006b3f;
        background-color: #FFFFFF;
}
`;

export const buttonReturn = styled.button`
    color: #006b3f;
    font-size: 40px;
    background-color: #ffff;
    padding: 8px;
    border: 1px solid  #006b3f;
    border-radius: 10px;
`;

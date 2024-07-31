import styled from 'styled-components';

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

    &:hover {
        color: #006b3f;
        background-color: #FFFFFF;
}
`;
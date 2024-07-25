import React from 'react';
import styled from 'styled-components';

const DivFooter = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 -10px 15px -5px rgba(34, 139, 34, 0.5);
    background: rgb(230, 230, 250)
`;

const FooterButton = styled.button`
    padding: 8px 50px;
    font-size: 14px;
    font-weight: 800;
    background-color: #228B22;
    border: 1px solid #228B22;
    border-radius: 10px; 
    cursor: pointer;
    transition: .2s;
    color: white;
    margin-left: 30px;

    &:hover {
        color: #228B22;
        background-color: #FFFFFF;
}
`;

const FooterExpandable = () => {
    return (
        <DivFooter>
            <h1 className='text-customDark font-bold p-[20px] text-[18px]'>Após clicar em Salvar, suas informações serão atualizadas</h1>
            <div className='pt-3'><FooterButton>SALVAR</FooterButton></div>
        </DivFooter>
    );
}

export default FooterExpandable;

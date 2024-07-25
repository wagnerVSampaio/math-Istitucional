import styled from "styled-components";

export const DivFooter = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    color: #fff;
    width: 100%;
    height: 40px;
`
export const DivSelect = styled.div`
    position: absolute;
    top: 80px;
    display: flex;
    margin-left: 25%;
`
export const DivVacancies = styled.div`
    gap: 30px; /* Espaço entre os itens */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 130px 220px 0 220px;

`
export const DivVacanciesContainer = styled.div`
    border: 1px solid #228b22;
    border-radius: 10px;
    width: 250px;
    height: 120px;
    box-shadow: 0 5px 5px rgba(42, 42, 238, 0.322);
    text-align: center;
`
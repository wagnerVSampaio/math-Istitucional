import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  top: 0;
  height: 50px;
  color: #065f46; 
  box-shadow: 0 4px 10px rgba(0, 107, 63, 0.5);
`;
export const StyledP = styled.p`
    font-weight: 800;
    margin: 12px 0 0 12px;
`;
export const ButtonIcon = styled.button`
    width: 40px;
    height: 40px;
    background-color: #ffff;
    border: 1px solid #006b3f;
    border-radius: 50%; 
    cursor: pointer;
    transition: .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006b3f;
    margin-right: 20px;

&:hover {
    color: white;
    background-color: #006b3f;
}
`
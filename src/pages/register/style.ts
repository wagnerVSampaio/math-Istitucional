import styled from "styled-components";
import { Radio } from 'antd/lib';

export const Itens = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const DivGeneral = styled.div`
    margin-top: 50px;
    
  @media (min-width: 1024px) {
      margin-top: 80px;
  }
`;

export const H1Styled = styled.h1`
    color: #006b3f;
    font-weight: bold;
    font-size: 27px;
    margin-bottom: 2px;
    margin-top: 5px;

    @media (min-width: 1024px) {
        font-size: 35px;
        margin-bottom: 10px;
        margin-top: 10px;
  }
`;
export const PStyled = styled.p`
    color: #272727;
    font-size: 14px;
    margin-bottom: 2px;
    width: 570px;

    @media (min-width: 1024px) {
        font-size: 20px;
        margin-bottom: 10px;
        width: 700px;
  }
`;

export const StyledNav = styled.nav`

  @media (min-width: 768px) {
    
  }
`;

export const ResponsiveRadioGroup = styled(Radio.Group)`
    display: flex;
    justify-content: center;
    gap: 20px; 

    @media (min-width: 1024px) {
            font-size: 50px;
            
    }
`;
export const LargeRadio = styled(Radio)`
    margin-right: 60px;

    @media (min-width: 1024px) {
        font-size: 50px;
        width: 50px;
        height: 50px;
        font-size: 18px;
        padding: 10px;
        margin-right: 140px;

    }
`;
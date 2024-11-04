import styled from "styled-components";
import { Radio } from 'antd/lib';

export const Itens = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;
export const DivGeneral = styled.div`
  margin-top: 2rem;

@media (min-width: 768px) {
  margin-top: 4rem;
}

@media (min-width: 1024px) {
  margin-top: 5rem;
}

/* Ajuste para telas grandes */
@media (min-width: 1440px) {
  margin-top: 6rem;
}
`;

export const H1Styled = styled.h1`
    color: #006b3f;
    font-weight: bold;
    font-size: 1.4375rem;
    margin-bottom: 0.125rem;
    margin-top: 0.3125rem;

    @media (min-width: 1024px) {
        font-size: 2.1875rem;
        margin-bottom: 0.625rem;
        margin-top: 0.625rem;
  }
`;
export const PStyled = styled.p`
    color: #272727;
    font-size: 0.875rem;
    margin-bottom: 0.125rem;
    width: 35.625rem;

    @media (min-width: 1024px) {
        font-size: 1.25rem;
        margin-bottom: 0.625rem;
        width: 43.75rem;
  }
`;

export const StyledNav = styled.nav`

  @media (min-width: 768px) {
    
  }
`;

export const ResponsiveRadioGroup = styled(Radio.Group)`
    display: flex;
    justify-content: center;
    gap: 1.25rem; 

    @media (min-width: 1024px) {
            font-size: 3.125rem;
            
    }
`;
export const LargeRadio = styled(Radio)`
    margin-right: 3.75rem;

    @media (min-width: 1024px) {
        font-size: 3.125rem;
        width: 3.125rem;
        height: 3.125rem;
        font-size: 1.125rem;
        padding: 0.625rem;
        margin-right: 8.75rem;

    }
`;
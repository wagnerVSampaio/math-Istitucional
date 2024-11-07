// style.ts
import styled from 'styled-components';

export const DivNotification = styled.div`
  display: flex;
`;

export const SideMenu = styled.div`
  width: 200px;
  background-color: #006b3f;
  padding: 5px;
  margin-right: 20px;
  border-radius: 5px;
`;

import { TbSpeakerphone } from "react-icons/tb";
export const DivNotification2 = styled.div`

`;
export const ButtonDelete = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #006B3F;
    font-size: 25px;
    margin-left: auto;

    @media (min-width: 1024px) {
    margin-left: auto;
      margin-right: 10px;
    }

    @media (min-width: 1440px) { 
      margin-left: auto;
      margin-right: 20px
    }
`;
export const StyledUl = styled.ul`
  margin: 20px;
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  color: #272727;
`;

export const StyledLi = styled.li`
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`;

export const H2Name = styled.h2`
  font-size: 20px;
  color: #006B3F;
  font-weight: bold;
  margin-bottom: 8px;
`;
/* export const ButtonDeleteEmail = styled.button`
  padding: 5px 30px;
  margin-left: 20px;
  border: 1.5px solid #006B3F;
  border-radius: 8px;
  color: #006B3F;
  font-weight: 500;
  box-shadow: 0px 4px 6px rgba(0, 107, 63, 0.2);
`; */


export const SpeakerNotice = styled(TbSpeakerphone)`
  color: #ffff;
  font-size: 20px;
  margin-left: 10px;
`;
export const ButtonAdd = styled.div`
    background-color: #006B3F;
    padding: 6px 50px;
    border-radius: 10px;
    position: relative;
    color: white;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
    display: flex;
`; 


export const MyNoticesButton = styled.button`
  background-color: transparent;
  color: #006b3f;
  padding: 6px 50px;
  border: 2px solid #006b3f;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
  margin-left: 15px;

  &:hover {
    background-color: #006b3f;
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(72, 180, 97, 0.5);
  }
`;
import styled from "styled-components";

export const DivNotification = styled.div`
    margin: 25px auto;
    width: 80%;
    border-radius: 10px;
    color: #272727;
    margin-top: 80px;
    height: 500px;
    overflow-x: auto;
`;
export const ButtonDelete = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #006B3F;
    font-size: 25px;
`;
export const StyledUl = styled.ul`
  margin: 20px;
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  list-style-type: none;
`;

export const StyledLi = styled.li`
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;

  .expanded-details {
    margin: 20px;
    font-size: 16px;
    color: #333;
  }

  .delete-button-container {
    position: absolute;
    top: 30px;
    right: 10px;
  }
`;

export const H2Name = styled.h2`
  font-size: 20px;
  color: #006B3F;
  font-weight: bold;
  margin-bottom: 8px;
`;
export const ButtonDeleteEmail = styled.button`
  padding: 5px 30px;
  margin-left: 20px;
  border: 1.5px solid #006B3F;
  border-radius: 8px;
  color: #006B3F;
  font-weight: 500;
  box-shadow: 0px 4px 6px rgba(0, 107, 63, 0.2);
`;

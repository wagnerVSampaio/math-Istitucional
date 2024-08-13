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
    color: black;
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
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
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
    top: 10px;
    right: 10px;
  }
`;


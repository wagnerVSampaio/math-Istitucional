// JobList.styles.ts
import styled from 'styled-components';

export const JobListContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

export const JobContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

export const UserContainer = styled.div`
  border-top: 1px solid #ddd;
  padding: 10px 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  h4 {
    margin: 0;
  }
`;

export const ExportButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

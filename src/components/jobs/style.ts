import styled from "styled-components";
import { Card } from "antd/lib";
import { CalendarOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons/lib";

export const DivFooter = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100%;
  height: 40px;
`;

export const DivSelect = styled.div`
  display: flex;
  margin-left: 25%;
`;

export const DivVacancies = styled.div`
  gap: 10px;
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  margin: 30px auto;
`;

export const DivVacanciesContainer = styled(Card)`
  border: 1px solid #228b22;
  border-radius: 10px;
  width: 250px;
  height: 280px;
  box-shadow: 0 5px 5px rgba(42, 42, 238, 0.322);
  text-align: center;
  padding: 10px; 
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const JobTime = styled.p`
  font-size: 12px;
  color: gray;
  margin: 5px 0;
`;

export const LocationIcon = styled(EnvironmentOutlined)`
  margin-right: 5px;
`;

export const CalendarIcon = styled(CalendarOutlined)`
  margin-right: 5px;
`;

export const UserIcon = styled(UserOutlined)`
  margin-right: 5px;
`;


export const DescriptionWrapper = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; 
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  height: 7.6;
  line-height: 1.5em; 
`;

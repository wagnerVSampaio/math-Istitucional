import styled from "styled-components";
import { Card } from "antd/lib";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
export const DivFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100%;
  height: 40px;
  background-color: #EAE5FF;
`;

export const DivSelect = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const DivVacancies = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  margin-left: 2%;
  @media (max-width: 800px) {
    justify-content: center;
  }

`;

export const DivVacanciesContainer = styled(Card)`
  border: 1px solid #228b22;
  border-radius: 10px;
  width: 300px;
  height: 250px;
  box-shadow: 0 5px 5px rgba(42, 42, 238, 0.322);
  padding: 10px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 5px;
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

export const ContainerLocation = styled.div`
  position: relative;
  margin-left: -30px;
  margin-top: -20px;
  text-align: left;
  font-weight: bold;
  width: 300px;
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
export const Checked = styled(IoCheckmarkCircleSharp)`
  margin-right: 5px;
  font-size: 20px;
`;

export const DescriptionWrapper = styled.p`
text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  height: 7.6;
  line-height: 1.5em;
`;
import styled from "styled-components";
import { Card } from "antd/lib";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import { MdOutlineFavorite } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

export const DivFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100%;
  height: 30px;
  background-color: #EAE5FF;
`;

export const DivSelect = styled.div`
  margin: 3px auto;
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
  height: 260px;
  box-shadow: 0 5px 5px rgba(42, 42, 238, 0.322);
  padding: 10px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  margin: 2px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  margin: 3px;
`;

export const ContainerLocation = styled.div`
  position: relative;
  margin-top: -20px;
  text-align: left;
  width: 300px;
  justify-content: center;
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
  display: flex;
`;
export const DescriptionWrapperExpandable = styled.p`
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  height: 7.6;
  line-height: 1.5em;
  display: flex;
`;

export const DivButtons = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
`;

export const IconFavorite = styled(MdOutlineFavorite)`
  color: white;
  font-size: 30px;
`;

export const ButtonFavorite = styled.p`
  border-radius: 50%;
  background-color: #006B3F;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin: 0;
`;

export const IconClose = styled(VscChromeClose)`
  color: white;
  font-size: 30px;
`;
export const ButtonClose = styled.p`
  border-radius: 50%;
  background-color: red;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin: 0;
`;

export const IconDown = styled(BsChevronDown)`
  color: black;
  font-size: 20px;
`;



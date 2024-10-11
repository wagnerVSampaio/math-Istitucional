import styled, { css } from "styled-components";
import { Radio, Input, Space } from "antd/lib";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoBag, IoNotifications } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { RiAddCircleFill } from "react-icons/ri";

const { Search } = Input;

export const AppContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 5px rgba(42, 42, 238, 0.322);
  background-color: #EAE5FF;
  z-index: 1000;
`;

export const Title = styled.p`
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 40px;
  color: #006b3f;
  font-weight: 800;
  font-size: 15px;
`;

export const SearchContainer = styled(Space)`
`;

export const StyledSearch = styled(Search)`
    margin-top: 5px;
    max-width: 200px;
`;

export const RadioGroup = styled(Radio.Group)`
  margin-left: 100px;
  display: flex;
`;

export const StyledRadioButton = styled(Radio.Button)`
  border: 0;
  height: 40px;
`;


const iconStyle = css`
  font-size: 25px;
  margin-top: 6px;

  @media (max-width: 700px) {
    width: 15px;
  }

  @media (min-width: 701px) and (max-width: 1199px) {
    width: 40px;
  }

  @media (min-width: 1200px) {
    width: 100px;
  }

`;


export const Home = styled(AiFillHome)`
  ${iconStyle}
`;

export const Friends = styled(BsPeopleFill)`
  ${iconStyle}
`;

export const Bag = styled(IoBag)`
  ${iconStyle}
`;

export const Notifications = styled(IoNotifications)`
  ${iconStyle}
`;

export const Chat = styled(MdChat)`
  ${iconStyle}
`;

export const Circle = styled(FaUserCircle)`
  ${iconStyle}
`;

export const Add = styled(RiAddCircleFill)`
  ${iconStyle}
`;

import styled, { css } from "styled-components";
import { Radio, Input, Space } from "antd/lib";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { IoBag, IoNotifications } from "react-icons/io5";
import { MdChat } from "react-icons/md";

const { Search } = Input;

export const AppContainer = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 5px rgba(42, 42, 238, 0.322);
  padding: 10px;
`;

export const Title = styled.p`
  margin-left: 10px;
  margin-right: 40px;
  margin-top: 10px;
  color: #228b22;
  font-weight: 800;
  font-size: 15px;
`;

export const SearchContainer = styled(Space)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledSearch = styled(Search)`
    max-width: 200px;
`;

export const RadioGroup = styled(Radio.Group)`
  margin-top: 5px;
  margin-left: 100px;
  display: flex;
`;

export const StyledRadioButton = styled(Radio.Button)`
  border: 0;
`;


const iconStyle = css`
  font-size: 24px;
  margin-top: 4px;

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

export const Friends = styled(FaUserFriends)`
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

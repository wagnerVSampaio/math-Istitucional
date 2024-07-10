import React, { useState } from "react";
import { Input, Space, Radio, RadioChangeEvent } from "antd/lib";
import type { SearchProps } from "antd/es/input/Search";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { IoBag, IoNotifications } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import HomePage from "@/components/homepage";
import People from "@/components/people";
import Jobs from "@/components/jobs";
import Profile from "@/components/profile";
import Message from "@/components/message";
import Notification from "@/components/notification";
import { DivOverall } from "./style";

const { Search } = Input;

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChangeRadio2 = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div>
      <DivOverall>
        <p
          className="ml-[10px] mr-[40px] text-customGreen font-extrabold"
        >
          Match Institucional
        </p>
        <Space direction="vertical" className="mt-[10px]">
          <Search placeholder="Pesquisar" onSearch={onSearch} enterButton />
        </Space>
        <Radio.Group
          onChange={onChangeRadio2}
          value={value}
          defaultValue="a"
          buttonStyle="solid"
          className="mt-[10px] ml-[100px] flex"
        >
          <Radio.Button value={1} className="border-0">
            <AiFillHome
              className="w-[100px] mt-[4px] text[24px]"
            />
          </Radio.Button>
          <Radio.Button value={2} className="border-0">
            <FaUserFriends
              className="w-[100px] mt-[4px] text-[24px]"
            />
          </Radio.Button>
          <Radio.Button value={3} className="border-0">
            <IoBag
              className="w-[100px] mt-[4px] text-[24px]"
            />
          </Radio.Button>
          <Radio.Button value={4} className="border-0">
            <IoNotifications
              className="w-[100px] mt-[4px] text-[24px]"
            />
          </Radio.Button>
          <Radio.Button value={5} className="border-0">
            <MdChat
              className="w-[100px] mt-[4px] text-[24px]"
            />
          </Radio.Button>
          <Radio.Button value={6} className="border-0">
            <FaUserCircle
              className="w-[100px] mt-[4px] text-[24px]"
            />
          </Radio.Button>
        </Radio.Group>
      </DivOverall>

      {value === 1 ? (
        <HomePage />
      ) : value === 2 ? (
        <People />
      ) : value === 3 ? (
        <Jobs />
      ) : value === 4 ? (
        <Notification />
      ) : value === 5 ? (
        <Message />
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default App;
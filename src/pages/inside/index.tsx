import React, { useState } from "react";
import { Input, Space, Radio } from "antd/lib";
import type { SearchProps } from "antd/es/input/Search";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { IoBag, IoNotifications } from "react-icons/io5";
import { MdChat } from "react-icons/md";
import type { RadioChangeEvent } from "antd/lib";
import HomePage from "@/components/homepage";
import People from "@/components/people";
import Jobs from "@/components/jobs";
import Profile from "@/components/profile";
import Notification from "@/components/notification";
import Message from "@/components/message";

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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 5px 5px rgba(42, 42, 238, 0.322)",
        }}
      >
        <p
          style={{
            marginLeft: "10px",
            marginRight: "40px",
            marginTop: "10px",
            color: "#228b22",
            fontWeight: 800,
            fontSize: "15px"
          }}
        >
          Match Institucional
        </p>
        <Space direction="vertical" style={{ marginTop: "5px", marginBottom: "5px" }}>
          <Search placeholder="Pesquisar" onSearch={onSearch} enterButton />
        </Space>
        <Radio.Group
          onChange={onChangeRadio2}
          value={value}
          defaultValue="a"
          buttonStyle="solid"
          style={{ marginTop: "10px", marginLeft: "100px", display: "flex" }}
        >
          <Radio.Button value={1} style={{ border: 0 }}>
            <AiFillHome
              style={{ width: "100px", fontSize: "24px", marginTop: "4px" }}
            />
          </Radio.Button>
          <Radio.Button value={2} style={{ border: 0 }}>
            <FaUserFriends
              style={{ width: "100px", fontSize: "24px", marginTop: "4px" }}
            />
          </Radio.Button>
          <Radio.Button value={3} style={{ border: 0 }}>
            <IoBag
              style={{ width: "100px", fontSize: "24px", marginTop: "4px" }}
            />
          </Radio.Button>
          <Radio.Button value={4} style={{ border: 0 }}>
            <IoNotifications
              style={{ width: "100px", fontSize: "24px", marginTop: "4px" }}
            />
          </Radio.Button>
          <Radio.Button value={5} style={{ border: 0 }}>
            <MdChat
              style={{ width: "100px", fontSize: "24px", marginTop: "4px" }}
            />
          </Radio.Button>
          <Radio.Button value={6} style={{ border: 0 }}>
            <FaUserCircle
              style={{ width: "100px", fontSize: "24px", marginTop: "4px" }}
            />
          </Radio.Button>
        </Radio.Group>
      </div>

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
"use cli"
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd/lib";
import type { SearchProps } from "antd/es/input/Search";
import HomePage from "@/pages/homePages";
import ProfilePages from "@/pages/profilePages";
import Message from "@/components/message";
import * as style from "./style";
import NotificationRecruiterPages from "../notificationRecruiter";
import ProfessionalsPage from "../professionalsPages";

const Principal: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChangeRadio2 = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);


  return (
    <style.AppContainer>
      <style.Header>
        <style.Title>Match Institucional</style.Title>
        <style.SearchContainer direction="vertical">
          <style.StyledSearch placeholder="Pesquisar" onSearch={onSearch} enterButton />
        </style.SearchContainer>
        <style.RadioGroup
          onChange={onChangeRadio2}
          value={value}
          defaultValue="a"
          buttonStyle="solid"
        >
          <style.StyledRadioButton value={1}>
            <style.Home />
          </style.StyledRadioButton>
          <style.StyledRadioButton value={2}>
            <style.Friends />
          </style.StyledRadioButton>
          <style.StyledRadioButton value={3}>
            <style.Notifications />
          </style.StyledRadioButton>
          <style.StyledRadioButton value={4} disabled={true}>
            <style.Chat />
          </style.StyledRadioButton>
          <style.StyledRadioButton value={5}>
            <style.Circle />
          </style.StyledRadioButton>
        </style.RadioGroup>
      </style.Header>

      {value === 1 ? (
        <HomePage />
      ) : value === 2 ? (
        <ProfessionalsPage />
      ) : value === 3 ? (
        <NotificationRecruiterPages />
      ) : value === 4 ? (
        <Message />
      ) : (
        <ProfilePages />
      )}
    </style.AppContainer>
  );
};

export default Principal;
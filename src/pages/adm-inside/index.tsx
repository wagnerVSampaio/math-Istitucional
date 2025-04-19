"use cli"
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd/lib";
import type { SearchProps } from "antd/es/input/Search";
import HomePage from "@/pages/homePages";
import ProfilePages from "@/pages/profilePages";
import * as style from "./style";
import NotificationAdm from "@/components/adm/notification-adm";
import Search from "../search-professionals";
import PendingUserApproval from "../admPages";
import ProfilePage from "@/pages/profilePages";

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
            <style.ListProfessinals />
          </style.StyledRadioButton>
          <style.StyledRadioButton value={4}>
            <style.Notifications />
          </style.StyledRadioButton>
          <style.StyledRadioButton value={5}>
            <style.Circle />
          </style.StyledRadioButton>
        </style.RadioGroup>
      </style.Header>

      {value === 1 ? (
        <HomePage />
      ) : value === 2 ? (
        <PendingUserApproval />
      ) : value === 3 ? (
        <Search/>
      ) : value === 4 ? (
        <NotificationAdm/>
      ) : (
        <ProfilePage />
      )}
    </style.AppContainer>
  );
};

export default Principal;
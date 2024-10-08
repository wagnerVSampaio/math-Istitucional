"use cli"
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd/lib";
import type { SearchProps } from "antd/es/input/Search";
import HomePage from "@/pages/homePages";
import ProfilePages from "@/pages/profilePages";
import * as style from "./style";
import AdmPage from "../admPages";
import SearchProfessionals from "@/components/search-professionals";

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
            <style.Circle />
          </style.StyledRadioButton>
        </style.RadioGroup>
      </style.Header>

      {value === 1 ? (
        <HomePage />
      ) : value === 2 ? (
        <AdmPage />
      ) : value === 3 ? (
        <SearchProfessionals />
      ) : (
        <ProfilePages />
      )}
    </style.AppContainer>
  );
};

export default Principal;
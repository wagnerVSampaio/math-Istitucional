import React, { useEffect, useState } from "react";
import { Select, Pagination } from "antd/lib";
import type { PaginationProps } from "antd/lib";
import { DivFooter, DivSelect, DivVacancies, DivVacanciesContainer } from "./style";
const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  current,
  pageSize
) => {
  console.log(current, pageSize);
};

const Jobs: React.FC = () => {
  return (
    <div>
      <DivSelect>
        <Select
          showSearch
          placeholder="Vagas"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />

        <Select
          showSearch
          placeholder="Campus"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />

        <Select
          showSearch
          placeholder="Área Acadêmica"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
        <Select
          showSearch
          placeholder="Experiência"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
        <Select
          showSearch
          placeholder="Data de publicação "
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </DivSelect>

      <DivVacancies>
        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>

        <DivVacanciesContainer>
          <p className="text-customGreen">VAGA</p>
        </DivVacanciesContainer>
      </DivVacancies>

      <DivFooter>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={500}
        />
      </DivFooter>
    </div>
  );
};

export default Jobs;
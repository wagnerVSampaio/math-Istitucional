import React, {useState} from "react";
import { Select, Pagination } from "antd/lib";
import JobCard from "@/components/jobs";
import { DivSelect, DivVacancies, DivFooter } from "@/components/jobs/style";
import { jobsData } from "@/const";


const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());


const Jobs: React.FC = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalPaginas = Math.ceil(jobsData.length / itemsPerPage);

  const handleClickPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  const itensDaPaginaAtual = jobsData.slice(
    (paginaAtual - 1) * itemsPerPage,
    paginaAtual * itemsPerPage
  );
  return (
    <div className="mt-[50px]">
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
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "tom", label: "Tom" },
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
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "tom", label: "Tom" },
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
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "tom", label: "Tom" },
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
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "tom", label: "Tom" },
          ]}
        />
        <Select
          showSearch
          placeholder="Data de publicação"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "tom", label: "Tom" },
          ]}
        />
      </DivSelect>

      <DivVacancies>
        {itensDaPaginaAtual.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            description={job.description}
            location={job.location}
            postedAgo={job.postedAgo}
          />
        ))}
      </DivVacancies>

      <DivFooter>
      <Pagination
          defaultCurrent={1}
          total={jobsData.length}
          pageSize={itemsPerPage}
          current={paginaAtual}
          onChange={handleClickPagina}
        />
      </DivFooter>
    </div>
  );
};

export default Jobs;
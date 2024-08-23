import React, { useState, useMemo } from "react";
import { Select, Pagination } from "antd/lib";
import JobCard from "@/components/jobs";
import { DivSelect, DivVacancies, DivFooter } from "@/components/jobs/style";
import { jobsData } from "@/const";

const Jobs: React.FC = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    area: "",
    experience: "",
    postedAgo: "",
  });

  const totalPaginas = Math.ceil(jobsData.length / itemsPerPage);

  const handleClickPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      return (
        (!filters.title || job.title.includes(filters.title)) &&
        (!filters.location || job.location.includes(filters.location)) &&
        (!filters.area || job.requirements.includes(filters.area)) &&
        (!filters.experience || job.requirements.includes(filters.experience)) &&
        (!filters.postedAgo || job.postedAgo.includes(filters.postedAgo))
      );
    });
  }, [filters]);

  const itensDaPaginaAtual = filteredJobs.slice(
    (paginaAtual - 1) * itemsPerPage,
    paginaAtual * itemsPerPage
  );

  // Extrai as opções dinamicamente a partir dos dados
  const titles = Array.from(new Set(jobsData.map((job) => job.title)));
  const locations = Array.from(new Set(jobsData.map((job) => job.location)));
  const areas = Array.from(new Set(jobsData.map((job) => job.requirements)));
  const postedAges = Array.from(new Set(jobsData.map((job) => job.postedAgo)));

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
  
  return (
    <div className="mt-[50px]">
      <DivSelect>
        <Select
          showSearch
          placeholder="Vagas"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={(value) => handleFilterChange("title", value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={titles.map((title) => ({ value: title, label: title }))}
        />

        <Select
          showSearch
          placeholder="Campus"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={(value) => handleFilterChange("location", value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={locations.map((location) => ({ value: location, label: location }))}
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
          placeholder="Data de publicação"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={(value) => handleFilterChange("postedAgo", value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={postedAges.map((postedAgo) => ({ value: postedAgo, label: postedAgo }))}
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
          total={filteredJobs.length}
          pageSize={itemsPerPage}
          current={paginaAtual}
          onChange={handleClickPagina}
        />
      </DivFooter>
    </div>
  );
};

export default Jobs;

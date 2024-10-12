import React, { useState, useMemo } from "react";
import { Select, Pagination, Modal } from "antd/lib";
import JobCard from "@/components/servant/jobs";
import { DivSelect, DivVacancies, DivFooter } from "@/components/servant/jobs/style";
import { jobsData } from "@/const";
import JobDetails, { JobDetailsProps } from "@/components/servant/jobs/jobs_details";

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

  const [selectedJob, setSelectedJob] = useState<JobDetailsProps | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleJobClick = (job: JobDetailsProps) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const titles = Array.from(new Set(jobsData.map((job) => job.title)));
  const locations = Array.from(new Set(jobsData.map((job) => job.location)));
  const postedAges = Array.from(new Set(jobsData.map((job) => job.postedAgo)));

  return (
    <div className="mt-[50px]">
      <DivSelect>
        <Select
          showSearch
          placeholder="Vagas"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={(value) => handleFilterChange("title", value)}
          options={titles.map((title) => ({ value: title, label: title }))}
        />

        <Select
          showSearch
          placeholder="Campus"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={(value) => handleFilterChange("location", value)}
          options={locations.map((location) => ({
            value: location,
            label: location,
          }))}
        />

        <Select
          showSearch
          placeholder="Data de publicação"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={(value) => handleFilterChange("postedAgo", value)}
          options={postedAges.map((postedAgo) => ({
            value: postedAgo,
            label: postedAgo,
          }))}
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
            onClick={() => handleJobClick(job)}
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

      <Modal
        title="Detalhes da Vaga"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        {selectedJob && (
          <JobDetails
            id={selectedJob.id}
            title={selectedJob.title}
            description={selectedJob.description}
            requirements={selectedJob.requirements}
            benefits={selectedJob.benefits}
            location={selectedJob.location}
            postedAgo={selectedJob.postedAgo}
            salary={selectedJob.salary}
            contact={selectedJob.contact}
          />
        )}
      </Modal>
    </div>
  );
};

export default Jobs;
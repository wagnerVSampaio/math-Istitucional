import React, { useState, useMemo, useEffect } from "react";
import { Select, Pagination, Modal, Input } from "antd/lib";
import JobCard from "@/components/servant/jobs";
import { DivSelect, DivVacancies, DivFooter } from "@/components/servant/jobs/style";
import JobDetails, { JobDetailsProps } from "@/components/servant/jobs/jobs_details";
import dayjs from "dayjs"; 

const Jobs: React.FC = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    area: "",
    experience: "",
    posted_at: "",
  });

  const [selectedJob, setSelectedJob] = useState<JobDetailsProps | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobs, setJobs] = useState<JobDetailsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3002/api/getVagas");
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Resposta da API não é um array:", data);
          setJobs([]);
        }
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredJobs = useMemo(() => {
    return Array.isArray(jobs) ? jobs.filter((job) => {
      const jobPostedDate = dayjs(job.posted_at);
      const filterPostedDate = filters.posted_at ? dayjs().subtract(Number(filters.posted_at), 'day') : null;
  
      return (
        (!filters.title || job.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.area || job.requirements.toLowerCase().includes(filters.area.toLowerCase())) &&
        (!filters.experience || job.requirements.toLowerCase().includes(filters.experience.toLowerCase())) &&
        (!filters.posted_at || (filterPostedDate && jobPostedDate.isAfter(filterPostedDate)))
      );
    }) : [];
  }, [filters, jobs]);
  

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

  const titles = Array.from(new Set(jobs.map((job) => job.title)));
  const locations = Array.from(new Set(jobs.map((job) => job.location)));
  const postedAges = ["0", "7", "30"]; 
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="mt-[50px]">
      <DivSelect>
      <Input
        placeholder="Pesquisar por vagas"
        className="mr-[15px] w-[200px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
        onChange={(value) => handleFilterChange("postedago", value)}
        options={postedAges.map((age) => ({
          value: age,
          label: age === "0" ? "Hoje" : age === "7" ? "Últimos 7 dias" : "Últimos 30 dias",
        }))}
      />
      </DivSelect>

      <DivVacancies>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          itensDaPaginaAtual.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              description={job.description}
              location={job.location}
              posted_at={dayjs(job.posted_at).format('DD/MM/YYYY HH:mm')} // Formatar a data aqui
              onClick={() => handleJobClick(job)}
            />
          ))
        )}
      </DivVacancies>

      <DivFooter>
        <Pagination
          defaultCurrent={1}
          total={filteredJobs.length}
          pageSize={itemsPerPage}
          current={paginaAtual}
          onChange={setPaginaAtual}
        />
      </DivFooter>

      <Modal
        title="Detalhes da Vaga"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
        style={{ top: 10 }}
      >
        {selectedJob && (
          <JobDetails
            id={selectedJob.id}
            title={selectedJob.title}
            description={selectedJob.description}
            requirements={selectedJob.requirements}
            benefits={selectedJob.benefits}
            location={selectedJob.location}
            posted_at={dayjs(selectedJob.posted_at).format('DD/MM/YYYY HH:mm')} 
            salary={selectedJob.salary}
            contact={selectedJob.contact}
          />
        )}
      </Modal>
    </div>
  );
};

export default Jobs;

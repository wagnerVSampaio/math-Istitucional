// JobList.tsx
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { ExportButton, JobContainer, JobListContainer, UserContainer, UserInfo } from './style';

// types.ts
export interface Education {
    id_education: number;
    course: string;
    institution: string;
    start_date: string;
    completion_date: string;
  }
  
  export interface Experience {
    id_experience: number;
    position: string;
    company: string;
    start_date: string;
    end_date: string;
  }
  
  export interface Skill {
    id_skill: number;
    skill: string;
    number: number;
  }
  
  export interface InterestedUser {
    id_interested: number;
    id_user: number;
    full_name: string;
    email: string;
    profile_picture?: string;
    phone?: string;
    birth_date?: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
  }
  
  export interface Job {
    id_job: number;
    title: string;
    description: string;
    posted_at: string;
    interested_users: InterestedUser[];
  }

  
const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = sessionStorage.getItem("userData");
      if (!data) {
        console.error('Usuário não encontrado.');
        setLoading(false); 
        return;
      }
      const userData = JSON.parse(data);
      const id_recruiter = userData.id_user;
      try {
        const response = await fetch(`http://localhost:3002/api/interestedJob/${id_recruiter}`); 
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        setError('Não foi possível carregar as vagas');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Função para exportar todas as vagas e interessados
  const exportAllToExcel = () => {
    const worksheetData: any[] = [];

    jobs.forEach((job) => {
      job.interested_users.forEach((user) => {
        worksheetData.push({
          //"ID Vaga": job.id_job,
          "Vaga": job.title,
          //"Descrição": job.description,
          //"Data Postagem": new Date(job.posted_at).toLocaleDateString(),
          "Nome Interessado": user.full_name,
          "Email": user.email,
          "Telefone": user.phone || '',
          //"Nascimento": user.birth_date || '',
          "Formação": user.education.map(e => e.course).join(", "),
          "Instituição": user.education.map(e => e.institution).join(", "),
          "Experiências": user.experience.map(exp => exp.position).join(", "),
          "Habilidades": user.skills.map(skill => `${skill.skill} (${skill.number}%)`).join(", ")
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vagas e Interessados');
    XLSX.writeFile(workbook, 'Vagas_e_Interessados.xlsx');
  };

  // Função para exportar dados de uma vaga específica
  const exportJobToExcel = (job: Job) => {
    const worksheetData = job.interested_users.map((user) => ({
      //"ID Vaga": job.id_job,
      "Vaga": job.title,
      //"Descrição": job.description,
      //"Data Postagem": new Date(job.posted_at).toLocaleDateString(),
      "Nome Interessado": user.full_name,
      "Email": { t: 's', v: user.email, l: { Target: `mailto:${user.email}` } },
      "Telefone": user.phone || '',
      //"Nascimento": user.birth_date || '',
      "Formação": user.education.map(e => e.course).join(", "),
      "Instituição": user.education.map(e => e.institution).join(", "),
      "Experiências": user.experience.map(exp => exp.position).join(", "),
      "Habilidades": user.skills.map(skill => `${skill.skill} (${skill.number}%)`).join(", ")
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Vaga_${job.id_job}`);
    XLSX.writeFile(workbook, `Vaga_${job.id_job}_${job.title}.xlsx`);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <JobListContainer>
      <ExportButton onClick={exportAllToExcel}>Exportar Todas para Excel</ExportButton>

      {jobs.map((job) => (
        <JobContainer key={job.id_job}>
          <h2><strong>Vaga: </strong>{job.title}</h2>
          <p>{job.description}</p>
          <p><strong>Postado em:</strong> {new Date(job.posted_at).toLocaleDateString()}</p>

          {/* Botão de Exportação Individual para Cada Vaga */}
          <ExportButton onClick={() => exportJobToExcel(job)}>
            Exportar Vaga para Excel
          </ExportButton>

          <h3>Interessados:</h3>
          {job.interested_users.map((user) => (
            <UserContainer key={user.id_user}>
              <UserInfo>
                <img src={`http://localhost:3002/uploads/${user.profile_picture}`} alt={user.full_name} />
                <div>
                  <h4>{user.full_name}</h4>
                  <p>Email: {user.email}</p>
                  <p>Telefone: {user.phone}</p>
                  {/* <p>Nascimento: {user.birth_date}</p> */}
                </div>
              </UserInfo>
            </UserContainer>
          ))}
        </JobContainer>
      ))}
    </JobListContainer>
  );
};

export default JobList;

import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState, useEffect } from 'react';
import { Form, Input, Tooltip, Modal, Checkbox, Button, InputNumber, message, Card } from 'antd/lib';
import * as style from "./style";
import * as XLSX from 'xlsx';

type JobDetails = {
  id_job: number;
  id_recruiter: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  location: string;
  posted_at: string;
  salary: string;
  contact: string;
};

interface AdmProps {
  usersId: number | null;
}


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
  percentage: number;
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
  id_recruiter: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  location: string;
  posted_at: string;
  salary: string;
  contact: string;
  interested_users: InterestedUser[];
}

const Edited: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdms, setSelectedAdms] = useState<number[]>([]);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleRemove, setIsModalVisibleRemove] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [job, setJob] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<JobDetails | null>(null);
  const [editIndexJob, setEditIndexJob] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [interestedUsers, setInterestedUsers] = useState<InterestedUser[]>([]);
  const showModalAdd = () => {
    setIsModalVisibleAdd(true);
  };

  const handleCancelAdd = () => {
    setIsModalVisibleAdd(false);
  };

  /* CRIA VAGA */
  const onFinish = async (values: any) => {
    setLoading(true);
    const updatedUsers = jobs.filter(user => !selectedAdms.includes(user.id_job));
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      setLoading(false);
      return;
    }
    const userData = JSON.parse(data);
    const idRecruiter = userData.id_user;

    try {
      const response = await fetch("http://localhost:3002/api/createJobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          requirements: values.requirements || "",
          benefits: values.benefits || "",
          location: values.location,
          posted_at: new Date().toISOString(),
          salary: values.salary || 0,
          contact: values.contact || "",
          id_recruiter: idRecruiter,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar a vaga');
      }
      const newJob = await response.json();
      setJobs([...updatedUsers, newJob]);
      form.resetFields();
      handleCancelAdd();
    } catch (error) {
      console.error("Erro ao adicionar vaga:", error);
    } finally {
      setLoading(false);
    }
  };

  /* BUSCA AS VAGAS PELO ID DO RECRUTADOR */
  useEffect(() => {
    const fetchJobs = async () => {
      const data = sessionStorage.getItem("userData");
      if (!data) {
        console.error('Usuário não encontrado.');
        setLoading(false);
        return;
      }
      const userData = JSON.parse(data);
      const idRecruiter = userData.id_user;
      try {
        const response = await fetch(`http://localhost:3002/api/getJobIDRecruiter/${idRecruiter}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setJobs(data);

        } else {
          console.error("Resposta da API não é um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };
    fetchJobs();
  }, []);

  /* EDITAR VAGAS */
  const handleEditJobs = (job: JobDetails) => {
    setEditingJob({
      id_job: job.id_job,
      id_recruiter: job.id_recruiter,
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
      location: job.location,
      posted_at: job.posted_at,
      salary: job.salary,
      contact: job.contact,
    });
    setEditingJob(job);
    form.setFieldsValue(job);
    setEditIndexJob(jobs.indexOf(job));
    setIsModalVisibleEdit(true)
  };

  /* Função para salvar a edição de uma vaga de emprego */
  const handleSaveEditJob = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    const userData = JSON.parse(data);
    const idRecruiter = userData.id_recruiter;

    if (editIndexJob !== null && editingJob) {
      try {
        const formValues = await form.validateFields();

        const jobWithRecruiter = {
          ...editingJob,
          ...formValues,
          id_recruiter: idRecruiter
        };

        const response = await fetch(`http://localhost:3002/api/updateJob/${editingJob.id_job}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobWithRecruiter),
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar a vaga');
        }

        const updatedJob = await response.json();
        const updatedJobs = jobs.map((job, index) =>
          index === editIndexJob ? updatedJob : job
        );

        setJobs(updatedJobs);
        form.resetFields();
        setEditIndexJob(null);
        setEditingJob(null);
        setIsModalVisibleEdit(false);

      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };



  /* Alterna entre a seleção e a remoção */
  const showModal = () => {
    if (isSelecting) {
      setIsModalVisibleRemove(true);
    } else {
      setIsSelecting(true);
    }
  };

  /* Função para remover os usuários selecionados */
  const handleRemoveJobs = async () => {
    try {
      const updatedUsers = jobs.filter(user => !selectedAdms.includes(user.id_job));
      for (let userId of selectedAdms) {
        const response = await fetch(`http://localhost:3002/api/deleteJob/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Erro ao deletar vaga com ID ${userId}`);
        }
      }
      setJobs(updatedUsers);
      setIsModalVisibleRemove(false);
      setSelectedAdms([]);
      setIsSelecting(false);

      console.log('Vagas deletados com sucesso');
    } catch (error) {
      console.error('Erro ao deletar usuários:', error);
    }
  };

  /*  Alterna a seleção de um usuário */
  const toggleUserSelection = (id: number) => {
    if (selectedAdms.includes(id)) {
      setSelectedAdms(selectedAdms.filter(userId => userId !== id));
    } else {
      setSelectedAdms([...selectedAdms, id]);
    }
  };



  /* ABRE O EMAIL */
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredUsers = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const handleViewInterested = (job: JobDetails) => {
    setCurrentJobId(job.id_job);  // Armazena o id da vaga clicada
    setJobDetails(job); // Armazena o job completo para passar ao modal
    fetchInterestedUsers(job.id_job); // Chama a função para buscar interessados
    setIsModalVisible(true); // Exibe o modal
  };


  const handleCancelModal = () => {
    setIsModalVisible(false);
    setInterestedUsers([]); // Limpar os interessados ao fechar o modal
  };


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
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3002/api/interestedJob/${id_recruiter}`
        );
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data: Job[] = await response.json();
        setJob(data); // Armazenando os dados em 'job'
      } catch (error) {
        console.error("Erro ao carregar interessados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const exportToExcelGeneral = () => {
    if (!job.length) {
      console.error("Não há dados para exportar.");
      return;
    }

    const worksheetData = job.flatMap((currentJob) =>
      currentJob.interested_users.map((user) => ({
        "Título da Vaga": currentJob.title,
        "Descrição da Vaga": currentJob.description,
        Requisitos: currentJob.requirements,
        Benefícios: currentJob.benefits,
        Localização: currentJob.location,
        Salário: currentJob.salary,
        Contato: currentJob.contact,
        "Nome do Interessado": user.full_name,
        Email: user.email,
        Telefone: user.phone || "Não informado",
        "Data de Nascimento": user.birth_date || "Não informado",
        "Formação Acadêmica":
          user.education.map((edu) => `${edu.course} (${edu.institution})`).join(", ") ||
          "Não informado",
        "Experiências Profissionais":
          user.experience
            .map((exp) => `${exp.position} em ${exp.company}`)
            .join(", ") || "Não informado",
        "Habilidades":
          user.skills.map((skill) => `${skill.skill} (${skill.percentage}%)`).join(", ") ||
          "Não informado",
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Interessados");

    XLSX.writeFile(workbook, "Interessados_Recrutador.xlsx");
  };


  const fetchInterestedUsers = async (jobId: number) => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      setLoading(false);
      return;
    }
    const userData = JSON.parse(data);
    const id_recruiter = userData.id_user;

    try {
      const response = await fetch(`http://localhost:3002/api/interestedJobRecruiter/${id_recruiter}/${jobId}`);
      if (!response.ok) {
        throw new Error('Erro ao obter interessados');
      }
      const usersDataJob = await response.json();

      // Verificando a resposta da API
      console.log("Interessados:", usersDataJob);

      setInterestedUsers(Array.isArray(usersDataJob) ? usersDataJob : []);
    } catch (error) {
      console.error("Erro ao buscar interessados:", error);
      setInterestedUsers([]); // Garantir que a lista seja limpa em caso de erro
    } finally {
      setLoading(false);
    }
  };


  const exportJobToExcel = (job: JobDetails, interestedUsers: InterestedUser[]) => {
    if (!job || !interestedUsers || interestedUsers.length === 0) {
      console.error('Não há dados para exportar.');
      return;
    }

    const worksheetData = interestedUsers.map((user) => ({
      "Vaga": job.title || "Não informado",
      "Nome Interessado": user.full_name || "Não informado",
      "Email": { t: 's', v: user.email, l: { Target: `mailto:${user.email}` } },
      //"Telefone": user.phone || "Não informado",
      "Formação": user.education && user.education.length > 0 ? user.education.map(e => e.course).join(", ") : "Não informado",
      "Instituição": user.education && user.education.length > 0 ? user.education.map(e => e.institution).join(", ") : "Não informado",
      "Experiências": user.experience && user.experience.length > 0 ? user.experience.map(e => e.position).join(", ") : "Não informado",
      "Habilidades": user.skills && user.skills.length > 0 ? user.skills.map(skill => `${skill.skill} (${skill.percentage}%)`).join(", ") : "Não informado"
    }));


    // Cria a planilha a partir dos dados
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Vaga_${job.id_job}`);

    // Exporta para um arquivo Excel
    XLSX.writeFile(workbook, `Vaga_${job.id_job}_${job.title}.xlsx`);
  };


  return (
    <>
      <style.Total>
        <style.DivSearch>
          <style.DivTopSearch>
            <style.StyleInput>
              <Input
                prefix={<UserOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar"
              />
            </style.StyleInput>
            <style.ButtonAdd onClick={showModalAdd}>Adicionar vaga</style.ButtonAdd>


            <Tooltip title={isSelecting ? "Confirmar remoção" : "Remover usuário"}>
              <style.ButtonRemoveUser onClick={showModal}> Remover
                {isSelecting ? <style.ConfirmRemoveUser /> : <style.RemoveUser />}
              </style.ButtonRemoveUser>
            </Tooltip>
            <style.ExportButtonGeneral onClick={() => exportToExcelGeneral()}>Exportar dados gerais <style.Export /></style.ExportButtonGeneral>
          </style.DivTopSearch>

          {filteredUsers.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: "#272727" }}>
              <span>Não foi encontrado nenhuma vaga cadastrada.</span>
            </div>
          ) : (
            <div>
              <style.DivNotification>
                <style.StyledUl>
                  {filteredUsers.map((user) => (
                    <style.StyledLi
                      key={user.id_job}
                      style={{
                        backgroundColor: selectedAdms.includes(user.id_job) ? '#e6f7ff' : '#fff',
                      }}
                    >
                      <div className="flex flex-col m-[20px]">
                        <style.StyledParagraph>{user.title} <Tooltip title="Editar vaga"><style.EditJob onClick={() => handleEditJobs(user)} />
                        </Tooltip></style.StyledParagraph>
                        <style.StyledP>
                          <style.Address /> {user.location}
                        </style.StyledP>
                        <Tooltip title="Entrar em contato" placement='right'>
                          <style.StyledP style={{ cursor: 'pointer' }}>
                            <style.Email />{" "}
                            <span
                              style={{ textDecoration: "none" }}
                              onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                              onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                              onClick={() => handleContactClick(user.contact)}
                            >
                              {user.contact}
                            </span>
                          </style.StyledP>
                        </Tooltip>
                        <Tooltip title="Ver Interessados">
                          <style.InterestedButton onClick={() => handleViewInterested(user)}>Visualizar Interessados <style.ViewInterested /></style.InterestedButton>
                        </Tooltip>
                      </div>

                      {isSelecting && (
                        <Checkbox
                          checked={selectedAdms.includes(user.id_job)}
                          onChange={() => toggleUserSelection(user.id_job)}
                          className="mr-[20px]"
                        />
                      )}
                    </style.StyledLi>
                  ))}
                </style.StyledUl>
              </style.DivNotification>
            </div>
          )}
        </style.DivSearch>
      </style.Total>
      {/* Modal para mostrar os interessados */}
      <Modal
        title="Interessados na Vaga"
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}
        width="100%"
        style={{ top: 5 }}
      >
        {loading ? <p>Carregando interessados...</p> : (
          <Card>
            <ul>
              {interestedUsers.length > 0 ? (
                interestedUsers.map((user) => (
                  <style.StyledList key={user.id_interested}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <style.StyledImage
                        src={`http://localhost:3002/uploads/${user.profile_picture}`}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          marginRight: '20px',
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '18px', fontWeight: 'bold' }}>{user.full_name}</h1>
                        <div style={{ fontSize: '16px', color: 'gray' }}>{user.email}</div>
                      </div>
                    </div>
                  </style.StyledList>

                ))

              ) : (
                <p>Não há interessados para esta vaga.</p>
              )}
              {interestedUsers.length > 0 && (
                <style.ExportButton onClick={() => exportJobToExcel(jobDetails!, interestedUsers)}>
                  Exportar dados <style.Export />
                </style.ExportButton>
              )}
            </ul>
          </Card>

        )}

      </Modal>

      {/* Modal de confirmação */}
      <Modal
        open={isModalVisibleRemove}
        onOk={handleRemoveJobs}
        onCancel={() => setIsModalVisibleRemove(false)}
        okText="Sim, remover"
        cancelText="Cancelar"
        style={{ top: 5 }}
      >
        <p>Tem certeza de que deseja remover os usuários selecionados?</p>
      </Modal>

      {/* Modal de adicionar vaga */}
      <Modal
        open={isModalVisibleAdd}
        onCancel={handleCancelAdd}
        footer={null}
        width={700}
        style={{ top: 5 }}
      >
        <style.Container>
          <style.Title>Adicionar Vaga</style.Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Título da Vaga"
              name="title"
              rules={[{ required: true, message: 'Por favor, insira o título da vaga!' }]}
            >
              <Input placeholder="Título da Vaga" />
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: 'Por favor, insira a descrição da vaga!' }]}
            >
              <Input.TextArea placeholder="Descrição da Vaga" rows={4} />
            </Form.Item>

            <Form.Item
              label="Requerimentos"
              name="requirements"
              rules={[{ required: true, message: 'Por favor, insira os requerimentos necessários!' }]}
            >
              <Input placeholder="Requerimentos" />
            </Form.Item>

            <Form.Item
              label="Benefícios"
              name="benefits"
              rules={[{ required: true, message: 'Por favor, insira os benefícios desta vaga!' }]}
            >
              <Input placeholder="Benefícios" />
            </Form.Item>

            <Form.Item
              label="Local"
              name="location"
              rules={[{ required: true, message: 'Por favor, insira o local da vaga!' }]}
            >
              <Input placeholder="Local da Vaga" />
            </Form.Item>

            <Form.Item
              label="Salário"
              name="salary"
              rules={[{ required: true, message: 'Por favor, insira o salário!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                step={100}
                placeholder="Digite o salário"
              />
            </Form.Item>

            <Form.Item
              label="E-mail para contato"
              name="contact"
              rules={[{ required: true, message: 'Por favor, insira o contato!' }]}
            >
              <Input placeholder="Adicione o e-mail para contato" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Adicionar Vaga
              </Button>
            </Form.Item>
          </Form>
        </style.Container>
      </Modal>

      {/* Modal para editar vaga */}
      {editingJob && (
        <Modal
          title="Editar Vaga"
          open={isModalVisibleEdit}
          onCancel={handleCancelEdit}
          footer={null}
          width={700}
          style={{ top: 5 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveEditJob}
          >
            <Form.Item label="Título" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Descrição" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Requisitos" name="requirements">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Benefícios" name="benefits">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Localização" name="location">
              <Input />
            </Form.Item>
            <Form.Item label="Salário" name="salary">
              <Input />
            </Form.Item>
            <Form.Item label="Contato" name="contact" >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
              <Button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

    </>
  );
};

export default Edited;

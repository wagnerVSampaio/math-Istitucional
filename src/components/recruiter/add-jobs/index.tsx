import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState, useEffect } from 'react';
import { Form, Input, Tooltip, Modal, Checkbox, Button, InputNumber, message } from 'antd/lib';
import * as style from "./style";


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

const Edited: React.FC<AdmProps> = ({ usersId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdms, setSelectedAdms] = useState<number[]>([]);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleRemove, setIsModalVisibleRemove] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [editingJob, setEditingJob] = useState<JobDetails | null>(null);
  const [editIndexJob, setEditIndexJob] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);

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
  }, [usersId]);
    
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

  /* Filtra os usuários com base no termo de pesquisa */
  const filteredUsers = jobs.filter(user =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
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
              <style.ButtonRemoveUser onClick={showModal}>
                {isSelecting ? <style.ConfirmRemoveUser /> : <style.RemoveUser />}
              </style.ButtonRemoveUser>
            </Tooltip>
          </style.DivTopSearch>

          {filteredUsers.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <span>Não foi encontrado nenhuma vaga cadastrada.</span>
            </div>
          ) : (
            <div>
              <style.DivNotification>
                <style.StyledUl>
                  {jobs.map((user) => (
                    <style.StyledLi
                      key={user.id_job}
                      style={{
                        backgroundColor: selectedAdms.includes(user.id_job) ? '#e6f7ff' : '#fff',
                      }}
                    >
                      <div className="flex flex-col m-[20px]">
                        <style.StyledParagraph>{user.title} <Tooltip title="Editar vaga"><style.EditJob onClick={() => handleEditJobs(user)} /></Tooltip></style.StyledParagraph>
                        <style.StyledP>
                          <style.Address /> {user.location}
                        </style.StyledP>
                        <Tooltip title="Entrar em contato" placement='right'>
                          <style.StyledP style={{cursor: 'pointer'}}>
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

      {/* Modal de confirmação */}
      <Modal
        open={isModalVisibleRemove}
        onOk={handleRemoveJobs}
        onCancel={() => setIsModalVisibleRemove(false)}
        okText="Sim, remover"
        cancelText="Cancelar"
        style={{top: 5}}
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
          style={{top: 5}}
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

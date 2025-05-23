import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState, useEffect } from 'react';
import { Form, Input, Tooltip, Modal, Checkbox, Button, InputNumber } from 'antd/lib';
import * as style from "@/style/editedJobsPage-style";

type JobDetails = {
    id: number;
    title: string;
    description: string;
    requirements: string;
    benefits: string;
    location: string;
    postedago: string;
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const URL_API = process.env.NEXT_PUBLIC_URL_API;

  // Exibe o modal
  const showModalAdd = () => {
    setIsModalVisibleAdd(true);
  };

  // Fecha o modal
  const handleCancelAdd = () => {
    setIsModalVisibleAdd(false);
  };

  // Envia os dados do formulário para o backend
  const onFinish = async (values: any) => {
    setLoading(true);
    
    try {
      const response = await fetch(`${URL_API}/api/createvagas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          requirements: values.requirements || "", // Adapte conforme necessário
          benefits: values.benefits || "", // Adapte conforme necessário
          location: values.location,
          postedago: new Date().toISOString(), // Você pode alterar isso conforme necessário
          salary: values.salary || 0, // Valor padrão se não fornecido
          contact: values.contact || "", // Adapte conforme necessário
          id_recrutador: 18, // fixo enquanto ainda nao tem autenticação
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar a vaga');
      }

      const result = await response.json();

      form.resetFields();
      handleCancelAdd(); // Fecha o modal após a adição bem-sucedida
    } catch (error) {
      console.error("Erro ao adicionar vaga:", error);
      // Aqui você pode exibir uma mensagem de erro para o usuário, se necessário
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${URL_API}/api/getVagas`); 
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



  // Função para alternar entre a seleção e a remoção
  const showModal = () => {
    if (isSelecting) {
      setIsModalVisibleRemove(true);
    } else {
      setIsSelecting(true);
    }
  };

 // Função para remover os usuários selecionados
  const handleRemoveJobs = async () => {
    try {
      // Filtra os usuários que não foram selecionados
      const updatedUsers = jobs.filter(user => !selectedAdms.includes(user.id));

      // Faz a requisição para deletar cada usuário selecionado
      for (let userId of selectedAdms) {
        const response = await fetch(`${URL_API}/api/deleteVaga/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar vaga com ID ${userId}`);
        }
      }

      // Atualiza a lista de usuários no estado
      setJobs(updatedUsers);

      // Fecha o modal e reseta os estados
      setIsModalVisibleRemove(false);
      setSelectedAdms([]);
      setIsSelecting(false);

    } catch (error) {
      console.error('Erro ao deletar usuários:', error);
    }
  };

  // Função para alternar a seleção de um usuário
  const toggleUserSelection = (id: number) => {
    if (selectedAdms.includes(id)) {
      setSelectedAdms(selectedAdms.filter(userId => userId !== id));
    } else {
      setSelectedAdms([...selectedAdms, id]);
    }
  };

  // Função chamada ao clicar no email
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  // Filtra os usuários com base no termo de pesquisa
  const filteredUsers = jobs.filter(user =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Usuário destacado
  const Jobs = jobs.find(user => user.id === usersId) || null;
  const otherUsers = filteredUsers.filter(user => user.id!== usersId);


  return (
    <>
      <style.Total>
        <style.DivSearch>
          <style.DivTopSearch>
            <style.ButtonAdd onClick={showModalAdd}>Adicionar vaga</style.ButtonAdd>


            <Tooltip title={isSelecting ? "Confirmar remoção" : "Remover usuário"}>
              <style.ButtonRemoveUser onClick={showModal}>
                {isSelecting ? <style.ConfirmRemoveUser /> : <style.RemoveUser />}
              </style.ButtonRemoveUser>
            </Tooltip>
            <style.ButtonEdit><style.EditJob/></style.ButtonEdit>
          </style.DivTopSearch>

          {filteredUsers.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <span>Não foi encontrado nenhum usuário.</span>
            </div>
          ) : (
            <div>
              <style.DivNotification>
                <style.StyledUl>
                  {otherUsers.map((user) => (
                    <style.StyledLi
                      key={user.id}
                      style={{
                        backgroundColor: selectedAdms.includes(user.id) ? '#e6f7ff' : '#fff',
                      }}
                    >
                      <div className="flex flex-col m-[20px]">
                        <style.StyledParagraph>{user.title} <Tooltip title="Visualizar perfil"><style.ViewProfile /></Tooltip></style.StyledParagraph>
                        <style.StyledP>
                          <style.Address /> {user.location}
                        </style.StyledP>
                        <Tooltip title="Entrar em contato" placement='right'>
                          <style.StyledP>
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
                          checked={selectedAdms.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
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
      >
        <p>Tem certeza de que deseja remover os usuários selecionados?</p>
      </Modal>
      <Modal
        open={isModalVisibleAdd}
        onCancel={handleCancelAdd}
        footer={null}
        width={600}
        style={{top: 10}}
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
              label="Contato"
              name="contact"
              rules={[{ required: true, message: 'Por favor, insira o contato!' }]}
            >
              <Input placeholder="Contato" />
            </Form.Item>

            {/* <Form.Item
              label="Lotação"
              name="prorectory"
              rules={[{ required: true, message: 'Por favor, selecione a lotação!' }]}
            >
              <Select placeholder="Selecione uma Lotação">
              <Option value="PROAD">PROAD - Pró-Reitoria de Administração</Option>
                  <Option value="PROCCE">PROCCE -  Pró-Reitoria da Cultura,Comunidade e Extensão</Option>
                  <Option value="PROPLAN">PROPLAN - Pró-Reitoria de Planejamento e Desenvolvimento Institucional</Option>
                  <Option value="PROGES">PROGES - Pró-Reitoria de Gestão Estudantil</Option>
                  <Option value="PROEN">PROEN -  Pró-Reitoria de Ensino de Graduação</Option>
                  <Option value="PROGEP">PROGEP -  Pró-Reitoria de Gestão de Pessoas</Option>
                  <Option value="PROPPIT">PROPPIT -  Pró-Reitoria de Pesquisa, Pós-Graduação e Inovação Tecnológica</Option>
              </Select>
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Adicionar Vaga
              </Button>
            </Form.Item>
          </Form>
        </style.Container>
      </Modal>
    </>
  );
};

export default Edited;

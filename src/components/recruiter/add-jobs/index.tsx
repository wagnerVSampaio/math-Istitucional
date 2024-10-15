import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal, InputNumber } from 'antd/lib';
import { ButtonAdd, Container, DivAdd, Title } from "./style";

const { Option } = Select;

const AddJobs: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Exibe o modal
  const showModalAdd = () => {
    setIsModalVisible(true);
  };

  // Fecha o modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Envia os dados do formulário para o backend
  const onFinish = async (values: any) => {
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:3002/api/createvagas", {
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
      console.log("Vaga adicionada:", result);
      form.resetFields();
      handleCancel(); // Fecha o modal após a adição bem-sucedida
    } catch (error) {
      console.error("Erro ao adicionar vaga:", error);
      // Aqui você pode exibir uma mensagem de erro para o usuário, se necessário
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonAdd onClick={showModalAdd}>Adicionar vaga</ButtonAdd>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Container>
          <Title>Adicionar Vaga</Title>
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
        </Container>
      </Modal>
      <DivAdd>
        <p>Ainda não há vagas cadastradas!</p>
      </DivAdd>
    </>
  );
};

export default AddJobs;

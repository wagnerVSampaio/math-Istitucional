import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd/lib';
import { ButtonAdd, Container, DivAdd, Title} from "./style"

const { Option } = Select;

const AddJobs: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setLoading(false);
    form.resetFields();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  {/*EXIBE O MODAL*/}
  const showModalAdd = () => {
    setIsModalVisible(true);
  };

 {/*FECHA O MODAL*/}
  const handleCancel = () => {
    setIsModalVisible(false);
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
          label="Local"
          name="location"
          rules={[{ required: true, message: 'Por favor, insira o local da vaga!' }]}
        >
          <Input placeholder="Local da Vaga" />
        </Form.Item>

        <Form.Item
          label="Lotação"
          name="prorectory"
          rules={[{ required: true, message: 'Por favor, selecione a lotação!' }]}
        >
          <Select placeholder="Selecione uma Lotação">
            <Option value="PROGEP">PROGEP</Option>
            <Option value="PROAP">PROAP</Option>
            <Option value="PROPLAN">PROPLAN</Option>
            <Option value="PROGES">PROGES</Option>
            <Option value="PROEN">PROEN</Option>
            <Option value="PROEX">PROEX</Option>
            <Option value="PROINT">PROINT</Option>
          </Select>
        </Form.Item>

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

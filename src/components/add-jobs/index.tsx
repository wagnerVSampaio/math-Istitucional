import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd/lib';
import { Container, Title} from "./style"

const { Option } = Select;

const AddJobs: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // Aqui você faria a lógica para enviar as informações ao backend.
    console.log('Vaga Adicionada: ', values);
    setLoading(false);
    form.resetFields();
  };

  return (
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
  );
};

export default AddJobs;

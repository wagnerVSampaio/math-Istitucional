import React from 'react';
import { Card, Typography, Descriptions, Button } from 'antd/lib';
import dayjs from "dayjs"; 
const { Title, Paragraph } = Typography;

export type JobDetailsProps = {
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

const JobDetails: React.FC<JobDetailsProps> = ({
  title,
  description,
  requirements,
  benefits,
  location,
  postedago,
  salary,
  contact
}) => {


  return (
    <Card style={{ margin: '20px'}}>
      <Title level={3}>{title}</Title>
      <Paragraph type="secondary">{location} - {postedago}</Paragraph>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="Descrição">{description}</Descriptions.Item>
        <Descriptions.Item label="Requisitos">{requirements}</Descriptions.Item>
        <Descriptions.Item label="Benefícios">{benefits}</Descriptions.Item>
        <Descriptions.Item label="Salário">R$ {salary}</Descriptions.Item>
      </Descriptions>

      <Button type="primary" style={{ marginTop: '20px' }} href={`mailto:${contact}`}>
        Entrar em Contato
      </Button>
    </Card>
  );
};

export default JobDetails;
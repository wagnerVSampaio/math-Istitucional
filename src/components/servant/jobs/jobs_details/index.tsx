import React, { useState, useEffect } from 'react';
import { Card, Typography, Descriptions, Button } from 'antd/lib';
import dayjs from "dayjs"; 
const { Title, Paragraph } = Typography;

export type JobDetailsProps = {
  id_job: number; // id_job
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  location: string;
  posted_at: string;
  salary: string;
  contact: string;
};

const JobDetails: React.FC<JobDetailsProps> = ({
  id_job, 
  title,
  description,
  requirements,
  benefits,
  location,
  posted_at,
  salary,
}) => {
  useEffect(() => {
    console.log('ID job recebido:', id_job); // Verifique aqui
  }, [id_job]);
  const [inscrito, setInscrito] = useState(false); // Estado para verificar inscrição
  const [userData, setUserData] = useState<{ id_user: number; id_recruiter: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const userSessionData = sessionStorage.getItem('userData');
      if (userSessionData) {
        const parsedUserData = JSON.parse(userSessionData);
        setUserData(parsedUserData); // Armazena os dados do usuário
      } else {
        setError('Dados do usuário não encontrados.');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleInterest = async () => {
    if (!userData) {
      console.error('Usuário não encontrado.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3002/api/createInterested', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_job: id_job, // id da vaga
          id_user: userData.id_user, // id do usuário logado

        }),
      });
  
      if (response.ok) {
        setInscrito(true);
      } else {
        const errorData = await response.json();
        console.error('Erro ao enviar interesse:', errorData);
      }
    } catch (error) {
      console.error('Erro ao enviar interesse:', error);
    }
  };
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card style={{ margin: '20px' }}>
      <Title level={3}>{title}</Title>
      <Paragraph type="secondary">{location} - {dayjs(posted_at).format('DD/MM/YYYY')}</Paragraph>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="Descrição">{description}</Descriptions.Item>
        <Descriptions.Item label="Requisitos">{requirements}</Descriptions.Item>
        <Descriptions.Item label="Benefícios">{benefits}</Descriptions.Item>
        <Descriptions.Item label="Salário">R$ {salary}</Descriptions.Item>
      </Descriptions>



      {/* Botão de Interesse */}
      {inscrito ? (
        <Paragraph type="success" style={{ marginTop: '20px' }}>Candidatura enviada</Paragraph>
      ) : (
        <Button 
          type="default" 
          style={{ marginTop: '20px' }} 
          onClick={handleInterest}
        >
          Tenho interesse
        </Button>
      )}
    </Card>
  );
};

export default JobDetails;

import React, { useEffect, useState } from 'react';
import * as style from './style'; // Importa os styled-components
import { FaUser, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
interface Interested {
    id_interested: number;
    id_user: number;
    full_name: string;
    email: string;
    profile_picture: string;
    user_type: string;
    id_job: number;
    title: string;
    description: string;
    posted_at: string;
}

const UserInterests: React.FC = () => {
    const [interestedList, setInterestedList] = useState<Interested[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInterested = async () => {
            const id_recruiter = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')!).id_recruiter : null;

            if (!id_recruiter) {
                setError('ID do recrutador não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/api/idInterested/${id_recruiter}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados.');
                }
                const data: Interested[] = await response.json();
                setInterestedList(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError('Erro ao buscar dados.');
            } finally {
                setLoading(false);
            }
        };

        fetchInterested();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formatDate = (dateString: string | undefined): string => {
      if (!dateString) return ''; // Retorna string vazia se não houver data
      const date = new Date(dateString);

      // Definindo opções de formatação para exibir como "25 de janeiro de 2024"
      const options: Intl.DateTimeFormatOptions = {
          //day: 'numeric',
          month: 'long',
          year: 'numeric'
      };

      return date.toLocaleDateString('pt-BR', options);
  };
    return (
        <style.DivNotification>
            <style.StyledUl>
                {interestedList.map(item => (
                    <style.StyledLi key={item.id_interested}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <style.StyledImageContainer>
                        <style.StyledImage
                            src={`http://localhost:3002/uploads/${item.profile_picture}`}
                            alt={item.full_name}
                            style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '25px', marginLeft: '20px' }}
                        />
                        </style.StyledImageContainer>
                        <div style={{ flexGrow: 1 }}>
                            <style.StyledParagraph style={{ fontWeight: 'bold', fontSize: '1.2em', display: 'flex' }}>
                                <FaUser style={{ marginRight: '8px', marginTop: '4px' }} />
                                {item.full_name}
                            </style.StyledParagraph>
                            <style.StyledP>
                                <FaInfoCircle style={{ marginRight: '8px', marginTop: '4px' }} />
                                Demonstrou interesse na vaga {item.title}, postada em {formatDate(item.posted_at)}
                            </style.StyledP>
                            <style.StyledP style={{ margin: '5px 0' }}>
                                <FaEnvelope style={{ marginRight: '8px', marginTop: '4px' }} />
                                {item.email}
                            </style.StyledP>
                        </div>
                    </div>
                </style.StyledLi>
                ))}
            </style.StyledUl>
        </style.DivNotification>
    );
};

export default UserInterests;

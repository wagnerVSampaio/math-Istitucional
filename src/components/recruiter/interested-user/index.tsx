import React, { useEffect, useState } from 'react';
import * as style from './style'; // Importa os styled-components
import { FaUser, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import { Card, Typography, Descriptions, Modal, Button } from 'antd/lib';

const { Title } = Typography;

interface Education {
    id_education: number;
    course: string;
    institution: string;
    start_date: string;
    completion_date: string;
}

interface Experience {
    id_experience: number;
    position: string;
    company: string;
    start_date: string;
    end_date: string;
}
interface Skills {
    id_skill: number;
    skill: string;
    number: number;
}

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
    education: Education[];
    experience: Experience[];
    skills: Skills[]
}

const UserInterests: React.FC = () => {
    const [interestedList, setInterestedList] = useState<Interested[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<Interested | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        if (!dateString) return '';
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('pt-BR', options);
    };

    const handleUserClick = (user: Interested) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleContactClick = (email: string) => {
        const subject = "Contato sobre oportunidade de trabalho";
        const body = `Olá, ${email},\n\nGostaria de discutir uma oportunidade de trabalho com você. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };
    
    return (
        <style.DivNotification>
            <style.StyledUl>
                {interestedList.map(item => (
                    <style.StyledLi key={item.id_interested} onClick={() => handleUserClick(item)} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                            <style.StyledImageContainer>
                                <style.StyledImage
                                    src={`http://localhost:3002/uploads/${item.profile_picture}`}
                                    alt={item.full_name}
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '25px', marginLeft: '20px' }}
                                />
                            </style.StyledImageContainer>
                            <div style={{ flexGrow: 1 }}>
                                <style.StyledParagraph style={{ fontWeight: 'bold', fontSize: '25px', display: 'flex' }}>
                                    {item.full_name}
                                </style.StyledParagraph>
                                <style.StyledP>
                                    <FaInfoCircle style={{ marginRight: '8px', marginTop: '4px' }} />
                                    Demonstrou interesse na vaga {item.title}, postada em {formatDate(item.posted_at)}.
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

            {selectedUser && (
                <Modal
                    open={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                    width={800}
                    style={{ top: 10 }}
                >
                    <Card>
                        <div style={{ display: 'flex' }}>
                            <style.StyledImage
                                src={`http://localhost:3002/uploads/${selectedUser.profile_picture}`}
                                style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '25px', marginLeft: '20px', marginBottom: '20px' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h1 style={{ fontSize: '25px', fontWeight: 'bold', color: '#006b3f', marginTop: '25px' }}>{selectedUser.full_name}</h1>
                                <div style={{ cursor: 'pointer', fontSize: '16px' }}>
                                    {selectedUser.email}
                                </div>
                            </div>
                        </div>
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Formação">
                                {selectedUser.education.length > 0 ? (
                                    <ul style={{ listStyleType: 'disc' }}>
                                        {selectedUser.education.map(edu => (
                                            <li key={edu.id_education}>{edu.course} - {edu.institution} ({formatDate(edu.start_date)} a {formatDate(edu.completion_date)})</li>
                                        ))}
                                    </ul>
                                ) : (
                                    'Nenhuma formação encontrada.'
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Experiência">
                                {selectedUser.experience.length > 0 ? (
                                    <ul style={{ listStyleType: 'disc' }}>
                                        {selectedUser.experience.map(exp => (
                                            <li key={exp.id_experience}>{exp.position} - {exp.company} ( {formatDate(exp.start_date)} a {formatDate(exp.end_date)} )</li>
                                        ))}
                                    </ul>
                                ) : (
                                    'Nenhuma experiência encontrada.'
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Habilidades">
                            {selectedUser.skills.length > 0 ? (
                                <ul style={{ listStyleType: 'disc' }}>
                                    {selectedUser.skills.map(skill => (
                                        <li key={skill.id_skill}>{skill.skill} </li>
                                    ))}
                                </ul>
                                ) : (
                                    'Nenhuma educação encontrada.'
                                )}
                            </Descriptions.Item> 

                        </Descriptions>
                        <style.ButtonRemove>Não tenho interesse</style.ButtonRemove>
                        <Button onClick={() => handleContactClick(selectedUser.email)} style={{ marginTop: '20px', backgroundColor: "#006b3f", color: '#ffff', fontWeight: '500' }}>
                            Entrar em Contato
                        </Button>
                    </Card>
                </Modal>
            )}
        </style.DivNotification>
    );
};

export default UserInterests;

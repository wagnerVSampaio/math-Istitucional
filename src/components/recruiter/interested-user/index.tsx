import React, { useEffect, useState } from 'react';
import * as style from './style';  // Importa os styled-components

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
}

const UserInterests: React.FC = () => {
    const [interestedList, setInterestedList] = useState<Interested[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInterested = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/allInterested');
                const data: Interested[] = await response.json();
                setInterestedList(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterested();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <style.DivNotification>
            <style.StyledUl>
                {interestedList.map(item => (
                    <style.StyledLi key={item.id_interested}>

                        <div style={{display: 'flex'}}>
                        <img
                            src={`http://localhost:3002/uploads/${item.profile_picture}`}
                            alt={item.full_name}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px', marginLeft: "30px" }}
                        />
                            <div>
                            <style.StyledParagraph>{item.full_name}</style.StyledParagraph>
                            <style.StyledP><strong>Email:</strong> {item.email}</style.StyledP>
                            <style.StyledP><strong>Cargo de interesse:</strong> {item.title}</style.StyledP>
                            </div>

                        </div>
                    </style.StyledLi>
                ))}
            </style.StyledUl>
        </style.DivNotification>
    );
};

export default UserInterests;

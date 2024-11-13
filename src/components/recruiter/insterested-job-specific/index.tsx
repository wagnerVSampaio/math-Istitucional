import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface InterestedUser {
  id_interested: number;
  id_user: number;
  full_name: string;
  email: string;
  profile_picture: string;
  user_type: string;
  id_job: number;
}

const JobDetails: React.FC = () => {
  const { id_recruiter, id_job } = useParams<{ id_recruiter: string; id_job: string }>(); // Captura dos parâmetros da URL
  const [interestedUsers, setInterestedUsers] = useState<InterestedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterestedUsers = async () => {
      // Verifique se o id_recruiter e o id_job estão corretamente capturados da URL
      //console.log('id_recruiter:', id_recruiter, 'id_job:', id_job);
        const id_recruiter = 6;
        const id_job = 3;
      // Garantir que tanto id_recruiter quanto id_job estão presentes
      if (!id_recruiter || !id_job) {
        setError('Parâmetros de URL não encontrados!');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3002/api/interestedJobRecruiter/${id_recruiter}/${id_job}`);
        if (!response.ok) {
          throw new Error('Erro ao obter interessados');
        }
        const data = await response.json();
        console.log('Dados recebidos:', data);
        setInterestedUsers(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        //setError(error.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchInterestedUsers();
  }, [id_recruiter, id_job]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Interessados na Vaga</h1>
      <ul>
        {interestedUsers.length > 0 ? (
          interestedUsers.map((user) => (
            <li key={user.id_interested}>
              {/* <img src={user.profile_picture} alt={user.full_name} width={50} /> */}
              <p>Nome: {user.full_name}</p>
              <p>Email: {user.email}</p>
              <p>Tipo de Usuário: {user.user_type}</p>
            </li>
          ))
        ) : (
          <p>Nenhum interessado encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default JobDetails;

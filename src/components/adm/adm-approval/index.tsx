import React, { useState, useEffect } from "react";
import * as style from "./style"; // Ajuste o caminho conforme necessário
import { ButtonApprove, ButtonRefuse } from "./style"; // Ajuste o estilo conforme necessário
import { Modal } from "antd/lib";

interface PendingUser {
  id_user: number;
  full_name: string;
  email: string;
  campus: string; 
  status: string;
}

const PendingUserApproval: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Busca usuários pendentes ao montar o componente
  useEffect(() => {
    const fetchPendingUsers = async () => {
        try {
            const response = await fetch("http://localhost:3002/api/pendingUsers"); // Rota para buscar usuários pendentes
            const data = await response.json();
            setPendingUsers(data); // Armazena os usuários pendentes no estado
        } catch (error) {
            console.error("Erro ao buscar usuários pendentes:", error);
        }
    };

    fetchPendingUsers();
}, []);

// Função para aprovar um usuário
const approveUser = async (userId: number) => {
    try {
        const response = await fetch(`http://localhost:3002/api/approvedUser/${userId}`, {
            method: 'POST', // Método para aprovação
        });
        
        if (response.ok) {
            // Atualiza o status do usuário no frontend
            setPendingUsers(pendingUsers.map(user => 
                user.id_user === userId ? { ...user, status: 'approved' } : user
            ));
            console.log('Usuário aprovado com sucesso!');
        } else {
            console.error('Erro ao aprovar usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao aprovar usuário:', error);
    }
};
useEffect(() => {
  pendingUsers.forEach(user => {
      if (user.status === 'pending') {
          approveUser(user.id_user);
      }
  });
}, [pendingUsers]); 

  const rejectUser = async (userId: number) => {
    try {
        const response = await fetch(`http://localhost:3002/api/deleteUser/${userId}`, {
            method: 'DELETE', // Método para recusar (deletar)
        });

        if (response.ok) {
            // Atualiza a lista de usuários pendentes após a recusa
            setPendingUsers(pendingUsers.filter(user => user.id_user !== userId));
            console.log('Usuário recusado com sucesso!');
        } else {
            console.error('Erro ao recusar usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao recusar usuário:', error);
    }
  };
  useEffect(() => {
    pendingUsers.forEach(user => {
        if (user.status === 'pending') {
            rejectUser(user.id_user);
        }
    });
  }, [pendingUsers]); 

  // Função para exibir o modal de confirmação
  const showModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  // Função para confirmar a aprovação
  const handleConfirm = () => {
    if (selectedUserId) {
      approveUser(selectedUserId);
    }
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  // Função para confirmar a reprovação
  const handleDelete = () => {
    if (selectedUserId) {
      rejectUser(selectedUserId);
    }
    setIsModalVisibleDelete(false);
    setSelectedUserId(null);
  };
  const showModalDelete = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalVisibleDelete(true);
  };

  // Função para fechar o modal de delete
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
    setSelectedUserId(null);
  };


  return (
    
    <style.DivNotification>
      
      <div>
        <style.StyledUl>
        {pendingUsers.map((user) => (
          <style.StyledLi key={user.id_user} style={{ backgroundColor: '#fff' }}>
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{user.full_name}</style.StyledParagraph>
              <style.StyledP>
                <style.Email />{" "}
                <span>{user.email}</span>
              </style.StyledP>
              <style.StyledP>
                <style.Address /> {user.campus}
              </style.StyledP>
              <div className="flex mt-[40px]">
                <ButtonRefuse onClick={() => showModalDelete(user.id_user)}>Recusar</ButtonRefuse>
                <ButtonApprove onClick={() => showModal(user.id_user)}>Aprovar</ButtonApprove>
              </div>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
      <Modal
        title="Deseja prosseguir com a aprovação?"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Sim"
        cancelText="Não"
      >
        <p>Você está prestes a aprovar o usuário. Deseja continuar?</p>
      </Modal>
      <Modal
        title="Deseja recusar?"
        open={isModalVisibleDelete}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Sim"
        cancelText="Não"
      >
        <p>Você está prestes a reprovar o usuário. Deseja continuar?</p>
      </Modal>
      </div>
          
    </style.DivNotification>
  );
};

export default PendingUserApproval;

import React, { useState, useEffect } from "react";
import * as style from "./style"; // Ajuste o caminho conforme necessário
import { ButtonApprove, ButtonRefuse } from "./style"; // Ajuste o estilo conforme necessário
import { Modal } from "antd/lib";

interface PendingUser {
  id_usuario: number;
  nome_completo: string;
  email: string;
  campus: string; // Ou ajuste se houver outra informação relevante
}

const PendingUserApproval: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Busca usuários pendentes ao montar o componente
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/pendingUsers"); // Altere para a rota correta
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
        method: 'POST', // Altere conforme a lógica de aprovação
      });
      if (response.ok) {
        // Atualiza a lista de usuários pendentes após a aprovação
        setPendingUsers(pendingUsers.filter(user => user.id_usuario !== userId));
      } else {
        console.error('Erro ao aprovar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error);
    }
  };

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

  return (
    <style.DivNotification>
      <style.StyledUl>
        {pendingUsers.map((user) => (
          <style.StyledLi key={user.id_usuario} style={{ backgroundColor: '#fff' }}>
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{user.nome_completo}</style.StyledParagraph>
              <style.StyledP>
                <style.Email />{" "}
                <span>{user.email}</span>
              </style.StyledP>
              <style.StyledP>
                <style.Address /> {user.campus}
              </style.StyledP>
              <div className="flex mt-[40px]">
                <ButtonRefuse onClick={() => handleCancel()}>Recusar</ButtonRefuse>
                <ButtonApprove onClick={() => showModal(user.id_usuario)}>Aprovar</ButtonApprove>
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
    </style.DivNotification>
  );
};

export default PendingUserApproval;

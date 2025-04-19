import React, { useState, useEffect } from "react";
import * as style from "@/style/admPages-style"; 
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
  const [userData, setUserData] = useState<any>(null);

  const URL_API = process.env.NEXT_PUBLIC_URL_API;
  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      console.log(parsedData);
      
      fetchPendingUsers(parsedData.id_user);
    }
  }, [pendingUsers]);

  const fetchPendingUsers = async (idAdm: Number) => {

    try {
      const response = await fetch(`${URL_API}/api/pendingUsers/${idAdm}`); 
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários pendentes');
      }
      const data = await response.json();
      setPendingUsers(data); 
    } catch (error) {
      console.error("Erro ao buscar usuários pendentes:", error);
    } 
  };


const approveUser = async (userId: number) => {
    try {
        const response = await fetch(`${URL_API}/api/approvedUser/${userId}`, {
            method: 'POST', 
        });
        
        if (response.ok) {
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


  const rejectUser = async (userId: number) => {
    try {
        const response = await fetch(`${URL_API}/api/deleteRecruiter/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setPendingUsers(pendingUsers.filter(user => user.id_user !== userId));
            console.log('Usuário recusado com sucesso!');
        } else {
            console.error('Erro ao recusar usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao recusar usuário:', error);
    }
  };


  const showModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  const handleConfirm = () => {
    if (selectedUserId) {
      approveUser(selectedUserId);
    }
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

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

  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
    setSelectedUserId(null);
  };


  return (
    
    <style.DivNotification>
  <div>
    {pendingUsers.length === 0 ? (
      <style.divNotUser >
        <style.Info/>
        <style.ParagraphNotUser>Não há usuários para aprovar</style.ParagraphNotUser>
      </style.divNotUser>
    ) : (
      <style.StyledUl>
        {pendingUsers.map((user) => (
          <style.StyledLi key={user.id_user} style={{ backgroundColor: '#fff' }}>
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{user.full_name}</style.StyledParagraph>
              <style.StyledP>
                <style.Email /> <span>{user.email}</span>
              </style.StyledP>
              <style.StyledP>
                <style.Address /> {user.campus}
              </style.StyledP>
              <div className="flex mt-[40px]">
                <style.ButtonRefuse onClick={() => showModalDelete(user.id_user)}>Recusar</style.ButtonRefuse>
                <style.ButtonApprove onClick={() => showModal(user.id_user)}>Aprovar</style.ButtonApprove>
              </div>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
    )}

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

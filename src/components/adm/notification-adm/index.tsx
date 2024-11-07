import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message } from 'antd/lib';
import { MdDelete } from 'react-icons/md';
import { ButtonDelete, DivNotification, StyledLi, StyledUl } from './style';

interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
}

const NotificationAdm: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDetails, setIsModalVisibleDetails] = useState(false);
  const [newNotification, setNewNotification] = useState<Notification>({
    id: 0,
    title: '',
    message: '',
    createdAt: '',
  });

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewNotification((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleAddNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      message.error('Título, mensagem e tipo são obrigatórios!');
      return;
    }
    const data = sessionStorage.getItem("userData");
      if (!data) {
        console.error('Usuário não encontrado.');
        return;
      }
      const userData = JSON.parse(data);
      const idUser = userData.id_user;
      console.log(idUser)
    try {
      const response = await fetch(`http://localhost:3002/api/createNotification/${idUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotification),
      });

      if (response.ok) {
        const addedNotification = await response.json();
        setNotifications((prevNotifications) => [...prevNotifications, addedNotification]);
        setNewNotification({ id: 0, title: '', message: '', createdAt: '' });
        setIsModalVisible(false);
        message.success('Notificação adicionada com sucesso!');
      } else {
        message.error('Erro ao adicionar notificação.');
      }
    } catch (error) {
      message.error('Erro ao adicionar notificação.');
    }
  };

  // Função para deletar uma notificação via API
  const handleDeleteNotification = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3002/api/deleteNotification/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
        message.success('Notificação deletada com sucesso!');
      } else {
        message.error('Erro ao deletar notificação.');
      }
    } catch (error) {
      message.error('Erro ao deletar notificação.');
    }
  };

  const showMoreInfoModal = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalVisible(true);
  };
  const showMoreInfoModalDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalVisibleDetails(true);
  };


  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedNotification(null);
  };


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/allNotification');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        message.error('Erro ao carregar as notificações.');
      }
    };
    
    fetchNotifications();
  }, []);

  return (
    <DivNotification>
      <Button onClick={() => setIsModalVisible(true)} type="primary">
        Adicionar Notificação
      </Button>

      {/* Formulário de Adicionar Notificação */}
      <Modal
        title="Adicionar Notificação"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Input
          placeholder="Título"
          value={newNotification.title}
          onChange={(e) => handleInputChange(e, 'title')}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Mensagem"
          value={newNotification.message}
          onChange={(e) => handleInputChange(e, 'message')}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleAddNotification}>
          Adicionar
        </Button>
      </Modal>

      {/* Lista de Notificações */}
      <StyledUl>
        {notifications.map((notification) => (
          <StyledLi key={notification.id}>
            <div>
              <strong> {notification.title} </strong>
              <p>{notification.message}</p>
              <div>
                <ButtonDelete onClick={() => handleDeleteNotification(notification.id)}>
                  <MdDelete />
                </ButtonDelete>
              </div>
            </div>
            <Button type="link" onClick={() => showMoreInfoModalDetails(notification)}>
              Ver mais
            </Button>
          </StyledLi>
        ))}
      </StyledUl>

      {/* Modal de Detalhes da Notificação */}
      {selectedNotification && (
        <Modal
          title={selectedNotification.title}
          open={isModalVisibleDetails}
          onCancel={handleModalClose}
          footer={null}
        >
          <div>
            <p>
              <strong>Mensagem:</strong> {selectedNotification.message}
            </p>
            <p>
              <strong>Criado em:</strong> {selectedNotification.createdAt}
            </p>
            <Button
              type="primary"
              onClick={() => handleDeleteNotification(selectedNotification.id)}
            >
              Deletar Notificação
            </Button>
          </div>
        </Modal>
      )}
    </DivNotification>
  );
};

export default NotificationAdm;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message } from 'antd/lib';
import { MdDelete } from 'react-icons/md';
import * as style from "./style"; 

interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
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
    read: false,
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
      message.error('Título e mensagem são obrigatórios!');
      return;
    }
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }
    const userData = JSON.parse(data);
    const idUser = userData.id_user;

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
        setNewNotification({ id: 0, title: '', message: '', createdAt: '', read: false });
        setIsModalVisible(false);
        message.success('Notificação adicionada com sucesso!');
      } else {
        message.error('Erro ao adicionar notificação.');
      }
    } catch (error) {
      message.error('Erro ao adicionar notificação.');
    }
  };

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

  const showMoreInfoModalDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalVisibleDetails(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsModalVisibleDetails(false);
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

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <style.DivNotification>
      <div className='flex'>
      <style.ButtonAdd onClick={() => setIsModalVisible(true)} className='flex'>
        Criar aviso <style.SpeakerNotice/>
      </style.ButtonAdd>
      <style.MyNoticesButton>Meus avisos</style.MyNoticesButton>
      </div>
      
      <style.StyledUl>
        {notifications.map((notification) => (
          <style.StyledLi
            key={notification.id}
            onClick={() => {
              showMoreInfoModalDetails(notification);
              markAsRead(notification.id);
            }}
            style={{ backgroundColor: notification.read ? '#fff' : '#e6f7ff' }}
          >
            <div className='flex'>
              <div className='flex flex-col m-[20px]'>
              <p className='font-bold text-[16px]'>{notification.title}</p>
              <p>{notification.message}</p>
              </div>
              <style.ButtonDelete onClick={(e) => {
                e.stopPropagation();
                handleDeleteNotification(notification.id);
              }}>
                <MdDelete />
              </style.ButtonDelete>
            </div>
            {/* <Button type="link" onClick={(e) => {
              e.stopPropagation();
              showMoreInfoModalDetails(notification);
            }}>
              Ver mais
            </Button> */}
          </style.StyledLi>
        ))}
      </style.StyledUl>

      {selectedNotification && (
        <Modal
          title={selectedNotification.title}
          open={isModalVisibleDetails}
          onCancel={handleModalClose}
          footer={null}
          width={700}
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
              Deletar notificação
            </Button>
          </div>
        </Modal>
      )}

      <Modal
        title="Adicionar aviso geral"
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
    </style.DivNotification>
  );
};

export default NotificationAdm;

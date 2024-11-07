import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message, Menu } from 'antd/lib';
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
  const [selectedMenu, setSelectedMenu] = useState('all'); // Controla a opção selecionada

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/allNotification');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      message.error('Erro ao carregar as notificações.');
    }
  };

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

  const handleMenuClick = (key: string) => {
    setSelectedMenu(key);
    if (key === 'create') setIsModalVisible(true);
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

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const renderContent = () => {
    if (selectedMenu === 'all') {
      return (
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
      );
    } else if (selectedMenu === 'my') {
      return <p>Meus avisos (implementação futura)</p>;
    }
  };

  return (
    <style.DivNotification>
      <style.SideMenu>
        <Menu
          mode="vertical"
          defaultSelectedKeys={['all']}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="all">Todas as Notificações</Menu.Item>
          <Menu.Item key="create">Criar Aviso</Menu.Item>
          <Menu.Item key="my">Meus Avisos</Menu.Item>
        </Menu>
      </style.SideMenu>
      
      <div>
        {renderContent()}
      </div>

      {isModalVisible && (
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
      )}
    </style.DivNotification>
  );
};

export default NotificationAdm;

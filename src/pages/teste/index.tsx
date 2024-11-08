import React, { useState, useEffect } from 'react';
import { Button, Input, message, Menu, Tooltip } from 'antd/lib';
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
  const [newNotification, setNewNotification] = useState<Notification>({
    id: 0,
    title: '',
    message: '',
    createdAt: '',
    read: false,
  });
  const [selectedMenu, setSelectedMenu] = useState('all'); 





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





  const idNotifications = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }
    const userData = JSON.parse(data); 
    const idUser = userData.id_user;

    try {
      const response = await fetch(`http://localhost:3002/api/idNotification/${idUser}`);
      const data = await response.json();
      setNotifications(data); 
    } catch (error) {
      message.error('Erro ao carregar as notificações.');
    }
  };
  useEffect(() => {
    idNotifications();
  }, []);




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
  
    if (key === 'create') {
    } else if (key === 'my') {
      idNotifications(); 
    } else if (key === 'all') {
      fetchNotifications();
    }
  };
  


  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3002/api/markNotification/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        );
      } else {
        message.error('Erro ao marcar notificação como lida.');
      }
    } catch (error) {
      message.error('Erro ao conectar com o servidor.');
    }
  };


  const renderContent = () => {
    if (selectedMenu === 'all') {
      return (
        <style.StyledUl>
          {notifications.map((notification) => (
            <style.StyledLi
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              style={{ backgroundColor: notification.read ? '#fff' : '#e6f7ff' }}
            >
              <div className='flex'>
                <div className='flex flex-col m-[20px]'>
                  <p className='font-bold text-[16px]'>{notification.title}</p>
                  <p>{notification.message}</p>
                </div>
                <Tooltip title="Apagar notificação">
                <style.ButtonDelete onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification.id);
                }}>
                  <MdDelete />
                </style.ButtonDelete>
                </Tooltip>
              </div>
            </style.StyledLi>
          ))}
        </style.StyledUl>
      );
    } else if (selectedMenu === 'create') {
      return (
        <div style={{ padding: '20px', width: '60%' }}>
          <h2>Adicionar aviso geral</h2>
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
        </div>
      );
    } else if (selectedMenu === 'my') {
      return (
        <style.StyledUl>
          {notifications.map((notification) => (
            <style.StyledLi key={notification.id}>
              <div className='flex'>
                <div className='flex flex-col m-[20px]'>
                  <p className='font-bold text-[16px]'>{notification.title}</p>
                  <p>{notification.message}</p>
                </div>
                <style.ButtonDelete onClick={() => handleDeleteNotification(notification.id)}>
                  <MdDelete />
                </style.ButtonDelete>
              </div>
            </style.StyledLi>
          ))}
        </style.StyledUl>
      );
    }
  };

  return (
    <style.DivNotification>
      <style.SideMenu>
        <Menu
          mode="vertical"
          defaultSelectedKeys={['all']}
          onClick={({ key }) => handleMenuClick(key)}
          style={{ boxShadow: '0 4px 8px rgba(0, 107, 63, 0.2)'}}
        >
          <Menu.Item key="all">Todas as Notificações</Menu.Item>
          <Menu.Item key="create">Criar Aviso</Menu.Item>
          <Menu.Item key="my">Meus Avisos</Menu.Item>
        </Menu>
      </style.SideMenu>
      
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>
    </style.DivNotification>
  );
};

export default NotificationAdm;

import React, { useState, useEffect } from 'react';
import { Button, Input, message, Menu, Tooltip } from 'antd/lib';
import { MdDelete } from 'react-icons/md';
import * as style from './style';
import TextArea from 'antd/lib/input/TextArea';

interface Notification {
  id: number;
  full_name: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

const NotificationRecruiter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState<Notification>({
    id: 0,
    title: '',
    full_name: '',
    message: '',
    created_at: '',
    read: false,
  });
  const [selectedMenu, setSelectedMenu] = useState('all'); // Controla o menu selecionado

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''; 
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleDateString('pt-BR', options);
  };
  // Carrega as notificações ao iniciar o componente
  useEffect(() => {
    if (selectedMenu === 'all') {
      fetchNotifications();  // Carrega todas as notificações
    } else if (selectedMenu === 'my') {
      loadUserNotifications();  // Carrega as notificações específicas do usuário
    }
  }, [selectedMenu]); // Recarrega as notificações sempre que o menu mudar

  // Função para carregar todas as notificações
  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/allNotification');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      message.error('Erro ao carregar as notificações.');
    }
  };

  // Função para carregar as notificações do usuário logado
  const loadUserNotifications = async () => {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      console.error('Usuário não encontrado.');
      return;
    }
    const { id_user } = JSON.parse(userData);

    try {
      const response = await fetch(`http://localhost:3002/api/idNotification/${id_user}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      message.error('Erro ao carregar as notificações.');
    }
  };

  // Função para criar nova notificação
  const handleAddNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      message.error('Título e mensagem são obrigatórios!');
      return;
    }

    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      console.error('Usuário não encontrado.');
      return;
    }
    const { id_user } = JSON.parse(userData);

    try {
      const response = await fetch(`http://localhost:3002/api/createNotification/${id_user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotification),
      });

      if (response.ok) {
        const addedNotification = await response.json();
        setNotifications((prevNotifications) => [...prevNotifications, addedNotification]);
        setNewNotification({ id: 0, title: '',full_name: '', message: '', created_at: '', read: false });
        message.success('Notificação adicionada com sucesso!');
      } else {
        message.error('Erro ao adicionar notificação.');
      }
    } catch (error) {
      message.error('Erro ao adicionar notificação.');
    }
  };

  const markAsRead = async (notification_id: number) => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
        console.error('Usuário não encontrado.');
        message.error('Usuário não encontrado. Verifique a sessão.');
        return;
    }

    const userData = JSON.parse(data);
    const id_user = userData.id_user;

    try {
        const response = await fetch(`http://localhost:3002/api/maskNotification/${notification_id}/read`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_user }),  // Certificando-se de que o corpo está correto
        });

        if (response.ok) {
            const responseData = await response.json(); // Captura o retorno da API
            console.log("Resposta da API:", responseData);

            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === notification_id ? { ...notification, read: true } : notification
                )
            );
        } else {
            const responseBody = await response.text();  // Pega o corpo da resposta de erro
            message.error(`Erro ao marcar notificação como lida: ${responseBody}`);
            console.log("Erro ao marcar notificação como lida:", responseBody);
        }
    } catch (error) {
        message.error('Erro ao conectar com o servidor.');
        console.error("Erro ao enviar a requisição:", error);
    }
};


  // Função para excluir uma notificação
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

  const deleteNotification = async (notificationId: number) => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
        console.error('Usuário não encontrado.');
        message.error('Usuário não encontrado. Verifique a sessão.');
        return;
    }

    const userData = JSON.parse(data);
    const id_user = userData.id_user;
    try {
      const response = await fetch(
        `http://localhost:3002/api/delUserNotification/${notificationId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: id_user }),
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== notificationId)
        );
        message.success('Notificação excluída com sucesso!');
      } else {
        message.error('Erro ao excluir notificação.');
      }
    } catch {
      message.error('Erro ao conectar com o servidor.');
    }
  };


  // Função para manipular o clique no menu
  const handleMenuClick = (key: string) => {
    setSelectedMenu(key);  // Atualiza o estado de menu selecionado
  };

  
  // Renderiza o conteúdo com base no menu selecionado
  const renderContent = () => {
    if (selectedMenu === 'all') {
      return (
        <style.StyledUl>
          {notifications.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '10px' }}>
              Não há notificações disponíveis.
            </p>
          ) : (
            notifications.map((notification) => (
              <style.StyledLi
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                style={{ backgroundColor: notification.read ? '#fff' : '#e6f7ff' }}
              >
                <div className="flex">
                  <div className="flex flex-col m-[20px]">
                    <p className="font-bold text-[16px]">{notification.title}</p>
                    <p>{notification.message}</p>
                    <p style={{color: "#6c757d", marginTop: "12px"}}>{notification.full_name} - {formatDate(notification.created_at)}</p>
                  </div>
                  <Tooltip title="Apagar notificação">
                    <style.ButtonDelete
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <MdDelete />
                    </style.ButtonDelete>
                  </Tooltip>
                </div>

              </style.StyledLi>
            ))
          )}
        </style.StyledUl>
      );
    } else if (selectedMenu === 'create') {
      return (
        <div style={{ padding: '20px', width: '60%' }}>
          <h2>Adicionar aviso geral</h2>
          <Input
            placeholder="Título"
            value={newNotification.title}
            onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
            style={{ marginBottom: 10 }}
          />
          <TextArea
            placeholder="Mensagem"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
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
        {notifications.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: "10px" }}>Não há notificações disponíveis.</p>
        ) : (
          notifications.map((notification) => (
            <style.StyledLi key={notification.id}>
              <div className="flex">
                <div className="flex flex-col m-[20px]">
                  <p className="font-bold text-[16px]">{notification.title}</p>
                  <p>{notification.message}</p>
                </div>
                <style.ButtonDelete onClick={() => handleDeleteNotification(notification.id)}>
                  <MdDelete />
                </style.ButtonDelete>
              </div>
            </style.StyledLi>
          ))
        )}
      </style.StyledUl>
      );
    }
  };

  return (
    <style.DivNotification>
      <style.SideMenu>
        <Menu
          mode="vertical"
          selectedKeys={[selectedMenu]}  // O menu usa o estado `selectedMenu` para destacar a opção ativa
          onClick={({ key }) => handleMenuClick(key)}
          style={{ boxShadow: '0 4px 8px rgba(0, 107, 63, 0.2)' }}
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

export default NotificationRecruiter;

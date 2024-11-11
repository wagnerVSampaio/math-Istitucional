import React, { useState, useEffect } from 'react';
import { Button, Input, message, Menu, Tooltip } from 'antd/lib';
import { MdDelete } from 'react-icons/md';
import * as style from "./style";

interface Notification {
    id: number;
    title: string;
    full_name: string;
    message: string;
    created_at: string;
    read: boolean;
}

const NotificationServant: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [newNotification, setNewNotification] = useState<Notification>({
        id: 0,
        title: '',
        full_name: '',
        message: '',
        created_at: '',
        read: false,
      });
    const [selectedMenu, setSelectedMenu] = useState('all');
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
    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const data = sessionStorage.getItem("userData");
        if (!data) {
            console.error('Usuário não encontrado.');
            return;
        }

        const userData = JSON.parse(data);
        const idUser = userData.id_user;

        try {
            const response = await fetch(`http://localhost:3002/api/allNotification`);
            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
            } else {
                message.error('Erro ao carregar as notificações.');
            }
        } catch (error) {
            message.error('Erro ao conectar com o servidor.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setNewNotification((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
        setNewNotification((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const handleDeleteNotification = async (id: number) => {
        const data = sessionStorage.getItem("userData");
        if (!data) {
            console.error('Usuário não encontrado.');
            message.error('Usuário não encontrado. Verifique a sessão.');
            return;
        }
    
        const userData = JSON.parse(data);
        const userId = userData.id_user;
    
        try {
            const response = await fetch(`http://localhost:3002/api/deleteId/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Passando o user_id na requisição
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
            message.error('Erro ao conectar com o servidor.');
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
    

    return (
        <style.DivNotification>
            <style.StyledUl>
                {notifications.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999', padding: "10px" }}>Não há notificações disponíveis.</p>
                ) : (
                    notifications.map((notification) => (
                        <style.StyledLi
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            style={{ backgroundColor: notification.read ? '#fff' : '#e6f7ff' }}
                        >
                            <div className='flex'>
                                <div className='flex flex-col m-[20px]'>
                                    <p className='font-bold text-[16px]'>{notification.title}</p>
                                    <p>{notification.message}</p>
                                    <p style={{color: "#6c757d", marginTop: "12px"}}>{notification.full_name} - {formatDate(notification.created_at)}</p>
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
                    ))
                )}
            </style.StyledUl>
        </style.DivNotification>
    );
}

export default NotificationServant;

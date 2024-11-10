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

const NotificationServant: React.FC = () => {
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
            message.error('Erro ao conectar com o servidor.');
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
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) =>
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

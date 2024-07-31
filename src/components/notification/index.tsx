import React, { useEffect, useState } from 'react';
import { ButtonDelete, DivNotification } from './style';
import { MdDeleteForever } from "react-icons/md";

interface Notification {
  id: number;
  message: string;
  location: string;
  type: 'info' | 'update';
  read: boolean;
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Função para carregar notificações do arquivo JSON local
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/notifications.json');
        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
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

  const deleteNotification = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  return (
    <DivNotification>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {notifications.map(notification => (
            <li
              key={notification.id}
              onClick={() => !notification.read && markAsRead(notification.id)}
              style={{
                backgroundColor: notification.read ? '#fff': '#006b3e49',
                padding: '15px',
                margin: '10px 0',
                cursor: 'pointer',
                borderRadius: "10px",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div className='flex flex-col'>
                <p className='font-extrabold text-[16px]'>NOVA VAGA DISPONÍVEL </p>
                <p>{notification.message} no {notification.location}</p>
              </div>
              <ButtonDelete
              onClick={(e) => {
                e.stopPropagation(); 
                deleteNotification(notification.id); 
              }}

            >
              <MdDeleteForever />
            </ButtonDelete>
            </li>
          ))}
        </ul>
    </DivNotification>
  );
};

export default Notification;

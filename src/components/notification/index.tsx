import React, { useState } from 'react';
import { ButtonDelete, DivNotification, StyledLi, StyledUl } from './style';
import { MdDeleteForever } from "react-icons/md";
import { jobsData } from '@/const';

interface JobNotification {
  id: number;
  title: string;
  description: string;
  location: string;
  postedAgo: string;
  read: boolean; // Adicionada a propriedade 'read'
}

// Inicializar jobsData com a propriedade 'read'
const initialJobsData: JobNotification[] = jobsData.map(job => ({
  ...job,
  read: false
}));

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<JobNotification[]>(initialJobsData);

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
      <StyledUl>
        {notifications.map(notification => (
          <StyledLi
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            style={{backgroundColor: notification.read ? '#fff' : '#006b3e49'}}
          >
            <div className='flex flex-col'>
              <p className='font-extrabold text-[16px]'>Nova oportunidade disponível: {notification.title}</p>
              <p>Local: {notification.location} | Publicada: {notification.postedAgo}</p>
            </div>
            <ButtonDelete
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notification.id);
              }}
            >
              <MdDeleteForever />
            </ButtonDelete>
          </StyledLi>
        ))}
      </StyledUl>
    </DivNotification>
  );
};

export default Notification;

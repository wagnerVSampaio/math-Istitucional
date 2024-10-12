import React, { useState } from 'react';
import { ButtonDelete, DivNotification, H2Name, StyledLi, StyledUl } from './style';
import { MdDeleteForever } from "react-icons/md";
import { jobsData } from '@/const';
import { Modal, Button } from 'antd/lib';

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
  const [isModalVisible, setIsModalVisible] = useState(false); // Controle do modal
  const [selectedNotification, setSelectedNotification] = useState<JobNotification | null>(null);

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

  const showMoreInfoModal = (notification: JobNotification) => {
    setSelectedNotification(notification); // Armazena os dados da notificação selecionada
    setIsModalVisible(true); // Exibe o modal
    markAsRead(notification.id); // Marca a notificação como lida ao abrir o modal
  }

  const handleModalClose = () => {
    setIsModalVisible(false); // Fecha o modal
    setSelectedNotification(null); // Limpa a notificação selecionada
  };

  return (
    <DivNotification>
      <StyledUl>
        {notifications.map(notification => (
          <StyledLi
            key={notification.id}
            onClick={() => showMoreInfoModal(notification)} 
            style={{backgroundColor: notification.read ? '#fff' : '#e6f7ff'}}
          >
            <div className='flex flex-col'>
              <p className='font-extrabold text-[16px]' style={{fontWeight: notification.read ? '400' : '800'}}>
                Nova oportunidade disponível: {notification.title}
              </p>
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

      <Modal
        title="Detalhes da Oportunidade"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null} 
        width={800}
      >
        {selectedNotification && (
          <div>
            <H2Name>{selectedNotification.title}</H2Name>
            <p><strong>Descrição:</strong> {selectedNotification.description}</p>
            <p><strong>Local:</strong> {selectedNotification.location}</p>
            <p><strong>Publicado:</strong> {selectedNotification.postedAgo}</p>
          </div>
        )}
      </Modal>
    </DivNotification>
  );
};

export default Notification;
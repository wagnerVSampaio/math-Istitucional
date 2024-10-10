import React, { useState } from 'react';
import { ButtonDelete, ButtonDeleteEmail, DivNotification, H2Name, StyledLi, StyledUl } from './style';
import { MdDelete } from "react-icons/md";
import { ProfessionalsData } from "@/professionals-const";
import { Modal, Button, message } from 'antd/lib';

interface Professional {
  id: number;
  name: string;
  formation: string;
  address: string;
  contact: string;
  experience: string;
  read: boolean;
  expanded: boolean;
}

const initialProfessionalsData: Professional[] = ProfessionalsData.map(professional => ({
  ...professional,
  read: false,
  expanded: false
}));

const NotificationRecruiter: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionalsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  {/*DELETA EMAIL*/}
  const deleteProfessional = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.filter(professional => professional.id !== id)
    );
    message.success('E-mail deletado com sucesso!');
  };

  {/*MARCA O EMAIL COMO LIDO QUANDO CLICADO*/}
  const markAsRead = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.map(professional =>
        professional.id === id ? { ...professional, read: true } : professional
      )
    );
  };

  {/*MODAL VISÍVEL*/}
  const showMoreInfoModal = (professional: Professional) => {
    setSelectedProfessional(professional);
    setIsModalVisible(true);
    markAsRead(professional.id);
  }

  {/*FECHAR MODAL*/}
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProfessional(null);
  };

  {/*MINI EMAIL PRONTO PARA ENTRAR EM CONTATO COM OS USUÁRIOS*/}
  const generateMailtoLink = (contact: string, name: string) => {
    const subject = encodeURIComponent(`Contato sobre oportunidade de trabalho`);
    const body = encodeURIComponent(`Olá ${name},\n\nGostaria de conversar sobre uma oportunidade de trabalho. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`);
    return `mailto:${contact}?subject=${subject}&body=${body}`;
  };

  {/*DELETAR EMAIL PELO MODAL*/}
  const handleDeleteFromModal = () => {
    if (selectedProfessional) {
      deleteProfessional(selectedProfessional.id);
      handleModalClose();
    }
  };

  return (
    <DivNotification>
      <StyledUl>
        {professionals.map((professional) => (
          <StyledLi
            key={professional.id}
            onClick={(e) => {
              e.stopPropagation();
              showMoreInfoModal(professional);
            }}
            style={{ backgroundColor: professional.read ? '#fff' : '#ddd' }}
          >
            <div className='flex flex-col m-[20px]'>
              <p className='font-bold text-[16px]'>{professional.name}, {professional.formation}</p>
              <p>Local: {professional.address}</p>
            </div>
            <div className='delete-button-container'>
              <ButtonDelete
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProfessional(professional.id);
                }}
              >
                <MdDelete />
              </ButtonDelete>
            </div>
          </StyledLi>
        ))}
      </StyledUl>
      <Modal
        title="Mais Informações"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedProfessional && (
          <div>
            <H2Name>{selectedProfessional.name}</H2Name>
            <p><strong>Formação:</strong> {selectedProfessional.formation}</p>
            <p><strong>Endereço:</strong> {selectedProfessional.address}</p>
            <p><strong>Contato:</strong> {selectedProfessional.contact}</p>
            <p><strong>Experiência:</strong> {selectedProfessional.experience}</p>

            <Button
              type="primary"
              className='mt-3'
              href={generateMailtoLink(selectedProfessional.contact, selectedProfessional.name)}
            >
              Entrar em contato
            </Button>
            <ButtonDeleteEmail
              className='mt-3'
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFromModal();
              }}
            >
              Deletar e-mail
            </ButtonDeleteEmail>
          </div>
        )}
      </Modal>
    </DivNotification>
  );
};

export default NotificationRecruiter;

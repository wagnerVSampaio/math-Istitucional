import React, { useState } from 'react';
import { ButtonDelete, DivNotification, H2Name, StyledLi, StyledUl } from './style';
import { MdDeleteForever } from "react-icons/md";
import { ProfessionalsData } from "@/professionals-const";
import { Modal, Button } from 'antd/lib';

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
  const [isModalVisible, setIsModalVisible] = useState(false); // Controle do modal
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const deleteProfessional = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.filter(professional => professional.id !== id)
    );
  };

  const markAsRead = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.map(professional =>
        professional.id === id ? { ...professional, read: true } : professional
      )
    );
  };

  const showMoreInfoModal = (professional: Professional) => {
    setSelectedProfessional(professional); // Armazena os dados do profissional selecionado
    setIsModalVisible(true); // Exibe o modal
    markAsRead(professional.id); // Marca o profissional como lido ao abrir o modal
  }

  const handleModalClose = () => {
    setIsModalVisible(false); // Fecha o modal
    setSelectedProfessional(null); // Limpa o profissional selecionado
  };

  // Função para gerar o link mailto
  const generateMailtoLink = (contact: string, name: string) => {
    const subject = encodeURIComponent(`Contato sobre oportunidade de trabalho`);
    const body = encodeURIComponent(`Olá ${name},\n\nGostaria de conversar sobre uma oportunidade de trabalho. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`);
    return `mailto:${contact}?subject=${subject}&body=${body}`;
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
            style={{ backgroundColor: professional.read ? '#fff' : '#006b3e4b' }} // Cor muda para branco se "lido"
          >
            <div className='flex flex-col m-[20px]'>
              <p className='font-bold text-[16px]'>
                {professional.name}, {professional.formation}
              </p>
              <p>Local: {professional.address}</p>
            </div>
            <div className='delete-button-container'>
              <ButtonDelete
              onClick={(e) => {
                e.stopPropagation();
                deleteProfessional(professional.id);
              }}
              >
                <MdDeleteForever />
              </ButtonDelete>
            </div>
          </StyledLi>
        ))}
      </StyledUl>

      <Modal
        title="Mais Informações"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // Remove os botões de OK/Cancelar
        width={800} // Largura personalizada para o modal maior
        height={1000}
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
              href={generateMailtoLink(selectedProfessional.contact, selectedProfessional.name)} // Link mailto com assunto e corpo
            >
              Entrar em contato
            </Button>
          </div>
        )}
      </Modal>
    </DivNotification>
  );
};

export default NotificationRecruiter;

import React, { useState } from 'react';
import { ButtonDelete, DivNotification, StyledLi, StyledUl } from './style';
import { MdDeleteForever } from "react-icons/md";
import { ProfessionalsData } from "@/professionals-const";

interface Professional {
  id: number;
  name: string;
  formation: string;
  address: string;
  contact: string;
  experience: string;
  read: boolean;
  expanded: boolean; // Novo campo para controle de expansão
}

const initialProfessionalsData: Professional[] = ProfessionalsData.map(professional => ({
  ...professional,
  read: false,
  expanded: false // Inicialmente não expandido
}));

const NotificationRecruiter: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionalsData);

  const markAsRead = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.map(professional =>
        professional.id === id ? { ...professional, read: true } : professional
      )
    );
  };

  const deleteProfessional = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.filter(professional => professional.id !== id)
    );
  };

  const toggleExpand = (id: number) => {
    setProfessionals(prevProfessionals =>
      prevProfessionals.map(professional =>
        professional.id === id ? { ...professional, expanded: !professional.expanded } : professional
      )
    );
  };

  const handleProfessionalClick = (id: number) => {
    markAsRead(id);
    toggleExpand(id);
  };

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <DivNotification>
      <StyledUl>
        {professionals.map((professional) => (
          <StyledLi
            key={professional.id}
            onClick={() => handleProfessionalClick(professional.id)}
            style={{ backgroundColor: professional.read ? '#fff' : '#ccc' }}
          >
            <div className='flex flex-col m-[20px]'>
              <p className='font-extrabold text-[16px]'>
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
            {professional.expanded && (
              <div className='expanded-details '>
                <p>Contato: 
                <span
                  style={{ textDecoration: "none" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                  onClick={() => handleContactClick(professional.contact)}
                >
                  {professional.contact}
                </span></p>
              </div>
            )}
          </StyledLi>
        ))}
      </StyledUl>
    </DivNotification>
  );
};

export default NotificationRecruiter;

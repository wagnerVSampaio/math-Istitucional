import React, { useState } from 'react';
import { ButtonDelete, DivNotification, StyledLi, StyledUl } from './style';
import { MdDeleteForever } from "react-icons/md";
import { ProfessionalsData } from "@/professionals-const";
import { useRouter } from 'next/router';

interface Professional {
  id: number;
  name: string;
  formation: string;
  address: string;
  contact: string;
  experience: string;
  read: boolean;
}

const initialProfessionalsData: Professional[] = ProfessionalsData.map(professional => ({
  ...professional,
  read: false
}));

const NotificationRecruiter: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionalsData);
  const router = useRouter();

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

  const handleProfessionalClick = (id: number) => {
    markAsRead(id);
    router.push(`/professionalsPages?id=${id}`);
  };
  

  return (
    <DivNotification>
      <StyledUl>
        {professionals.map((professional) => (
          <StyledLi
            key={professional.id}
            onClick={() => handleProfessionalClick(professional.id)}
            style={{ backgroundColor: professional.read ? '#fff' : '#006b3e52' }}
          >
            <div className='flex flex-col'>
              <p className='font-extrabold text-[16px]' style={{ fontWeight: professional.read ? '400' : '800' }}>
               {professional.name}, {professional.formation}
              </p>
              <p>Local: {professional.address}</p>
            </div>
            <ButtonDelete
              onClick={(e) => {
                e.stopPropagation();
                deleteProfessional(professional.id);
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

export default NotificationRecruiter;

import React, { useState } from 'react';
import { DivNotification, StyledLi, StyledUl } from './style';
import { ProfessionalsData } from '@/professionals-const';

interface Professional {
  id: number;
  name: string;
  formation: string;
  address: string;
  contact: string;
}

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>(ProfessionalsData);

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <DivNotification>
      <StyledUl>
        {professionals.map(professional => (
          <StyledLi key={professional.id}>
            <div className='flex flex-col'>
              <p className='font-bold text-[16px]'>{professional.name}, formação em: {professional.formation}</p>
              <p>Local: {professional.address} | Contato:  <span
                  style={{ textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                  onClick={() => handleContactClick(professional.contact)}
                >
                  {professional.contact}
                </span></p>
            </div>
          </StyledLi>
        ))}
      </StyledUl>
    </DivNotification>
  );
};

export default Professionals;

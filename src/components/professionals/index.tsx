import React from "react";
import * as style from "./style";
import { ProfessionalsData } from "@/professionals-const";

interface Professional {
  id: number;
  name: string;
  formation: string;
  address: string;
  contact: string;
  experience: string;
}

interface ProfessionalsProps {
  highlightedId: number | null;
}

const Professionals: React.FC<ProfessionalsProps> = ({ highlightedId }) => {
  const professionals = ProfessionalsData;

  // Separar a vaga destacada do restante
  const highlightedProfessional = professionals.find(professional => professional.id === highlightedId) || null;
  const otherProfessionals = professionals.filter(professional => professional.id !== highlightedId);

  return (
    <style.DivNotification>
      <style.StyledUl>
        {highlightedProfessional && (
          <style.StyledLi
            key={highlightedProfessional.id}
            style={{ 
              width: "100%",
              backgroundColor: '#d3f9d8'
            }}
          >
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{highlightedProfessional.name}</style.StyledParagraph>
              <style.StyledP>
                <style.Degree /> {highlightedProfessional.formation}
              </style.StyledP>
              <style.StyledP>
                <style.Address /> {highlightedProfessional.address}
              </style.StyledP>
              <style.StyledP>
                <style.Email />
                <span>{highlightedProfessional.contact}</span>
              </style.StyledP>
              <style.StyledP className="mt-[20px]">{highlightedProfessional.experience}</style.StyledP>
            </div>
          </style.StyledLi>
        )}

        {otherProfessionals.map((professional) => (
          <style.StyledLi
            key={professional.id}
            style={{ 
              backgroundColor: '#fff'
            }}
          >
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{professional.name}</style.StyledParagraph>
              <style.StyledP>
                <style.Degree /> {professional.formation}
              </style.StyledP>
              <style.StyledP>
                <style.Address /> {professional.address}
              </style.StyledP>
              <style.StyledP>
                <style.Email />
                <span>{professional.contact}</span>
              </style.StyledP>
              <style.StyledP className="mt-[20px]">{professional.experience}</style.StyledP>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
    </style.DivNotification>
  );
};

export default Professionals;

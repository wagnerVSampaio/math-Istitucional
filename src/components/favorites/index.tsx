import React, { useState } from "react";
import * as style from "./style";
import { ProfessionalsData } from "@/professionals-const";

interface Professional {
  id: number;
  name: string;
  formation: string;
  address: string;
  contact: string;
  experience: string;
  favorite: boolean;
}

const FavoritesPage: React.FC = () => {
  // Estado que armazena os profissionais e o status de favoritos
  const [professionals, setProfessionals] = useState<Professional[]>(ProfessionalsData);

  // Função para remover dos favoritos
  const toggleFavorite = (id: number) => {
    setProfessionals((prevProfessionals) =>
      prevProfessionals.map((professional) =>
        professional.id === id ? { ...professional, favorite: !professional.favorite } : professional
      )
    );
  };

  // Filtrar apenas os profissionais que são favoritos
  const favoriteProfessionals = professionals.filter(professional => professional.favorite);

  // Função de contato por email
  const handleContactClick = (email: string) => {
    const subject = "Contato sobre oportunidade de trabalho";
    const body = `Olá, ${email},\n\nGostaria de discutir uma oportunidade de trabalho com você. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <style.DivNotification>
      <h2>Meus Favoritos</h2>
      {favoriteProfessionals.length === 0 ? (
        <p>Nenhum profissional foi adicionado aos favoritos.</p>
      ) : (
        <style.StyledUl>
          {favoriteProfessionals.map((professional) => (
            <style.StyledLi
              key={professional.id}
              style={{
                backgroundColor: '#fff',
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
                  <span
                    style={{ textDecoration: "none" }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                    onClick={() => handleContactClick(professional.contact)}
                  >
                    {professional.contact}
                  </span>
                </style.StyledP>
                <style.StyledP className="mt-[20px]">{professional.experience}</style.StyledP>

                {/* Botão para remover dos favoritos */}
                <button onClick={() => toggleFavorite(professional.id)}>
                  Remover dos Favoritos
                </button>
              </div>
            </style.StyledLi>
          ))}
        </style.StyledUl>
      )}
    </style.DivNotification>
  );
};

export default FavoritesPage;

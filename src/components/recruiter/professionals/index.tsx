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

interface ProfessionalsProps {
  highlightedId: number | null;
}

const Professionals: React.FC<ProfessionalsProps> = ({ highlightedId }) => {
  // Estado que armazena os profissionais e seu status de favorito
  const [professionals, setProfessionals] = useState<Professional[]>(ProfessionalsData);

  // Função para alternar o status de favorito
  const toggleFavorite = (id: number) => {
    setProfessionals((prevProfessionals) =>
      prevProfessionals.map((professional) =>
        professional.id === id ? { ...professional, favorite: !professional.favorite } : professional
      )
    );
  };

  const highlightedProfessional = professionals.find(professional => professional.id === highlightedId) || null;
  const otherProfessionals = professionals.filter(professional => professional.id !== highlightedId);

  const handleContactClick = (email: string) => {
    const subject = "Contato sobre oportunidade de trabalho";
    const body = `Olá, ${email},\n\nGostaria de discutir uma oportunidade de trabalho com você. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <style.DivNotification>
      <style.StyledUl>
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
                  <style.Email />{" "}
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
                  </span>
                </style.StyledP>
                <style.StyledP className="mt-[20px]">{professional.experience}</style.StyledP>

                {/* Botão para adicionar/remover dos favoritos */}
                <div>
                <button onClick={() => toggleFavorite(professional.id)}>
                  {professional.favorite ? <style.ButtonFavorite>Salvar<style.FavoriteSelect /></style.ButtonFavorite> : <style.ButtonFavorite>Salvo<style.FavoriteNoSelect /></style.ButtonFavorite>}
                </button>
            </div>
              </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
    </style.DivNotification>
  );
};

export default Professionals;

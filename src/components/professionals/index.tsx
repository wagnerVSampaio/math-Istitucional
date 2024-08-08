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
}

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] =
    useState<Professional[]>(ProfessionalsData);

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <style.DivNotification>
      <style.StyledUl>
        {professionals.map((professional) => (
          <style.StyledLi key={professional.id}>
            <div className="flex flex-col">
              <style.StyledParagraph >{professional.name}</style.StyledParagraph>
              <style.StyledP>
                <style.Degree /> {professional.formation}
              </style.StyledP>
              <style.StyledP>
                <style.Address /> {professional.address}{" "}
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
              <style.StyledP className="mt-[20px]"> {professional.experience}</style.StyledP>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
    </style.DivNotification>
  );
};

export default Professionals;

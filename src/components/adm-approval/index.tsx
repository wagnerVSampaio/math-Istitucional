import React from "react";
import * as style from "./style";
import { AdmData } from "@/adm-const";

interface Adm {
  id: number;
  name: string;
  campus: string;
  email: string;
}

interface AdmProps {
  highlightedId: number | null;
}

const AdmApproval: React.FC<AdmProps> = ({ highlightedId }) => {
  const Adm = AdmData;

  const highlightedAdm = Adm.find(Adm => Adm.id === highlightedId) || null;
  const otherAdm = Adm.filter(Adm => Adm.id !== highlightedId);

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <style.DivNotification>
      <style.StyledUl>
        {highlightedAdm && (
          <style.StyledLi
            key={highlightedAdm.id}
            style={{ 
              width: "100%",
              backgroundColor: '#d3f9d8'
            }}
          >
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{highlightedAdm.name}</style.StyledParagraph>
              <style.StyledP>
                <style.Degree /> {highlightedAdm.campus}
              </style.StyledP>
              <style.StyledP>
                <style.Email />
                <span>{highlightedAdm.email}</span>
              </style.StyledP>
              <style.StyledP className="mt-[20px]"></style.StyledP>
            </div>
          </style.StyledLi>
        )}

        {otherAdm.map((adm) => (
          <style.StyledLi
            key={adm.id}
            style={{ 
              backgroundColor: '#fff'
            }}
          >
            <div className="flex flex-col m-[20px]">
              <style.StyledParagraph>{adm.name}</style.StyledParagraph>
              <style.StyledP>
                <style.Address /> {adm.campus}
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
                  onClick={() => handleContactClick(adm.email)}
                >
                  {adm.email}
                </span>
              </style.StyledP>
              <style.StyledP className="mt-[20px]">Adicionar aq</style.StyledP>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
    </style.DivNotification>
  );
};

export default AdmApproval;

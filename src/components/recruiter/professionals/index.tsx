import React, { useEffect, useState } from "react";
import * as style from "./style";

interface Education {
  id_education: number;
  course: string;
  institution: string;
  start_date: string;
  completion_date: string;
}

interface Experience {
  id_experience: number;
  position: string;
  company: string;
  start_date: string;
  end_date: string;
}

interface Professional {
  id_user: number;
  full_name: string;
  email: string;
  profile_picture: string;
  user_type: string;
  phone: string | null;
  birth_date: string | null;
  education: Education[];
  experience: Experience[];
}

interface ProfessionalsProps {
  highlightedId: number | null;
}

const Professionals: React.FC<ProfessionalsProps> = ({ highlightedId }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Para controle de loading

  // Função para buscar os profissionais da API
  const fetchProfessionals = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/userServer'); 
      if (!response.ok) {
        throw new Error('Erro ao buscar profissionais');
      }
      const data = await response.json();
      setProfessionals(data);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const highlightedProfessional = professionals.find(professional => professional.id_user === highlightedId) || null;
  const otherProfessionals = professionals.filter(professional => professional.id_user !== highlightedId);

  const handleContactClick = (email: string) => {
    const subject = "Contato sobre oportunidade de trabalho";
    const body = `Olá, ${email},\n\nGostaria de discutir uma oportunidade de trabalho com você. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <style.DivNotification>
      {loading ? ( // Exibe mensagem de loading enquanto os dados estão sendo carregados
        <p>Carregando...</p>
      ) : (
        <style.StyledUl>
          {otherProfessionals.map((professional) => (
            <style.StyledLi key={professional.id_user} style={{ backgroundColor: '#fff' }}>
              <div className="flex flex-col m-[20px]">
                <style.StyledParagraph>{professional.full_name}</style.StyledParagraph>
                <style.StyledP>
                  {professional.education.map((edu) => (
                    <div key={edu.id_education} style={{display: 'flex'}}>
                      <style.Degree /> {edu.course} - {edu.institution}
                    </div>
                  ))}
                </style.StyledP>
                <style.StyledP>
                  {professional.experience.map((exp) => (
                    <div key={exp.id_experience} style={{display: 'flex'}}>
                      <style.Address /> {exp.position} na {exp.company} 
                    </div>
                  ))}
                </style.StyledP>
                <style.StyledP>
                  <style.Email />{" "}
                  <span
                    style={{ textDecoration: "none" }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                    onClick={() => handleContactClick(professional.email)}
                  >
                    {professional.email}
                  </span>
                </style.StyledP>


              </div>
            </style.StyledLi>
          ))}
        </style.StyledUl>
      )}
    </style.DivNotification>
  );
};

export default Professionals;

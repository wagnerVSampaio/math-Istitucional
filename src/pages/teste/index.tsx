import React, { useEffect, useState } from 'react';
import * as style from './style';
import { FaEnvelope } from 'react-icons/fa';
import { Card, Descriptions, Modal, Button, Select } from 'antd/lib';
import Search from 'antd/lib/input/Search';

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

interface Skills {
  id_skill: number;
  skill: string;
}

interface Interested {
  id_interested: number;
  id_user: number;
  full_name: string;
  email: string;
  profile_picture: string;
  education: Education[];
  experience: Experience[];
  skills: Skills[];
}

const UserInterests: React.FC = () => {
  const [interestedList, setInterestedList] = useState<Interested[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<Interested | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const fetchProfessionals = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/userServer");
      if (!response.ok) {
        throw new Error("Erro ao buscar profissionais");
      }
      const data = await response.json();
      setInterestedList(data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const filteredProfessionals = interestedList.filter((professional) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = professional.full_name.toLowerCase().includes(query);
    const educationMatch = professional.education.some(
      (edu) =>
        edu.course.toLowerCase().includes(query) ||
        edu.institution.toLowerCase().includes(query)
    );
    const experienceMatch = professional.experience.some(
      (exp) =>
        exp.position.toLowerCase().includes(query) ||
        exp.company.toLowerCase().includes(query)
    );
    const skillsMatch = professional.skills.some((skill) =>
      skill.skill.toLowerCase().includes(query)
    );

    // Filtros de Formação, Experiência e Habilidades
    const educationFilterMatch = selectedEducation
      ? professional.education.some(
          (edu) =>
            edu.course.toLowerCase().includes(selectedEducation.toLowerCase()) ||
            edu.institution.toLowerCase().includes(selectedEducation.toLowerCase())
        )
      : true;

    const experienceFilterMatch = selectedExperience
      ? professional.experience.some(
          (exp) =>
            exp.position.toLowerCase().includes(selectedExperience.toLowerCase()) ||
            exp.company.toLowerCase().includes(selectedExperience.toLowerCase())
        )
      : true;

    const skillFilterMatch = selectedSkill
      ? professional.skills.some((skill) =>
          skill.skill.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      : true;

    return (
      (nameMatch || educationMatch || experienceMatch || skillsMatch) &&
      educationFilterMatch &&
      experienceFilterMatch &&
      skillFilterMatch
    );
  });

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('pt-BR', options);
  };

  const handleUserClick = (user: Interested) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleContactClick = (email: string) => {
    const subject = "Contato sobre oportunidade de trabalho";
    const body = `Olá,\n\nGostaria de discutir uma oportunidade de trabalho com você. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <style.DivNotification>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Search
          placeholder="Buscar por nome, formação, experiência ou habilidade"
          allowClear
          onSearch={(value) => setSearchQuery(value)}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "300px" }}
        />
        <Select
          showSearch
          placeholder="Filtrar por Formação"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={setSelectedEducation}
          value={selectedEducation}
        >
          {interestedList.map((professional) => (
            professional.education.map((edu) => (
              <Select.Option key={edu.id_education} value={edu.course}>
                {edu.course} - {edu.institution}
              </Select.Option>
            ))
          ))}
        </Select>
        <Select
          showSearch
          placeholder="Filtrar por Experiência"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={setSelectedExperience}
          value={selectedExperience}
        >
          {interestedList.map((professional) => (
            professional.experience.map((exp) => (
              <Select.Option key={exp.id_experience} value={exp.position}>
                {exp.position} - {exp.company}
              </Select.Option>
            ))
          ))}
        </Select>
        <Select
          showSearch
          placeholder="Filtrar por Habilidades"
          optionFilterProp="children"
          className="mr-[15px]"
          onChange={setSelectedSkill}
          value={selectedSkill}
        >
          {interestedList.map((professional) => (
            professional.skills.map((skill) => (
              <Select.Option key={skill.id_skill} value={skill.skill}>
                {skill.skill}
              </Select.Option>
            ))
          ))}
        </Select>
      </div>
      <style.StyledUl>
        {filteredProfessionals.map((item) => (
          <style.StyledLi
            key={item.id_interested}
            onClick={() => handleUserClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <style.StyledImageContainer>
                <style.StyledImage
                  src={`http://localhost:3002/uploads/${item.profile_picture}`}
                  alt={item.full_name}
                />
              </style.StyledImageContainer>
              <div style={{ flexGrow: 1 }}>
                <style.StyledParagraph style={{ fontWeight: 'bold', fontSize: '25px' }}>
                  {item.full_name}
                </style.StyledParagraph>
                <style.StyledP style={{ margin: '5px 0' }}>
                  <FaEnvelope style={{ marginRight: '8px', marginTop: '4px' }} />
                  {item.email}
                </style.StyledP>
              </div>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>

      {selectedUser && (
        <Modal
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
          style={{ top: 10 }}
        >
          <Card>
            <div style={{ display: 'flex' }}>
              <style.StyledImage
                src={`http://localhost:3002/uploads/${selectedUser.profile_picture}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginRight: '25px',
                  marginLeft: '20px',
                  marginBottom: '20px'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '25px', fontWeight: 'bold', color: '#006b3f', marginTop: '15px' }}>
                  {selectedUser.full_name}
                </h1>
                <div style={{ cursor: 'pointer', fontSize: '16px' }}>
                  {selectedUser.email}
                </div>
              </div>
            </div>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Formação">
                {selectedUser.education.length > 0 ? (
                  <ul style={{ listStyleType: 'disc' }}>
                    {selectedUser.education.map((edu) => (
                      <li key={edu.id_education}>
                        {edu.course} - {edu.institution} ({formatDate(edu.start_date)} a {formatDate(edu.completion_date)})
                      </li>
                    ))}
                  </ul>
                ) : (
                  'Nenhuma formação encontrada.'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Experiência">
                {selectedUser.experience.length > 0 ? (
                  <ul style={{ listStyleType: 'disc' }}>
                    {selectedUser.experience.map((exp) => (
                      <li key={exp.id_experience}>
                        {exp.position} - {exp.company} ({formatDate(exp.start_date)} a {formatDate(exp.end_date)})
                      </li>
                    ))}
                  </ul>
                ) : (
                  'Nenhuma experiência encontrada.'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Habilidades">
                {selectedUser.skills.length > 0 ? (
                  <ul style={{ listStyleType: 'disc' }}>
                    {selectedUser.skills.map((skill) => (
                      <li key={skill.id_skill}>{skill.skill}</li>
                    ))}
                  </ul>
                ) : (
                  'Nenhuma habilidade encontrada.'
                )}
              </Descriptions.Item>
            </Descriptions>
            <Button
              onClick={() => handleContactClick(selectedUser.email)}
              style={{ marginTop: '20px', backgroundColor: '#006b3f', color: '#ffff', fontWeight: '500' }}
            >
              Entrar em Contato
            </Button>
          </Card>
        </Modal>
      )}
    </style.DivNotification>
  );
};

export default UserInterests;

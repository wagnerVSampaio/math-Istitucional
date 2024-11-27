import React, { useEffect, useState } from 'react';
import * as style from './style';
import { FaEnvelope } from 'react-icons/fa';
import { Card, Descriptions, Modal, Button, Select } from 'antd/lib';
import Search from 'antd/lib/input/Search';

const { Option } = Select;

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

  // Opções filtradas para Educação, Experiência e Habilidades
  const [experienceOptions, setExperienceOptions] = useState<{ label: string; value: string }[]>([]);
  const [educationOptions, setEducationOptions] = useState<{ label: string; value: string }[]>([]);
  const [skillsOptions, setSkillsOptions] = useState<{ label: string; value: string }[]>([]);

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

  const handleSearchExperience = (value: string) => {
    if (value) {
      const filtered = interestedList.flatMap((professional) =>
        professional.experience
          .filter(
            (exp) =>
              exp.position.toLowerCase().includes(value.toLowerCase()) ||
              exp.company.toLowerCase().includes(value.toLowerCase())
          )
          .map((exp) => ({
            label: `${exp.position} at ${exp.company}`,
            value: exp.id_experience.toString(),
          }))
      );
      setExperienceOptions(filtered);
    } else {
      setExperienceOptions([]);
    }
  };

  const handleSearchEducation = (value: string) => {
    if (value) {
      const filtered = interestedList.flatMap((professional) =>
        professional.education
          .filter(
            (edu) =>
              edu.course.toLowerCase().includes(value.toLowerCase()) ||
              edu.institution.toLowerCase().includes(value.toLowerCase())
          )
          .map((edu) => ({
            label: `${edu.course} at ${edu.institution}`,
            value: edu.id_education.toString(),
          }))
      );
      setEducationOptions(filtered);
    } else {
      setEducationOptions([]);
    }
  };

  const handleSearchSkills = (value: string) => {
    if (value) {
      const filtered = interestedList.flatMap((professional) =>
        professional.skills
          .filter((skill) => skill.skill.toLowerCase().includes(value.toLowerCase()))
          .map((skill) => ({
            label: skill.skill,
            value: skill.id_skill.toString(),
          }))
      );
      setSkillsOptions(filtered);
    } else {
      setSkillsOptions([]);
    }
  };

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
          onSearch={handleSearchEducation}
          value={selectedEducation}
          onChange={setSelectedEducation}
          style={{ width: 200 }}
        >
          {educationOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>

        <Select
          showSearch
          placeholder="Filtrar por Experiência"
          optionFilterProp="children"
          onSearch={handleSearchExperience}
          value={selectedExperience}
          onChange={setSelectedExperience}
          style={{ width: 200 }}
        >
          {experienceOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>

        <Select
          showSearch
          placeholder="Filtrar por Habilidades"
          optionFilterProp="children"
          onSearch={handleSearchSkills}
          value={selectedSkill}
          onChange={setSelectedSkill}
          style={{ width: 200 }}
        >
          {skillsOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
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
          title={selectedUser.full_name}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>Fechar</Button>,
            <Button key="contact" type="primary" onClick={() => handleContactClick(selectedUser.email)}>
              Contatar
            </Button>
          ]}
        >
          <Card>
            <Descriptions title="Detalhes">
              <Descriptions.Item label="E-mail">{selectedUser.email}</Descriptions.Item>
              <Descriptions.Item label="Formação">
                {selectedUser.education.map((edu) => (
                  <div key={edu.id_education}>
                    {edu.course} - {edu.institution} ({formatDate(edu.start_date)} - {formatDate(edu.completion_date)})
                  </div>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Experiência">
                {selectedUser.experience.map((exp) => (
                  <div key={exp.id_experience}>
                    {exp.position} at {exp.company} ({formatDate(exp.start_date)} - {formatDate(exp.end_date)})
                  </div>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Habilidades">
                {selectedUser.skills.map((skill) => (
                  <div key={skill.id_skill}>{skill.skill}</div>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Modal>
      )}
    </style.DivNotification>
  );
};

export default UserInterests;

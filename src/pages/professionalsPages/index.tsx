import React, { useEffect, useState } from 'react';
import * as style from '@/style/professionalsPages-style';
import { FaEnvelope } from 'react-icons/fa';
import { Card, Descriptions, Modal, Button, Select, Tag } from 'antd/lib';
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
  const [searchQuery, setSearchQuery] = useState<string>(''); // Armazena o valor do campo de busca
  const [searchQueries, setSearchQueries] = useState<string[]>([]); // Armazena todos os termos de pesquisa (tags)
  const [noResults, setNoResults] = useState<boolean>(false); // Para verificar se não há resultados
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);


  const URL_API = process.env.NEXT_PUBLIC_URL_API;

  const fetchProfessionals = async () => {
    try {
      const response = await fetch(`${URL_API}/api/userServer`);
      if (!response.ok) {
        throw new Error('Erro ao buscar profissionais');
      }
      const data = await response.json();
      setInterestedList(data);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const handleSearch = (value: string) => {
    if (value && !searchQueries.includes(value)) {
      setSearchQueries([...searchQueries, value]);  // Adiciona a busca como uma tag
      setSearchQuery('');  // Limpa o campo de busca
    }
  };


  const handleAddSearch = (value: string) => {
    // Se houver valor na busca, adicione o termo à lista de tags
    if (value && !searchQueries.includes(value)) {
      setSearchQueries([...searchQueries, value]); // Adiciona o novo termo à lista
      setSearchQuery(''); // Limpa o campo de pesquisa
    }
  };

  const handleRemoveSearch = (value: string) => {
    // Remove o termo da lista de tags
    setSearchQueries(searchQueries.filter(query => query !== value));
  };

  const filteredProfessionals = interestedList.filter((professional) => {
    // Verifica se o profissional corresponde a todos os filtros de pesquisa (tags)
    const matchesSearchQueries = searchQueries.every((query) => {
      const lowerQuery = query.toLowerCase();
      const nameMatch = professional.full_name.toLowerCase().includes(lowerQuery);
      const educationMatch = professional.education.some(
        (edu) =>
          edu.course.toLowerCase().includes(lowerQuery) ||
          edu.institution.toLowerCase().includes(lowerQuery)
      );
      const experienceMatch = professional.experience.some(
        (exp) =>
          exp.position.toLowerCase().includes(lowerQuery) ||
          exp.company.toLowerCase().includes(lowerQuery)
      );
      const skillsMatch = professional.skills.some((skill) =>
        skill.skill.toLowerCase().includes(lowerQuery)
      );

      return nameMatch || educationMatch || experienceMatch || skillsMatch;
    });

    // Filtra pela educação se selecionada
    const educationFilterMatch = selectedEducation
      ? professional.education.some(
        (edu) =>
          edu.course.toLowerCase().includes(selectedEducation.toLowerCase()) ||
          edu.institution.toLowerCase().includes(selectedEducation.toLowerCase())
      )
      : true;

    // Filtra pela experiência se selecionada
    const experienceFilterMatch = selectedExperience
      ? professional.experience.some(
        (exp) =>
          exp.position.toLowerCase().includes(selectedExperience.toLowerCase()) ||
          exp.company.toLowerCase().includes(selectedExperience.toLowerCase())
      )
      : true;

    // Filtra pelas habilidades se selecionada
    const skillFilterMatch = selectedSkill
      ? professional.skills.some((skill) =>
        skill.skill.toLowerCase().includes(selectedSkill.toLowerCase())
      )
      : true;

    // Retorna true se o profissional corresponder a todos os filtros
    return matchesSearchQueries && educationFilterMatch && experienceFilterMatch && skillFilterMatch;
  });


  // Verifica se há resultados para as tags de busca
  useEffect(() => {
    setNoResults(filteredProfessionals.length === 0 && searchQueries.length > 0);
  }, [filteredProfessionals, searchQueries]);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
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
    const subject = 'Contato sobre oportunidade de trabalho';
    const body = `Olá,\n\nGostaria de discutir uma oportunidade de trabalho com você. Por favor, entre em contato.\n\nAtenciosamente,\nUniversidade Federal do Oeste do Pará`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <style.DivNotification>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Search
          placeholder="Buscar por nome, formação, experiência ou habilidade"
          allowClear
          value={searchQuery} // Bind o valor do input ao estado searchQuery
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o valor da busca conforme o usuário digita
          onSearch={handleAddSearch} // Chama a função de pesquisa ao pressionar Enter
          style={{ width: '300px' }}
        />

        <Select
        allowClear 
          showSearch
          placeholder="Filtrar por Formação"
          optionFilterProp="children"
          className="mr-[15px] w-[200px]"
          onChange={(value) => setSelectedEducation(value)} // Seleção direta
          onSearch={(value) => setSelectedEducation(value)} // Atualização ao digitar
          value={selectedEducation}
          filterOption={(input, option) => {
            const children = option?.children as string | undefined;
            if (!children) return false;
            return children.toLowerCase().includes(input.toLowerCase());
          }}
        >
          {Array.from(
            new Set(
              interestedList.flatMap((professional) =>
                professional.education.map((edu) => edu.course)
              )
            )
          ).map((course, index) => (
            <Select.Option key={index} value={course}>
              {course}
            </Select.Option>
          ))}
        </Select>

        <Select
        allowClear 
          showSearch
          placeholder="Filtrar por Experiência"
          optionFilterProp="children"
          className="mr-[15px] w-[200px]"
          onChange={(value) => setSelectedExperience(value)} // Seleção direta
          onSearch={(value) => setSelectedExperience(value)} // Atualização ao digitar
          value={selectedExperience}
          filterOption={(input, option) => {
            const children = option?.children as string | undefined;
            if (!children) return false;
            return children.toLowerCase().includes(input.toLowerCase());
          }}
        >
          {Array.from(
            new Set(
              interestedList.flatMap((professional) =>
                professional.experience.map((exp) => exp.position)
              )
            )
          ).map((position, index) => (
            <Select.Option key={index} value={position}>
              {position}
            </Select.Option>
          ))}
        </Select>

        <Select
        allowClear 
          showSearch
          placeholder="Filtrar por Habilidades"
          optionFilterProp="children"
          className="mr-[15px] w-[200px]"
          onChange={(value) => setSelectedSkill(value)} // Seleção direta
          onSearch={(value) => setSelectedSkill(value)} // Atualização ao digitar
          value={selectedSkill}
          filterOption={(input, option) => {
            const children = option?.children as string | undefined;
            if (!children) return false;
            return children.toLowerCase().includes(input.toLowerCase());
          }}
        >
          {Array.from(
            new Set(
              interestedList.flatMap((professional) =>
                professional.skills.map((skill) => skill.skill)
              )
            )
          ).map((skill, index) => (
            <Select.Option key={index} value={skill}>
              {skill}
            </Select.Option>
          ))}
        </Select>

      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {searchQueries.map((query, index) => (
          <Tag
            key={index}
            closable
            onClose={() => handleRemoveSearch(query)} // Remove a tag ao clicar no "x"
            color="green"
            style={{
              marginBottom: '20px', // Espaço fora do elemento
              paddingTop: '10px', // Espaçamento interno no topo
              paddingRight: '15px', // Espaçamento interno à direita
              paddingBottom: '10px', // Espaçamento interno na parte inferior
              paddingLeft: '15px', // Espaçamento interno à esquerda
              fontSize: '16px',
            }}
          >
            {query}
          </Tag>
        ))}
      </div>
      <style.StyledUl>
        {filteredProfessionals.length === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: '272727' }}>
            Nenhum resultado encontrado
          </p>
        ) : (
          filteredProfessionals.map((item) => (
            <style.StyledLi
              key={item.id_interested}
              onClick={() => handleUserClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <style.StyledImageContainer>
                  <style.StyledImage
                    src={`${URL_API}/uploads/${item.profile_picture}`}
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
          ))
        )}
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
                src={`${URL_API}/uploads/${selectedUser.profile_picture}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginRight: '25px',
                  marginLeft: '20px',
                  marginBottom: '20px',
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

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
  color: #272727;
`;

const CompanyName = styled.span`
  font-weight: bold;
  color: #006B3F;
`;

const Period = styled.span`
  font-style: italic;
  color: black;
  margin-top: 5px;
`;

const experiences = [
  { company: 'Empresa ABC', period: '2018 a 2022', role: 'Desenvolvedor Full-Stack' },
  { company: 'Tech Solutions', period: '2016 a 2018', role: 'Engenheiro de Software' },
  { company: 'Startup XYZ', period: '2014 a 2016', role: 'Desenvolvedor Front-End' },
  { company: 'Global Corp', period: '2022 a presente', role: 'Gerente de Projetos' },
  { company: 'E-commerce Experts', period: '2020 a 2022', role: 'Líder de Desenvolvimento' },
  { company: 'EduTech Solutions', period: '2017 a 2020', role: 'Desenvolvedor Back-End' },
  { company: 'FinTech Innovations', period: '2015 a 2017', role: 'Analista de Sistemas' },
  { company: 'Retail Masters', period: '2019 a 2021', role: 'Consultor de TI' },
  { company: 'Cloud Solutions', period: '2021 a presente', role: 'Arquiteto de Software' },
  { company: 'AI Innovations', period: '2019 a 2022', role: 'Cientista de Dados' }
];

const ExperiencePage: React.FC = () => {
  return (
    <Container>
      <Title>Experiências</Title>
      <List>
        {experiences.map((experience, index) => (
          <ListItem key={index}>
            <CompanyName>{experience.role} </CompanyName>
            <Period><span>{experience.company}</span> - {experience.period}</Period>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExperiencePage;

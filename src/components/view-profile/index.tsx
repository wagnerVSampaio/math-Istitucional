/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  ButtonLabel,
  ImageCover,
  DivTop,
  ImageWrapper,
  UploadButton,
  ButtonCoverLabel,
  DivParagraph,
  DivIconShare,
  DivBio,
  DivP,
  Container,
  Title,
  List,
  ListItem,
  CompanyName,
  Period,
  Wrapper,
  Heading,
  EducationItem,
  DegreeTitle,
  TimePeriod,
  EducationList,
  SkillsContainer,
  SkillItem,
  SkillTitle,
  ProgressBarContainer,
  ProgressBar,
  SkillPercentage,
  GeneralItens,
  ArrowDown,
  ArrowUp
} from "./style";
import { FaCamera } from "react-icons/fa";
import { FaShareAltSquare } from "react-icons/fa";


type FieldType = {
  id: number;
  name: string;
  profilePhoto: string;
  coverPhoto: string;
  biography: string;
  skills: string;
  education: string;
  campus: string;
  degree: string;
};

interface Experience {
  role: string;
  company: string;
  period: string;
}

const educationData = [
  { degree: 'Bacharel em Ciência da Computação', institution: 'Universidade ABC', period: '2014 a 2018' },
  { degree: 'Mestrado em Engenharia de Software', institution: 'Universidade XYZ', period: '2019 a 2021' }
];

const skillsData = [
  { skill: 'JavaScript', level: 90 },
  { skill: 'React', level: 85 },
  { skill: 'Node.js', level: 80 },
  { skill: 'TypeScript', level: 75 },
  { skill: 'CSS', level: 70 },
  { skill: 'HTML', level: 95 },
  { skill: 'Python', level: 60 },
  { skill: 'SQL', level: 65 },
  { skill: 'Git', level: 85 },
  { skill: 'Docker', level: 50 }
];

const ViewProfile: React.FC<{ id: number, profileLinkView: string }> = ({ id, profileLinkView }) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [bioText, setBioText] = useState<string | undefined>("");

  {/*ALTERA FOTO DE PERFIL*/}
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  {/*ALTERA A FOTO DE CAPA*/}
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const profileLink = `${window.location.origin}/profile/${id}`;

  {/*COMPARTILHA O PERFIL*/}
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Perfil",
          text: "Venha ver o meu perfil na Match Institucional:",
          url: profileLink,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(profileLink);
        alert("Link do perfil copiado para a área de transferência!");
      } catch (error) {
        console.error("Erro ao copiar o link:", error);
      }
    }
  };

  {/*LISTA TEMPORARIA*/}
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "Empresa ABC",
      period: "2018 a 2022",
      role: "Desenvolvedor Full-Stack",
    },
    {
      company: "Tech Solutions",
      period: "2016 a 2018",
      role: "Engenheiro de Software",
    },
    {
      company: "Startup XYZ",
      period: "2014 a 2016",
      role: "Desenvolvedor Front-End",
    },
    {
      company: "Global Corp",
      period: "2022 a presente",
      role: "Gerente de Projetos",
    },
    {
      company: "E-commerce Experts",
      period: "2020 a 2022",
      role: "Líder de Desenvolvimento",
    },
    {
      company: "EduTech Solutions",
      period: "2017 a 2020",
      role: "Desenvolvedor Back-End",
    },
    {
      company: "FinTech Innovations",
      period: "2015 a 2017",
      role: "Analista de Sistemas",
    },
    { company: "Retail Masters", period: "2019 a 2021", role: "Consultor de TI" },
    {
      company: "Cloud Solutions",
      period: "2021 a presente",
      role: "Arquiteto de Software",
    },
    {
      company: "AI Innovations",
      period: "2019 a 2022",
      role: "Cientista de Dados",
    },
  ]);

  const [isFormacaoExpanded, setIsFormacaoExpanded] = useState(false);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);

  {/* EXPANDIR FORMAÇÃO */}
  const toggleExpandFormacao = () => {
    setIsFormacaoExpanded(!isFormacaoExpanded);
  };

  {/* EXPANDIR EXPERIÊNCIA */}
  const toggleExpandExperience = () => {
    setIsExperienceExpanded(!isExperienceExpanded);
  };

  {/*EXPANDIR HABILIDADES*/}
  const toggleExpandSkills = () => {
    setIsSkillsExpanded(!isSkillsExpanded);
  };
  return (
    <>
      <GeneralItens>
        <DivTop>
          <ImageCover className="relative">
            <img
              src={coverImage || "/cover.png"}
              alt="Cover"
              className="w-full h-[100px] object-cover"
            />
            <UploadButton
              type="file"
              accept="image/*"
              id="coverImageUpload"
              onChange={handleCoverImageChange}
            />
            <ButtonCoverLabel htmlFor="coverImageUpload">
              <FaCamera />
              <span className="ml-2">Adicionar foto de capa</span>
            </ButtonCoverLabel>
          </ImageCover>

          <ImageWrapper className="relative">
            <img
              src={profileImage || "/profile.png"}
              alt="Profile"
              className="w-full h-[150px] object-cover"
            />
            <UploadButton
              type="file"
              accept="image/*"
              id="profileImageUpload"
              onChange={handleProfileImageChange}
            />
            <ButtonLabel htmlFor="profileImageUpload">
              <FaCamera />
            </ButtonLabel>
          </ImageWrapper>

          <DivParagraph>
            <p>Nome completo do usuário</p>
            <DivIconShare>
              <FaShareAltSquare onClick={handleShare} />
            </DivIconShare>
          </DivParagraph>

         <DivBio>
            <DivP>
                <div>
                  <p className="font-bold">Biografia:</p>
                  <p
                    style={{ color: "#272727", opacity: "0.8", padding: "10px" }}
                  >
                    {bioText ||
                      "Experimente escrever uma curta biografia sobre você, incluindo suas principais conquistas, habilidades e objetivos de carreira."}
                  </p>
                  
                </div>
            </DivP>
          </DivBio>
        </DivTop>

        <Wrapper>
          <Heading>Formação <div className="flex gap-4">
            {isFormacaoExpanded ? (
            <ArrowUp onClick={toggleExpandFormacao} style={{ cursor: 'pointer' }} />
          ) : (
            <ArrowDown onClick={toggleExpandFormacao} style={{ cursor: 'pointer' }} />
          )}</div></Heading>
          <EducationList>
            {educationData.slice(0, isFormacaoExpanded ? educationData.length : 2).map((edu) => (
              <EducationItem>
                <DegreeTitle>{edu.degree}</DegreeTitle>
                <TimePeriod>{edu.institution} - {edu.period}</TimePeriod>
              </EducationItem>
            ))}
          </EducationList>
        </Wrapper>

        <Container>
          <Title>
            Experiências
            <div className="flex gap-4">
              {isExperienceExpanded ? (
                <ArrowUp onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
              ) : (
                <ArrowDown onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
              )}
            </div>
          </Title>
          <List>
            {experiences.slice(0, isExperienceExpanded ? experiences.length : 2).map((experience) => (
              <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                <>
                      <CompanyName>
                        {experience.role}
                      </CompanyName>
                      <Period>
                        <span>{experience.company}</span> - {experience.period}
                      </Period>
                    </>
              </ListItem>
            ))}
          </List>
        </Container>

        <SkillsContainer>
          <Title>
            Habilidades
            <div className="flex gap-4">
              {isSkillsExpanded ? (
                <ArrowUp onClick={toggleExpandSkills} style={{ cursor: 'pointer' }} />
              ) : (
                <ArrowDown onClick={toggleExpandSkills} style={{ cursor: 'pointer' }} />
              )}
            </div>
          </Title>

          {/* Renderização das habilidades */}
          {skillsData.slice(0, isSkillsExpanded ? skillsData.length : 2).map(({ skill, level }) => (
            <SkillItem key={skill}>
              <SkillTitle>{skill}</SkillTitle>
              <div className="flex">
                <div>
                  <ProgressBarContainer>
                    <ProgressBar percentage={level} />
                  </ProgressBarContainer>
                </div>
                <SkillPercentage>{level}%</SkillPercentage>
              </div>
            </SkillItem>
          ))}

        </SkillsContainer>
      </GeneralItens>
    </>
  );
};

export default ViewProfile;

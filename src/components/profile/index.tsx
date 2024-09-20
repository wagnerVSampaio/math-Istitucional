/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  ButtonLabel,
  ImageCover,
  DivTop,
  ImageWrapper,
  UploadButton,
  ButtonCoverLabel,
  DivButton,
  DivParagraph,
  EditProfileButton,
  ProfileButton,
  DivIcon,
  DivIconShare,
  DivBio,
  DivEdit,
  DivSave,
  DivP,
  Textarea,
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
  Star,
} from "./style";
import { FaCamera } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaShareAltSquare } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import Link from "next/link";

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

const experiences = [
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
];

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


const ProfileContainer: React.FC<{ id: number }> = ({ id }) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState<string | undefined>("");

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    setIsEditingBio(false);
  };

  const profileLink = `${window.location.origin}/profile/${id}`;

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

  return (
    <>
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

        <DivButton>
          <ProfileButton>Favoritos <Star/></ProfileButton>
          <Link href={"../expandable"}>
            <EditProfileButton>Editar perfil</EditProfileButton>
          </Link>
          <DivIcon>
            <IoSettingsSharp />
          </DivIcon>
        </DivButton>

        <DivBio>
          <DivP>
            {isEditingBio ? (
              <div>
                <p>
                  <span className="font-bold">Biografia:</span>
                  <Textarea
                    placeholder="Experimente escrever uma curta biografia sobre você, incluindo suas principais conquistas, habilidades e objetivos de carreira."
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                  />
                </p>
                <DivSave onClick={handleSaveBio}>
                  <AiOutlineSave />
                </DivSave>
              </div>
            ) : (
              <div>
                <p className="font-bold">Biografia:</p>
                <p
                  style={{ color: "#272727", opacity: "0.8", padding: "10px" }}
                >
                  {bioText ||
                    "Experimente escrever uma curta biografia sobre você, incluindo suas principais conquistas, habilidades e objetivos de carreira."}
                </p>
                <DivEdit onClick={handleEditBio}>
                  <MdEditNote />
                </DivEdit>
              </div>
            )}
          </DivP>
        </DivBio>
      </DivTop>

      <Wrapper>
      <Heading>Formação</Heading>
      <EducationList>
        {educationData.map((edu, index) => (
          <EducationItem key={index}>
            <DegreeTitle>{edu.degree}</DegreeTitle>
            <TimePeriod>{edu.institution} - {edu.period}</TimePeriod>
          </EducationItem>
        ))}
      </EducationList>
    </Wrapper>

      <Container>
        <Title>Experiências</Title>
        <List>
          {experiences.map((experience, index) => (
            <ListItem key={index}>
              <CompanyName>{experience.role} </CompanyName>
              <Period>
                <span>{experience.company}</span> - {experience.period}
              </Period>
            </ListItem>
          ))}
        </List>
      </Container>

      <SkillsContainer>
      <Title>Habilidades</Title>
      {skillsData.map(({ skill, level }) => (
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
    </>
  );
};

export default ProfileContainer;

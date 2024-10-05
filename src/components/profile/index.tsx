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
  GeneralItens,
  Add,
  Editing,
  ArrowDown,
  ArrowUp,
  Delete,
  Save,
  GoBack,
  Profile,
  ModalOverlay,
  ModalContent,
  CloseButton,
  Input,
  AddExpButton,
  H2Exp
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

interface Experience {
  role: string;
  company: string;
  period: string;
}

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


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpandFormacao = () => {
    setIsExpanded(prev => !prev);
  };

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedExperience, setEditedExperience] = useState<Experience | null>(null);

  const toggleExpandExperience = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedExperience(experiences[index]);
  };

  const handleDelete = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && editedExperience) {
      const updatedExperiences = experiences.map((exp, index) =>
        index === editIndex ? editedExperience : exp
      );
      setExperiences(updatedExperiences);
      setEditIndex(null);
      setEditedExperience(null);
    }
  };

  const toggleExpandSkills = () => {
    setIsExpanded(prev => !prev);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddExperience = (experience: Experience) => {
    setExperiences([...experiences, experience]);
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

          <DivButton>
            <Link href={"../favoritesPages"}><ProfileButton>Favoritos <Star /></ProfileButton></Link>
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
          <Heading>Formação <div className="flex gap-4"><Add /><Editing />{isExpanded ? (
            <ArrowUp onClick={toggleExpandFormacao} style={{ cursor: 'pointer' }} />
          ) : (
            <ArrowDown onClick={toggleExpandFormacao} style={{ cursor: 'pointer' }} />
          )}</div></Heading>
          <EducationList>
            {educationData.slice(0, isExpanded ? educationData.length : 2).map((edu, index) => (
              <EducationItem key={index}>
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
              <button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}><Add /></button>
              {isExpanded ? (
                <ArrowUp onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
              ) : (
                <ArrowDown onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
              )}
            </div>
          </Title>
          <List>
            {experiences.slice(0, isExpanded ? experiences.length : 2).map((experience, index) => (
              <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {editIndex === index ? (
                    <>
                      <Profile
                        type="text"
                        style={{ width: "350px" }}
                        value={editedExperience?.role || ''}
                        onChange={(e) => setEditedExperience({ ...editedExperience!, role: e.target.value })}
                        placeholder="Cargo"
                      />
                      <div className="flex">
                        <Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px' }}
                          value={editedExperience?.company || ''}
                          onChange={(e) => setEditedExperience({ ...editedExperience!, company: e.target.value })}
                          placeholder="Empresa"
                        />
                        <Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={editedExperience?.period || ''}
                          onChange={(e) => setEditedExperience({ ...editedExperience!, period: e.target.value })}
                          placeholder="Período"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <CompanyName onClick={() => handleEdit(index)}>
                        {experience.role}
                      </CompanyName>
                      <Period>
                        <span>{experience.company}</span> - {experience.period}
                      </Period>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndex === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndex(null); setEditedExperience(null); }}><GoBack /></button>
                      <button style={{ cursor: 'pointer' }} onClick={handleSaveEdit}><Save /></button>
                    </>
                  )}
                  <button style={{ cursor: 'pointer' }} onClick={() => handleDelete(index)}><Delete /></button>
                </div>
              </ListItem>
            ))}
          </List>

          {isModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <H2Exp>Adicionar nova experiência</H2Exp>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newExperience = {
                      role: (e.target as any).role.value,
                      company: (e.target as any).company.value,
                      period: (e.target as any).period.value,
                    };
                    handleAddExperience(newExperience);
                    setIsModalOpen(false);
                  }}
                >
                  <Input
                    type="text"
                    name="role"
                    placeholder="Cargo"
                    required
                  />
                  <Input
                    type="text"
                    name="company"
                    placeholder="Empresa"
                    required
                  />
                  <Input
                    type="text"
                    name="period"
                    placeholder="Período"
                    required
                  />
                  <div className="flex align-center justify-center">
                    <CloseButton onClick={() => setIsModalOpen(false)}>Fechar</CloseButton>
                    <AddExpButton type="submit">Adicionar</AddExpButton>
                  </div>
                </form>
              </ModalContent>
            </ModalOverlay>
          )}
        </Container>

        <SkillsContainer>
          <Title>
            Habilidades
            <div className="flex gap-4">
              <Add />
              <Editing />
              {isExpanded ? (
                <ArrowUp onClick={toggleExpandSkills} style={{ cursor: 'pointer' }} />
              ) : (
                <ArrowDown onClick={toggleExpandSkills} style={{ cursor: 'pointer' }} />
              )}
            </div>
          </Title>

          {/* Renderização das habilidades */}
          {skillsData.slice(0, isExpanded ? skillsData.length : 2).map(({ skill, level }) => (
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

export default ProfileContainer;

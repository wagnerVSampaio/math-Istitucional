/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
  EducationList,
  SkillsContainer,
  SkillTitle,
  ProgressBarContainer,
  ProgressBar,
  SkillPercentage,
  Star,
  GeneralItens,
  Add,
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
import { Tooltip } from "antd/lib";

type UserData = {
  id_user: number;
  full_name: string;
  profile_picture: string;
  cover_photo: string;
  biography: string;
  skills: string;
  education: string;
  campus: string;
  course: string;
};


interface Education {
  degree: string;
  institution: string;
  period: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
}

interface Skills {
  id_job: number;
  skill: string;
  number: number;
}

const ProfileContainer: React.FC<{ id: number }> = ({ id }) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState<string | undefined>("");
  const [editIndexExperience, setEditIndexExperience] = useState<number | null>(null);
  const [editedExperience, setEditedExperience] = useState<Experience | null>(null);
  const [editIndexEducations, setEditIndexEducations] = useState<number | null>(null);
  const [editedEducations, setEditedEducations] = useState<Education | null>(null);
  const [isModalOpenEdu, setIsModalOpenEdu] = useState(false);
  const [isModalOpenExperience, setIsModalOpenExperience] = useState(false);
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  {/*ALTERA FOTO DE PERFIL */ }
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  {/*ALTERA FOTO DE CAPA*/ }
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  {/*EDITA BIO*/ }
  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  {/*SALVA A BIO*/ }
  const handleSaveBio = () => {
    setIsEditingBio(false);
  };

  const profileLink = `${window.location.origin}/profile/${id}`;

  {/*COMPARTILHA O PERFIL*/ }
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




  {/*LISTA TEMPORARIA DA EXPERIENCIA*/ }
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

  {/* EXPANDIR EXPERIÊNCIA */ }
  const toggleExpandExperience = () => {
    setIsExperienceExpanded(!isExperienceExpanded);
  };

  {/*EDITA EXPERIENCIA*/ }
  const handleEditExperience = (index: number) => {
    setEditIndexExperience(index);
    setEditedExperience(experiences[index]);
  };

  {/*DELETA EXPERIENCIA*/ }
  const handleDeleteExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  {/*SALVA EXPERIENCIA*/ }
  const handleSaveEditExperience = () => {
    if (editIndexExperience !== null && editedExperience) {
      const updatedExperiences = experiences.map((exp, index) =>
        index === editIndexExperience ? editedExperience : exp
      );
      setExperiences(updatedExperiences);
      setEditIndexExperience(null);
      setEditedExperience(null);
    }
  };

  {/*ADICIONA EXPERIENCIA*/ }
  const handleAddExperience = (experience: Experience) => {
    setExperiences([...experiences, experience]);
  };




  {/*LISTA TEMPORARIA DA FORMACAO*/ }
  const [educations, setEducations] = useState<Education[]>([
    { degree: 'Bacharel em Ciência da Computação', institution: 'Universidade ABC', period: '2014 a 2018' },
    { degree: 'Mestrado em Engenharia de Software', institution: 'Universidade XYZ', period: '2019 a 2021' }
  ]);

  {/*EDITA FORMAÇÃO*/ }
  const handleEditEducation = (index: number) => {
    setEditIndexEducations(index);
    setEditedEducations(educations[index]);
  };

  {/*DELETA FORMAÇÃO*/ }
  const handleDeleteEducation = (index: number) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducations(newEducations);
  };

  {/*SALVA FORMAÇÃO*/ }
  const handleSaveEditEducation = () => {
    if (editIndexEducations !== null && editedEducations) {
      const updatedEducations = educations.map((edu, index) =>
        index === editIndexEducations ? editedEducations : edu
      );
      setEducations(updatedEducations);
      setEditIndexEducations(null);
      setEditedEducations(null);
    }
  };

  {/* EXPANDIR FORMAÇÃO */ }
  const toggleExpandEducation = () => {
    setIsEducationExpanded(!isEducationExpanded);
  };

  {/*ADICIONA FORMAÇÃO*/ }
  const handleAddEducation = (education: Education) => {
    setEducations([...educations, education]);
  };





  const [skills, setSkills] = useState<Skills[]>([]);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [editIndexSkills, setEditIndexSkills] = useState<number | null>(null);
  const [editedSkills, setEditedSkills] = useState<Skills | null>(null);
  const [isModalOpenSkills, setIsModalOpenSkills] = useState(false);
  const [newSkill, setNewSkill] = useState<Skills>({ skill: '', number: 0, id_job: 0 });

  // Função para adicionar uma nova habilidade
  const handleAddSkills = async (newSkill: Skills) => {
    try {
      // Recupera os dados do usuário logado do sessionStorage
      const data = sessionStorage.getItem("userData");
      if (!data) {
        throw new Error("Usuário não está logado");
      }
  
      // Converte os dados do usuário armazenados em JSON para um objeto
      const userData = JSON.parse(data);
      const idUser = userData.id_user; // Obtém o id_user do usuário logado
  
      // Inclui o id_user no objeto newSkill
      const skillWithUser = { ...newSkill, id_user: idUser };
  
      // Fazendo a requisição para adicionar a habilidade ao banco de dados
      const response = await fetch('http://localhost:3002/api/createSkill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillWithUser), // Enviando o objeto skill com id_user como JSON
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar habilidade');
      }
  
      // Adiciona a nova habilidade ao estado local
      const addedSkill = await response.json(); // Supondo que a resposta seja o objeto adicionado
      setSkills([...skills, addedSkill]);
      setIsModalOpenSkills(false); // Fecha o modal após adicionar
    } catch (error) {
      console.error('Erro:', error);
      // Adicionar uma notificação ou alerta para o usuário, se necessário
    }
  };
  
 /*  const handleSubmitNewSkill = () => {
    if (newSkill.skill && newSkill.number && newSkill.id_job) {
      handleAddSkills(newSkill);
      // Limpar os campos após adicionar
      setNewSkill({ skill: '', number: 0, id_job: 0 });
    }
  }; */


   // Função para buscar as habilidades do usuário
   const idSkills = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
        console.error('Usuário não encontrado.');
        return;
    }

    try {
        const userData = JSON.parse(data);
        const idUser = userData.id_user; // Obtém o id_user do sessionStorage

        // Fazendo a requisição para buscar as habilidades do usuário específico
        const response = await fetch(`http://localhost:3002/api/idSkill/${idUser}`); // Alterado para incluir id_user na URL
        
        if (!response.ok) {
            throw new Error('Erro ao buscar habilidades: ' + response.statusText);
        }

        const skillsData = await response.json(); // Supondo que a resposta seja um array de habilidades
        setSkills(skillsData); // Atualiza o estado com as habilidades obtidas
    } catch (error) {
        console.error('Erro ao buscar habilidades:', error);
    }
};

// Efeito para buscar habilidades quando o componente é montado
useEffect(() => {
    idSkills();
}, []);


  const toggleExpandSkills = () => {
    setIsSkillsExpanded(!isSkillsExpanded);
  };



  const handleDeleteSkills = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleEditSkills = (index: number) => {
    setEditIndexSkills(index);
    setEditedSkills(skills[index]);
  };
  const handleSaveEditSkills = async () => {
    if (editIndexSkills !== null && editedSkills) {
      try {
        // Fazendo a requisição para atualizar a habilidade no banco de dados
        const response = await fetch(`http://localhost:3002/api/updateSkill/${editedSkills.id_job}`, {
          method: 'PUT', // Usando o método PUT para atualizar
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedSkills), // Enviando os dados editados como JSON
        });
  
        if (!response.ok) {
          throw new Error('Erro ao editar habilidade');
        }
  
        // Obtém a habilidade atualizada da resposta
        const updatedSkill = await response.json(); 
  
        // Atualiza a lista de habilidades no estado local
        const updatedSkills = skills.map((skill, index) =>
          index === editIndexSkills ? updatedSkill : skill
        );
  
        setSkills(updatedSkills); // Atualiza o estado com a habilidade editada
        setEditIndexSkills(null); // Reseta o índice de edição
        setEditedSkills(null); // Reseta as habilidades editadas
      } catch (error) {
        console.error('Erro:', error);
        // Você pode adicionar uma notificação ou alerta para o usuário
      }
    }
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
            <p>{userData?.full_name}</p>
            <DivIconShare>
              <Tooltip title="Compartilhar o perfil" placement="left">
                <FaShareAltSquare />
              </Tooltip>
            </DivIconShare>
          </DivParagraph>

          <DivButton>
            <ProfileButton disabled>Favoritos <Star /></ProfileButton>
            <Link href={"../expandable"}>
              <EditProfileButton>Editar perfil</EditProfileButton>
            </Link>
            <DivIcon>
              <Tooltip title="Configurações da conta" placement="left">
                <IoSettingsSharp />
              </Tooltip>
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
                  <Tooltip title="Salvar biografia" placement="left">
                    <DivSave onClick={handleSaveBio}>
                      <AiOutlineSave />
                    </DivSave>
                  </Tooltip>
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
                  <Tooltip title="Editar biografia" placement="left">
                    <DivEdit onClick={handleEditBio}>
                      <MdEditNote />
                    </DivEdit>
                  </Tooltip>
                </div>
              )}
            </DivP>
          </DivBio>
        </DivTop>

        <Wrapper>
          <Heading>Formação <div className="flex gap-4"><button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenEdu(true)}>
            <Tooltip title="Adicionar nova formação">
              <Add />
            </Tooltip>
          </button>
            {isEducationExpanded ? (
              <Tooltip title="Esconder formações adicionadas">
                <ArrowUp onClick={toggleExpandEducation} style={{ cursor: 'pointer' }} />
              </Tooltip>

            ) : (
              <Tooltip title="Mostrar todas as formações adicionadas">
                <ArrowDown onClick={toggleExpandEducation} style={{ cursor: 'pointer' }} />
              </Tooltip>
            )}</div></Heading>
          <EducationList>

            {educations.slice(0, isEducationExpanded ? educations.length : 2).map((education, index) => (
              <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {editIndexEducations === index ? (
                    <>
                      <Profile
                        type="text"
                        style={{ width: "350px" }}
                        value={editedEducations?.degree || ''}
                        onChange={(e) => setEditedEducations({ ...editedEducations!, degree: e.target.value })}
                        placeholder="Curso"
                      />
                      <div className="flex">
                        <Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px' }}
                          value={editedEducations?.institution || ''}
                          onChange={(e) => setEditedEducations({ ...editedEducations!, institution: e.target.value })}
                          placeholder="Universidade"
                        />
                        <Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={editedEducations?.period || ''}
                          onChange={(e) => setEditedEducations({ ...editedEducations!, period: e.target.value })}
                          placeholder="Período"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Dê duplo click para editar">
                      <CompanyName onClick={() => handleEditEducation(index)}>
                        {education.degree}
                      </CompanyName>
                      </Tooltip>
                      <Period>
                        <span>{education.institution}</span> - {education.period}
                      </Period>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndexEducations === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexEducations(null); setEditedEducations(null); }}><GoBack /></button>
                      <Tooltip title="Salvar alterações"><button style={{ cursor: 'pointer' }} onClick={handleSaveEditEducation}><Save /></button></Tooltip>
                    </>
                  )}
                  <Tooltip title="Excluir formação" placement="left">
                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteEducation(index)}><Delete /></button>
                  </Tooltip>
                </div>
              </ListItem>
            ))}
          </EducationList>
          {isModalOpenEdu && (
            <ModalOverlay>
              <ModalContent>
                <H2Exp>Adicionar nova formação</H2Exp>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newEducation = {
                      degree: (e.target as any).degree.value,
                      institution: (e.target as any).institution.value,
                      period: (e.target as any).period.value,
                    };
                    handleAddEducation(newEducation);
                    setIsModalOpenEdu(false);
                  }}
                >
                  <Input
                    type="text"
                    name="degree"
                    placeholder="Curso"
                    required
                  />
                  <Input
                    type="text"
                    name="institution"
                    placeholder="Universidade"
                    required
                  />
                  <Input
                    type="text"
                    name="period"
                    placeholder="Período"
                    required
                  />
                  <div className="flex align-center justify-center">
                    <CloseButton onClick={() => setIsModalOpenEdu(false)}>Fechar</CloseButton>
                    <AddExpButton type="submit">Adicionar</AddExpButton>
                  </div>
                </form>
              </ModalContent>
            </ModalOverlay>
          )}
        </Wrapper>

        <Container>
          <Title>
            Experiências
            <div className="flex gap-4">
              <button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenExperience(true)}><Tooltip title="Adicionar nova experiência">
                <Add />
              </Tooltip></button>
              {isExperienceExpanded ? (
                <Tooltip title="Esconder experiências adicionadas">
                  <ArrowUp onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Mostrar todas as experiências adicionadas">
                  <ArrowDown onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
                </Tooltip>
              )}
            </div>
          </Title>
          <List>
            {experiences.slice(0, isExperienceExpanded ? experiences.length : 2).map((experience, index) => (
              <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {editIndexExperience === index ? (
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
                     <Tooltip title="Dê duplo click para editar">
                      <CompanyName onClick={() => handleEditExperience(index)}>
                        {experience.role}
                      </CompanyName>
                      </Tooltip>
                      <Period>
                        <span>{experience.company}</span> - {experience.period}
                      </Period>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndexExperience === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexExperience(null); setEditedExperience(null); }}><GoBack /></button>
                      <Tooltip title="Salvar alterações">
                      <button style={{ cursor: 'pointer' }} onClick={handleSaveEditExperience}><Save /></button></Tooltip>
                    </>
                  )}
                  <Tooltip title="Excluir experiência" placement="left">
                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteExperience(index)}><Delete /></button>
                  </Tooltip>
                </div>
              </ListItem>
            ))}
          </List>

          {isModalOpenExperience && (
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
                    setIsModalOpenExperience(false);
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
                    <CloseButton onClick={() => setIsModalOpenExperience(false)}>Fechar</CloseButton>
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
          <button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenSkills(true)}>
            <Tooltip title="Adicionar nova habilidade">
              <Add />
            </Tooltip>
          </button>
          {isSkillsExpanded ? (
            <Tooltip title="Esconder habilidades adicionadas">
              <ArrowUp onClick={() => setIsSkillsExpanded(false)} style={{ cursor: 'pointer' }} />
            </Tooltip>
          ) : (
            <Tooltip title="Mostrar todas as habilidades adicionadas">
              <ArrowDown onClick={() => setIsSkillsExpanded(true)} style={{ cursor: 'pointer' }} />
            </Tooltip>
          )}
        </div>
      </Title>

      {/* Renderização das habilidades */}
      {skills.slice(0, isSkillsExpanded ? skills.length : 2).map((skillItem, index) => (
        <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {editIndexSkills === index ? (
              <>
                <Profile
                  type="text"
                  style={{ width: "350px" }}
                  value={editedSkills?.skill || ''}
                  onChange={(e) => setEditedSkills({ ...editedSkills!, skill: e.target.value })}
                  placeholder="Habilidade"
                />
                <div className="flex">
                  <Profile
                    type="number"
                    style={{ width: "200px", marginTop: '4px' }}
                    value={editedSkills?.number || ''}
                    onChange={(e) => setEditedSkills({ ...editedSkills!, number: Number(e.target.value) })}
                    placeholder="Nível de conhecimento"
                  />
                </div>
              </>
            ) : (
              <>
                <Tooltip title="Dê duplo click para editar">
                  <SkillTitle onClick={() => handleEditSkills(index)}>
                    {skillItem.skill}
                  </SkillTitle>
                </Tooltip>
                <div className="flex">
                  <div>
                    <ProgressBarContainer>
                      <ProgressBar percentage={skillItem.number} />
                    </ProgressBarContainer>
                  </div>
                  <SkillPercentage>{skillItem.number}%</SkillPercentage>
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
            {editIndexSkills === index && (
              <>
                <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexSkills(null); setEditedSkills(null); }}>
                  <GoBack />
                </button>
                <Tooltip title="Salvar alterações">
                  <button style={{ cursor: 'pointer' }} onClick={handleSaveEditSkills}>
                    <Save />
                  </button>
                </Tooltip>
              </>
            )}
            <Tooltip title="Excluir habilidade">
              <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteSkills(index)}>
                <Delete />
              </button>
            </Tooltip>
          </div>
        </ListItem>
      ))}

      {isModalOpenSkills && (
        <ModalOverlay>
          <ModalContent>
            <H2Exp>Adicionar nova habilidade</H2Exp>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Previne o comportamento padrão do formulário
                const newSkills = {
                  skill: (e.target as any).skill.value,
                  number: Number((e.target as any).number.value), // Certifique-se de usar a propriedade correta e converter para número
                  id_job: 0 
                };
                handleAddSkills(newSkills); // Passa o novo objeto de habilidade para a função
                setIsModalOpenSkills(false); // Fecha o modal
              }}
            >
              <Input
                type="text"
                name="skill"
                placeholder="Habilidade"
                required
              />
              <Input
                type="number"
                name="number"
                placeholder="Nível de conhecimento"
                required
              />
              <div className="flex align-center justify-center">
                <CloseButton onClick={() => setIsModalOpenSkills(false)}>Fechar</CloseButton>
                <AddExpButton type="submit">Adicionar</AddExpButton>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
       </SkillsContainer>
      </GeneralItens>
    </>
  );
};

export default ProfileContainer;
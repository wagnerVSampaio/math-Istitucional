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


interface Experience {
  id_experience: number;
  id_user?: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
}

interface Education {
  id_education: number;
  id_user?: number;
  institution: string;
  course: string;
  start_date: string;
  completion_date: string;
}


interface Skills {
  id_skill: number;
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
  const [isModalOpenEdu, setIsModalOpenEdu] = useState(false);
  const [isModalOpenExperience, setIsModalOpenExperience] = useState(false);
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      const imageUrl = parsedData.profile_picture || "/profile.png"; // Define a imagem de perfil ou uma padrão
      console.log('Imagem de perfil:', imageUrl); // Verifique a URL da imagem aqui
      setProfileImage(imageUrl);
    }
  }, []);

  {/*ALTERA FOTO DE PERFIL */ }
  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  
  const [updateImage, setUpdateImage] = useState<string | null>(null); // Estado para a imagem de atualização

  const handleUpdateImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdateImage(imageUrl); // Atualiza a imagem de visualização
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const idUser = userData.id_user;
    if (updateImage) {
      // Converte a URL da imagem de volta em um arquivo se você precisar enviar a imagem para a API
      const response = await fetch(updateImage);
      const blob = await response.blob();
      const file = new File([blob], 'profile_picture.jpg', { type: blob.type });
      formData.append('profile_picture', file);
    }

    // Envie os dados do formulário para a sua API
    try {
      const response = await fetch(`http://localhost:3002/api/updatePhoto/${idUser}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Imagem atualizada com sucesso:', result);
        // Aqui você pode atualizar o estado global ou local conforme necessário
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar a imagem do perfil:', errorData.message);
        // Manipule erros como necessário
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
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




  const [educations, setEducations] = useState<Education[]>([]);
  const [isEducationsExpanded, setIsEducationsExpanded] = useState(false);
  const [editIndexEducation, setEditIndexEducation] = useState<number | null>(null);
  const [editedEducation, setEditedEducation] = useState<Education | null>(null);
  const [isModalOpenEducation, setIsModalOpenEducation] = useState(false);
  const [newEducation, setNewEducation] = useState<Education>({
    institution: '',
    course: '',
    start_date: '',
    completion_date: '',
    id_education: 0,
  });

  const handleAddEducation = async (newEducation: Education) => {
    try {
      const data = sessionStorage.getItem("userData");
      if (!data) {
        throw new Error("Usuário não está logado");
      }

      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const educationWithUser = { ...newEducation, id_user: idUser };

      const response = await fetch('http://localhost:3002/api/createEdu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationWithUser),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar educação');
      }

      const addedEducation = await response.json();
      setEducations([...educations, addedEducation]);
      setIsModalOpenEducation(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  };


  const idEducations = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    try {
      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const response = await fetch(`http://localhost:3002/api/idEdu/${idUser}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar educações: ' + response.statusText);
      }

      const educationsData = await response.json();
      setEducations(educationsData);
    } catch (error) {
      console.error('Erro ao buscar educações:', error);
    }
  };

  useEffect(() => {
    idEducations();
  }, []);


  const handleEditEducation = (education: Education) => {
    setEditedEducation({
      id_education: education.id_education,
      institution: education.institution,
      course: education.course,
      start_date: education.start_date,
      completion_date: education.completion_date,
      id_user: education.id_user,
    });
    setEditIndexEducation(educations.indexOf(education));
  };

  const handleSaveEditEducation = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }
    const userData = JSON.parse(data);
    const idUser = userData.id_user;

    if (editIndexEducation !== null && editedEducation) {
      try {
        const educationWithUser: Education = { ...editedEducation, id_user: idUser };

        const response = await fetch(`http://localhost:3002/api/updateEdu/${editedEducation.id_education}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(educationWithUser),
        });

        if (!response.ok) {
          throw new Error('Erro ao editar educação');
        }

        const updatedEducation = await response.json();
        const updatedEducations = educations.map((education, index) =>
          index === editIndexEducation ? updatedEducation : education
        );

        setEducations(updatedEducations);
        setEditIndexEducation(null);
        setEditedEducation(null);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };


  const handleDeleteEducation = async (id_education: number) => {
    try {
      // Fazendo a requisição para excluir a educação no banco de dados
      const response = await fetch(`http://localhost:3002/api/deleteEdu/${id_education}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir educação');
      }
  
      // Atualiza a lista de educations no estado local
      const updatedEducations = educations.filter(education => education.id_education !== Number(id_education)); // Certifica-se de que id_education seja um número
      setEducations(updatedEducations); // Atualiza o estado com a lista de educations sem a excluída
    } catch (error) {
      console.error('Erro ao excluir educação:', error);
      // Você pode adicionar uma notificação ou alerta para o usuário
    }
  };
  







  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isExpExpanded, setIsExpExpanded] = useState(false);
  const [editIndexExp, setEditIndexExp] = useState<number | null>(null);
  const [editedExp, setEditedExp] = useState<Experience | null>(null);
  const [isModalOpenExp, setIsModalOpenExp] = useState(false);
  const [newExp, setNewExp] = useState<Experience>({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    id_experience: 0,
  });


  const idExperiences = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    try {
      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const response = await fetch(`http://localhost:3002/api/idExp/${idUser}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar experiências: ' + response.statusText);
      }

      const expData = await response.json();
      setExperiences(expData);
    } catch (error) {
      console.error('Erro ao buscar experiências:', error);
    }
  };

  useEffect(() => {
    idExperiences();
  }, [])


  const handleEditExp = (exp: Experience) => {
    setEditedExp({
      id_user: exp.id_user,
      id_experience: exp.id_experience,
      company: exp.company,
      position: exp.position,
      start_date: exp.start_date,
      end_date: exp.end_date,
    });
    setEditIndexExp(experiences.indexOf(exp));
  };

  const handleSaveEditExp = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }
    const userData = JSON.parse(data);
    const idUser = userData.id_user;

    if (editIndexExp !== null && editedExp) {
      try {
        const expWithUser = { ...editedExp, id_user: idUser };

        const response = await fetch(`http://localhost:3002/api/updateExp/${editedExp.id_experience}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expWithUser),
        });

        if (!response.ok) {
          throw new Error('Erro ao editar experiência');
        }

        const updatedExp = await response.json();
        const updatedExperiences = experiences.map((exp, index) =>
          index === editIndexExp ? updatedExp : exp
        );

        setExperiences(updatedExperiences);
        setEditIndexExp(null);
        setEditedExp(null);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  const handleDeleteExp = async (id_experience: number) => {
    try {
      const response = await fetch(`http://localhost:3002/api/deleteExp/${id_experience}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir experiência');
      }

      const updatedExperiences = experiences.filter(exp => exp.id_experience !== id_experience);
      setExperiences(updatedExperiences);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  {/* EXPANDIR FORMAÇÃO */ }
  const toggleExpandEducation = () => {
    setIsEducationExpanded(!isEducationExpanded);
  };


  // Função para adicionar uma nova habilidade
  const handleAddExp = async (newExp: Experience) => {
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
      const expWithUser = { ...newExp, id_user: idUser };

      // Fazendo a requisição para adicionar a habilidade ao banco de dados
      const response = await fetch('http://localhost:3002/api/createExp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expWithUser), // Enviando o objeto skill com id_user como JSON
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar habilidade');
      }

      // Adiciona a nova habilidade ao estado local
      const addedExp = await response.json(); // Supondo que a resposta seja o objeto adicionado
      setSkills([...skills, addedExp]);
      setIsModalOpenSkills(false); // Fecha o modal após adicionar
    } catch (error) {
      console.error('Erro:', error);
      // Adicionar uma notificação ou alerta para o usuário, se necessário
    }
  };

  const toggleExpandExperience = () => {
    setIsExperienceExpanded(!isExperienceExpanded);
  };






  const [skills, setSkills] = useState<Skills[]>([]);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [editIndexSkills, setEditIndexSkills] = useState<number | null>(null);
  const [editedSkills, setEditedSkills] = useState<Skills | null>(null);
  const [isModalOpenSkills, setIsModalOpenSkills] = useState(false);
  const [newSkill, setNewSkill] = useState<Skills>({ skill: '', number: 0, id_skill: 0 });


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


  useEffect(() => {
    idSkills();
  }, []);






  const toggleExpandSkills = () => {
    setIsSkillsExpanded(!isSkillsExpanded);
  };




  const handleEditSkills = (skill: Skills) => {
    setEditedSkills({
      id_skill: skill.id_skill,
      skill: skill.skill,
      number: skill.number,
    });
    setEditIndexSkills(skills.indexOf(skill)); // Para saber qual habilidade está sendo editada
  };




  const handleSaveEditSkills = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }
    const userData = JSON.parse(data);
    const idUser = userData.id_user;

    if (editIndexSkills !== null && editedSkills) {
      try {
        // Verifique se editedSkills.skill e editedSkills.number não são null ou undefined
        const skill = editedSkills.skill ?? ""; // Use uma string vazia como fallback
        const number = editedSkills.number ?? 0; // Use 0 como fallback se number for null

        // Inclui o id_user no objeto skillWithUser
        const skillWithUser = { ...editedSkills, skill, number, id_user: idUser };

        // Fazendo a requisição para atualizar a habilidade no banco de dados
        const response = await fetch(`http://localhost:3002/api/updateSkill/${editedSkills.id_skill}`, {
          method: 'PUT', // Usando o método PUT para atualizar
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skillWithUser), // Enviando o objeto completo como JSON
        });

        if (!response.ok) {
          throw new Error('Erro ao editar habilidade');
        }

        const updatedSkill = await response.json(); // Obtém a habilidade atualizada da resposta

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
    } else {
      console.error('Edit index or edited skills is null');
    }
  };





  const handleDeleteSkills = async (id_skill: number) => {
    try {
      // Fazendo a requisição para excluir a habilidade no banco de dados
      const response = await fetch(`http://localhost:3002/api/deleteSkill/${id_skill}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir habilidade');
      }

      // Atualiza a lista de habilidades no estado local
      const updatedSkills = skills.filter(skill => skill.id_skill !== Number(id_skill)); // Certifique-se de que id_skill seja um número
      setSkills(updatedSkills); // Atualiza o estado com a lista de habilidades sem a excluída
    } catch (error) {
      console.error('Erro:', error);
      // Você pode adicionar uma notificação ou alerta para o usuário
    }
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''; // Retorna string vazia se não houver data
    const date = new Date(dateString);

    // Definindo opções de formatação para exibir como "25 de janeiro de 2024"
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return date.toLocaleDateString('pt-BR', options);
  };

  const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Retorna apenas a parte da data no formato yyyy-mm-dd
  };
  

  return (
    <>
      <GeneralItens>
        <DivTop>
          <form onSubmit={handleSubmit}>
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
                  src={`http://localhost:3002/uploads/${profileImage}`} 
                  alt="Profile"
                  className="w-full h-[150px] object-cover"
                />
                <UploadButton
                  type="file"
                  accept="image/*"
                  id="profileImageUpload"
                  onChange={handleUpdateImageChange}
            />
            <ButtonLabel htmlFor="profileImageUpload">
              <FaCamera />
            </ButtonLabel>
          </ImageWrapper>
          </form>
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
                  {editIndexEducation === index ? (
                    <>
                      <Profile
                        type="text"
                        style={{ width: "350px" }}
                        value={editedEducation?.course || ''}
                        onChange={(e) => setEditedEducation({ ...editedEducation!, course: e.target.value })}
                        placeholder="Curso"
                      />
                      <div className="flex">
                      <Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px' }}
                          value={editedEducation?.institution || ''}
                          onChange={(e) => setEditedEducation({ ...editedEducation!, institution: e.target.value })}
                          placeholder="Universidade"
                      />
                      <Profile
                          type="date"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={formatDateForInput(editedEducation?.start_date) || ''}
                          onChange={(e) => setEditedEducation({ ...editedEducation!, start_date: e.target.value })}
                          placeholder="Período"
                      />
                      <Profile
                          type="date"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={formatDateForInput(editedEducation?.completion_date) || ''}
                          onChange={(e) => setEditedEducation({ ...editedEducation!, completion_date: e.target.value })}
                          placeholder="Período"
                      />
                      </div>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Dê duplo click para editar">
                        <CompanyName onDoubleClick={() => handleEditEducation(education)}>
                          {education.course}
                        </CompanyName>
                      </Tooltip>
                      <Period>
                        <span>{education.institution}</span> - {formatDate(education.start_date)} - {formatDate(education.completion_date)}
                      </Period>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndexEducation === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexEducation(null); setEditedEducation(null); }}><GoBack /></button>
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
                      id_education: 0,
                      institution: (e.target as any).institution.value,
                      course: (e.target as any).course.value,
                      start_date: (e.target as any).start_date.value,
                      completion_date: (e.target as any).completion_date.value,
                    };
                    handleAddEducation(newEducation);
                    setIsModalOpenEdu(false);
                  }}
                >
                  <Input
                    type="text"
                    name="course"
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
                    type="date"
                    name="start_date"
                    placeholder="Início"
                    required
                  />
                  <Input
                    type="date"
                    name="completion_date"
                    placeholder="Conclusão"
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
              <button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenExperience(true)}>
                <Tooltip title="Adicionar nova experiência">
                  <Add />
                </Tooltip>
              </button>
              <Tooltip title={isExperienceExpanded ? "Esconder experiências adicionadas" : "Mostrar todas as experiências adicionadas"}>
                {isExperienceExpanded ? (
                  <ArrowUp onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
                ) : (
                  <ArrowDown onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
                )}
              </Tooltip>
            </div>
          </Title>

          <List>
            {experiences.slice(0, isExperienceExpanded ? experiences.length : 2).map((experience, index) => (
              <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {editIndexExp === index ? (
                    <>
                      <Profile
                        type="text"
                        style={{ width: "350px" }}
                        value={editedExp?.position || ''}
                        onChange={(e) => setEditedExp({ ...editedExp!, position: e.target.value })}
                        placeholder="Cargo"
                      />
                      <div className="flex">
                      <Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px' }}
                          value={editedExp?.company || ''}
                          onChange={(e) => setEditedExp({ ...editedExp!, company: e.target.value })}
                          placeholder="Empresa"
                      />
                      <Profile
                          type="date"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={formatDateForInput(editedExp?.start_date) || ''}
                          onChange={(e) => setEditedExp({ ...editedExp!, start_date: e.target.value })}
                          placeholder="Data de Início"
                      />
                      <Profile
                          type="date"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={formatDateForInput(editedExp?.end_date) || ''}
                          onChange={(e) => setEditedExp({ ...editedExp!, end_date: e.target.value })}
                          placeholder="Data de Conclusão"
                      />
                      </div>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Dê duplo click para editar">
                        <CompanyName onDoubleClick={() => handleEditExp(experience)}>
                          {experience.position}
                        </CompanyName>
                      </Tooltip>
                      <Period>
                        <span>{experience.company}</span> - {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                      </Period>

                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndexExp === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexExp(null); setEditedExp(null); }}>
                        <GoBack />
                      </button>
                      <Tooltip title="Salvar alterações">
                        <button style={{ cursor: 'pointer' }} onClick={handleSaveEditExp}>
                          <Save />
                        </button>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip title="Excluir experiência" placement="left">
                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteExp(index)}>
                      <Delete />
                    </button>
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
                    e.preventDefault(); // Previne o comportamento padrão do formulário

                    // Acessa os valores dos campos usando e.target
                    const newExp = {
                      id_experience: 0, // Você pode definir um ID adequado ou gerá-lo na lógica de backend
                      company: (e.target as any).company.value,
                      position: (e.target as any).position.value,
                      start_date: (e.target as any).start_date.value,
                      end_date: (e.target as any).end_date.value,
                    };

                    handleAddExp(newExp); // Passa o novo objeto de experiência para a função
                    setIsModalOpenExperience(false); // Fecha o modal
                  }}
                >
                  <Input
                    type="text"
                    name="position"
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
                    type="date"
                    name="start_date"
                    placeholder="Data de Início"
                    required
                  />
                  <Input
                    type="date"
                    name="end_date"
                    placeholder="Data de Conclusão"
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
                      <SkillTitle onDoubleClick={() => handleEditSkills(skillItem)}>
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
                  <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteSkills(skillItem.id_skill)}>
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
                      id_skill: 0
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
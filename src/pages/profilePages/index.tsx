/* eslint-disable @next/next/no-img-element */
'use client'; 
import React, { useEffect, useState } from "react";
import * as style from "@/style/profilePages-style";
import { FaCamera } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaShareAltSquare } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import Link from "next/link";
import { Tooltip } from "antd/lib";

export type UserData = {
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

interface Biography {
  id_user: number;
  biography: string;

}
export interface Experience {
  id_experience: number;
  id_user?: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
}

export interface Education {
  id_education: number;
  id_user?: number;
  institution: string;
  course: string;
  start_date: string;
  completion_date: string;
}


export interface Skills {
  id_skill: number;
  skill: string;
  number: number;
}

interface UserPhotos {
  profile_picture: string;
  cover_photo: string;
}

const ProfilePage: React.FC<{ id_user?: number }> = ({ id_user }) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  )
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState<string | undefined>("");
  const [isModalOpenEdu, setIsModalOpenEdu] = useState(false);
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [idUser, setIdUser] = useState(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setIdUser(parsedData.id_user);
    }
  }, []);


  /*const profileLink = `${window.location.origin}/profile/${idUser}`;


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

*/


  const [educations, setEducations] = useState<Education[]>([]);
  const [editIndexEducation, setEditIndexEducation] = useState<number | null>(null);
  const [editedEducation, setEditedEducation] = useState<Education | null>(null);
  const [isModalOpenEducation, setIsModalOpenEducation] = useState(false);

  const URL_API = process.env.NEXT_PUBLIC_URL_API;
  const handleAddEducation = async (newEducation: Education) => {
    try {
      const data = sessionStorage.getItem("userData");
      if (!data) {
        throw new Error("Usuário não está logado");
      }

      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const educationWithUser = { ...newEducation, id_user: idUser };

      const response = await fetch(`${URL_API}/api/createEdu`, {
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

      const response = await fetch(`${URL_API}/api/idEdu/${idUser}`);

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

        const response = await fetch(`${URL_API}/api/updateEdu/${editedEducation.id_education}`, {
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
      const response = await fetch(`${URL_API}/api/deleteEdu/${id_education}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir educação');
      }


      const updatedEdu = await response.json();

      const updatedEducation = educations.map((education, index) =>
        index === editIndexEducation ? updatedEdu : education
      );

      setEducations(updatedEducation);
      setEditIndexEducation(null);
      setEditedEducation(null);

      const updatedEducations = educations.filter(education => education.id_education !== Number(id_education));
      setEducations(updatedEducations);
    } catch (error) {
      console.error('Erro ao excluir educação:', error);
    }
  };







  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editIndexExp, setEditIndexExp] = useState<number | null>(null);
  const [editedExp, setEditedExp] = useState<Experience | null>(null);
  const [isModalOpenExperience, setIsModalOpenExperience] = useState(false);
  const [refreshExp, setRefreshExp] = useState<boolean>(false);
  const idExperiences = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    try {
      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const response = await fetch(`${URL_API}/api/idExp/${idUser}`);

      if (!response.ok) {
        throw new Error('Erro ' + response.statusText);
      }

      const expData = await response.json();
      setExperiences(expData);
    } catch (error) {
      console.error('Erro ao buscar experiências:', error);
    }
  };

  useEffect(() => {
    idExperiences();
  }, [refreshExp]);


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

        const response = await fetch(`${URL_API}/api/updateExp/${editedExp.id_experience}`, {
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
      const response = await fetch(`${URL_API}/api/deleteExp/${id_experience}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir experiência');
      }

      const updatedExperiences = experiences.filter(experience => experience.id_experience !== Number(id_experience));
      setExperiences(updatedExperiences);
    } catch (error) {
      console.error('Erro:', error);
    }
  };


  {/* EXPANDIR FORMAÇÃO */ }
  const toggleExpandEducation = () => {
    setIsEducationExpanded(!isEducationExpanded);
  };


  const handleAddExp = async (newExp: Experience) => {
    try {
      const data = sessionStorage.getItem("userData");
      if (!data) {
        throw new Error("Usuário não está logado");
      }

      const userData = JSON.parse(data);
      const idUser = userData.id_user; 

      const expWithUser = { ...newExp, id_user: idUser };

      const response = await fetch(`${URL_API}/api/createExp`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expWithUser), 
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar habilidade');
      }

      const addedExp = await response.json(); 
      setExperiences([...experiences, addedExp]);
      setIsModalOpenExperience(false);
      await idExperiences();
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  useEffect(() => {
    idExperiences();
  }, [refresh]);

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
      const data = sessionStorage.getItem("userData");
      if (!data) {
        throw new Error("Usuário não está logado");
      }

      const userData = JSON.parse(data);
      const idUser = userData.id_user;
      const skillWithUser = { ...newSkill, id_user: idUser };

      const response = await fetch(`${URL_API}/api/createSkill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillWithUser),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar habilidade');
      }

      const addedSkill = await response.json();
      setSkills([...skills, addedSkill]);
      setIsModalOpenSkills(false);
    } catch (error) {
      console.error('Erro:', error);
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
      const idUser = userData.id_user;

      const response = await fetch(`${URL_API}/api/idSkill/${idUser}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar habilidades: ' + response.statusText);
      }

      const skillsData = await response.json();
      setSkills(skillsData);
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
    }
  };


  useEffect(() => {
    idSkills();
  }, []);



  const handleEditSkills = (skill: Skills) => {
    setEditedSkills({
      id_skill: skill.id_skill,
      skill: skill.skill,
      number: skill.number,
    });
    setEditIndexSkills(skills.indexOf(skill));
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

        const skill = editedSkills.skill ?? "";
        const number = editedSkills.number ?? 0;

        const skillWithUser = { ...editedSkills, skill, number, id_user: idUser };

        const response = await fetch(`${URL_API}/api/updateSkill/${editedSkills.id_skill}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skillWithUser),
        });

        if (!response.ok) {
          throw new Error('Erro ao editar habilidade');
        }

        const updatedSkill = await response.json();

        const updatedSkills = skills.map((skill, index) =>
          index === editIndexSkills ? updatedSkill : skill
        );

        setSkills(updatedSkills);
        setEditIndexSkills(null);
        setEditedSkills(null);
      } catch (error) {
        console.error('Erro:', error);
      }
    } else {
      console.error('Edit index or edited skills is null');
    }
  };



  const handleDeleteSkills = async (id_skill: number) => {
    try {
      const response = await fetch(`${URL_API}/api/deleteSkill/${id_skill}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir habilidade');
      }

      const updatedSkills = skills.filter(skill => skill.id_skill !== Number(id_skill));
      setSkills(updatedSkills);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const toggleExpandSkills = () => {
    setIsSkillsExpanded(!isSkillsExpanded);
  };



  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''; 
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
    return date.toISOString().split('T')[0];
  };





  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        setCoverImage(reader.result as string);

        const data = sessionStorage.getItem("userData");
        if (!data) {
          console.error('Usuário não encontrado.');
          return;
        }
        const userData = JSON.parse(data);
        const id_user = userData.id_user;
        const formData = new FormData();
        formData.append('cover_photo', file);

        try {
          const response = await fetch(`${URL_API}/api/updatePhoto/${id_user}`, {
            method: 'PUT',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            await fetchUserData();
          } else {
            setMessage('Erro ao atualizar a foto de capa.');
          }
        } catch (error) {
          console.error('Erro ao enviar a foto de capa:', error);
          setMessage('Erro ao enviar a foto de capa.');
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        setProfileImage(reader.result as string);

        const data = sessionStorage.getItem("userData");
        if (!data) {
          console.error('Usuário não encontrado.');
          return;
        }
        const userData = JSON.parse(data);
        const id_user = userData.id_user;
        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
          const response = await fetch(`${URL_API}/api/updatePhoto/${id_user}`, {
            method: 'PUT',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setMessage('Foto de capa atualizada com sucesso!');
            await fetchUserData();
          } else {
            setMessage('Erro ao atualizar a foto de capa.');
          }
        } catch (error) {
          console.error('Erro ao enviar a foto de capa:', error);
          setMessage('Erro ao enviar a foto de capa.');
        }
      };

      reader.readAsDataURL(file);
    }
  };


  const fetchUserData = async () => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);

      const response = await fetch(`${URL_API}/api/getPhoto/${parsedData.id_user}/photos`);
      if (!response.ok) {
        console.error('Erro ao buscar fotos do usuário.');
        return;
      }

      const userPhotos = await response.json();
      const imageUrl = userPhotos.profile_picture || "/profile.png" || profileImage;
      const imageCoverUrl = userPhotos.cover_photo || "/cover.png" || coverImage;

      setUserData(parsedData);
      setProfileImage(imageUrl);
      setCoverImage(imageCoverUrl);
      setIdUser(parsedData.id_user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refresh]);




  // Função para buscar a biografia do usuário
  const getBiography = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    try {
      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const response = await fetch(`${URL_API}/api/biography/${idUser}/biography`);

      if (!response.ok) {
        throw new Error('Erro ao buscar biografia: ' + response.statusText);
      }

      const { biography } = await response.json();

      setBioText(biography); 
    } catch (error) {
      console.error('Erro ao buscar biografia:', error);
    }
  };

  useEffect(() => {
    getBiography(); 
  }, []);

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    try {
      if (!bioText || !bioText.trim()) {
        await deleteBiography();
      } else {
        await editBiography();
      }
      setIsEditingBio(false); 
    } catch (error) {
      console.error('Erro ao salvar ou deletar biografia:', error);
    }
  };
  
  const editBiography = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    try {
      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const response = await fetch(`${URL_API}/api/biography/${idUser}/biography`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ biography: bioText }), // Envia a biografia atualizada
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar biografia: ' + response.statusText);
      }

    } catch (error) {
      console.error('Erro ao atualizar biografia:', error);
    }
  };


  // Função para deletar a biografia do usuário
  const deleteBiography = async () => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      console.error('Usuário não encontrado.');
      return;
    }

    try {
      const userData = JSON.parse(data);
      const idUser = userData.id_user;

      const response = await fetch(`${URL_API}/api/biography/${idUser}/biography`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar biografia: ' + response.statusText);
      }

    } catch (error) {
      console.error('Erro ao deletar biografia:', error);
    }
  };
  return (
    <>
      <style.GeneralItens>
        <style.DivTop>
          <form name="cover_photo">
            <style.ImageCover className="relative">
              <img
                src={`${URL_API}/uploads/${coverImage}` || "/cover.png"}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <style.UploadButton
                type="file"
                accept="image/*"
                id="coverImageUpload"
                onChange={handleCoverImageChange}
              />
              <style.ButtonCoverLabel htmlFor="coverImageUpload">
                <FaCamera />
                <span className="ml-2">Adicionar foto de capa</span>
              </style.ButtonCoverLabel>
            </style.ImageCover>
          </form>
          <form name="profile_picture">
            <style.ImageWrapper className="relative">
              <img
                src={`${URL_API}/uploads/${profileImage}` || "/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <style.UploadButton
                type="file"
                accept="image/*"
                id="profileImageUpload"
                onChange={handleProfileImageChange}
              />
              <style.ButtonLabel htmlFor="profileImageUpload">
                <FaCamera />
              </style.ButtonLabel>
            </style.ImageWrapper>
          </form>

          <style.DivParagraph>
            <p>{userData?.full_name}</p>
            <style.DivIconShare style={{cursor: "not-allowed"}}>
              <Tooltip title="Compartilhar o perfil" placement="left">
                <FaShareAltSquare />
              </Tooltip>
            </style.DivIconShare>
          </style.DivParagraph>

          <style.DivButton>
            <style.ProfileButton disabled>Favoritos <style.Star /></style.ProfileButton>
            <Link href={"../expandable"}>
              <style.EditProfileButton>Editar perfil</style.EditProfileButton>
            </Link>
            <style.DivIcon style={{cursor: "not-allowed"}}>
              <Tooltip title="Configurações da conta" placement="left">
                <IoSettingsSharp />
              </Tooltip>
            </style.DivIcon>
          </style.DivButton>

          <style.DivBio>
            <style.DivP>
              {isEditingBio ? (
                <div>
                  <p>
                    <span className="font-bold">Biografia:</span>
                    <style.Textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)} // Atualiza o estado da biografia conforme o usuário digita
                    />
                  </p>
                  <Tooltip title="Salvar biografia" placement="left">
                    <style.DivSave onClick={handleSaveBio}> 
                      <AiOutlineSave />
                    </style.DivSave>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <p className="font-bold">Biografia:</p>
                  <p style={{ color: "#272727", opacity: "0.8", padding: "10px", height: 'auto' }}>
                    {bioText ||
                      "Experimente escrever uma curta biografia sobre você, incluindo suas principais conquistas, habilidades e objetivos de carreira."}
                  </p>
                  <Tooltip title="Editar biografia" placement="left">
                    <style.DivEdit onClick={handleEditBio}> {/* Alterna para o modo de edição */}
                      <MdEditNote />
                    </style.DivEdit>
                  </Tooltip>
                </div>
              )}

            </style.DivP>
          </style.DivBio>
        </style.DivTop>

        <style.Wrapper>
          <style.Heading>Formação <div className="flex gap-4"><button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenEdu(true)}>
            <Tooltip title="Adicionar nova formação">
              <style.Add />
            </Tooltip>
          </button>
            {isEducationExpanded ? (
              <Tooltip title="Esconder formações adicionadas">
                <style.ArrowUp onClick={toggleExpandEducation} style={{ cursor: 'pointer' }} />
              </Tooltip>

            ) : (
              <Tooltip title="Mostrar todas as formações adicionadas">
                <style.ArrowDown onClick={toggleExpandEducation} style={{ cursor: 'pointer' }} />
              </Tooltip>
            )}</div></style.Heading>
          <style.EducationList>

            {educations.slice(0, isEducationExpanded ? educations.length : 2).map((education, index) => (
              <style.ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {editIndexEducation === index ? (
                    <>
                      <style.Profile
                        type="text"
                        style={{ width: "350px" }}
                        value={editedEducation?.course || ''}
                        onChange={(e) => setEditedEducation({ ...editedEducation!, course: e.target.value })}
                        placeholder="Curso"
                      />
                      <div className="flex">
                        <style.Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px' }}
                          value={editedEducation?.institution || ''}
                          onChange={(e) => setEditedEducation({ ...editedEducation!, institution: e.target.value })}
                          placeholder="Universidade"
                        />
                        <style.Profile
                          type="date"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={formatDateForInput(editedEducation?.start_date) || ''}
                          onChange={(e) => setEditedEducation({ ...editedEducation!, start_date: e.target.value })}
                          placeholder="Período"
                        />
                        <style.Profile
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
                        <style.CompanyName onDoubleClick={() => handleEditEducation(education)}>
                          {education.course}
                        </style.CompanyName>
                      </Tooltip>
                      <style.Period>
                        <span>{education.institution}</span> - {formatDate(education.start_date)} - {formatDate(education.completion_date)}
                      </style.Period>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndexEducation === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexEducation(null); setEditedEducation(null); }}><style.GoBack /></button>
                      <Tooltip title="Salvar alterações"><button style={{ cursor: 'pointer' }} onClick={handleSaveEditEducation}><style.Save /></button></Tooltip>
                    </>
                  )}
                  <Tooltip title="Excluir formação" placement="left">
                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteEducation(education.id_education)}><style.Delete /></button>
                  </Tooltip>
                </div>
              </style.ListItem>
            ))}
          </style.EducationList>
          {isModalOpenEdu && (
            <style.ModalOverlay>
              <style.ModalContent>
                <style.H2Exp>Adicionar nova formação</style.H2Exp>
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
                  <style.Input
                    type="text"
                    name="course"
                    placeholder="Curso"
                    required
                  />
                  <style.Input
                    type="text"
                    name="institution"
                    placeholder="Universidade"
                    required
                  />
                  <style.Input
                    type="date"
                    name="start_date"
                    placeholder="Início"
                    required
                  />
                  <style.Input
                    type="date"
                    name="completion_date"
                    placeholder="Conclusão"
                    required
                  />
                  <div className="flex align-center justify-center">
                    <style.CloseButton onClick={() => setIsModalOpenEdu(false)}>Fechar</style.CloseButton>
                    <style.AddExpButton type="submit">Adicionar</style.AddExpButton>
                  </div>
                </form>
              </style.ModalContent>
            </style.ModalOverlay>
          )}
        </style.Wrapper>



        <style.Container>
          <style.Title>
            Experiências
            <div className="flex gap-4">
              <button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenExperience(true)}>
                <Tooltip title="Adicionar nova experiência">
                  <style.Add />
                </Tooltip>
              </button>
              <Tooltip title={isExperienceExpanded ? "Esconder experiências adicionadas" : "Mostrar todas as experiências adicionadas"}>
                {isExperienceExpanded ? (
                  <style.ArrowUp onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
                ) : (
                  <style.ArrowDown onClick={toggleExpandExperience} style={{ cursor: 'pointer' }} />
                )}
              </Tooltip>
            </div>
          </style.Title>

          <style.List>
            {experiences.slice(0, isExperienceExpanded ? experiences.length : 2).map((experience, index) => (
              <style.ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {editIndexExp === index ? (
                    <>
                      <style.Profile
                        type="text"
                        style={{ width: "350px" }}
                        value={editedExp?.position || ''}
                        onChange={(e) => setEditedExp({ ...editedExp!, position: e.target.value })}
                        placeholder="Cargo"
                      />
                      <div className="flex">
                        <style.Profile
                          type="text"
                          style={{ width: "200px", marginTop: '4px' }}
                          value={editedExp?.company || ''}
                          onChange={(e) => setEditedExp({ ...editedExp!, company: e.target.value })}
                          placeholder="Empresa"
                        />
                        <style.Profile
                          type="date"
                          style={{ width: "200px", marginTop: '4px', marginLeft: '10px' }}
                          value={formatDateForInput(editedExp?.start_date) || ''}
                          onChange={(e) => setEditedExp({ ...editedExp!, start_date: e.target.value })}
                          placeholder="Data de Início"
                        />
                        <style.Profile
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
                        <style.CompanyName onDoubleClick={() => handleEditExp(experience)}>
                          {experience.position}
                        </style.CompanyName>
                      </Tooltip>
                      <style.Period>
                        <span>{experience.company}</span> - {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                      </style.Period>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                  {editIndexExp === index && (
                    <>
                      <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexExp(null); setEditedExp(null); }}>
                        <style.GoBack />
                      </button>
                      <Tooltip title="Salvar alterações">
                        <button style={{ cursor: 'pointer' }} onClick={handleSaveEditExp}>
                          <style.Save />
                        </button>
                      </Tooltip>
                    </>
                  )}
                  <Tooltip title="Excluir experiência" placement="left">
                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteExp(experience.id_experience)}>
                      <style.Delete />
                    </button>
                  </Tooltip>
                </div>
              </style.ListItem>
            ))}
          </style.List>
          {isModalOpenExperience && (
            <style.ModalOverlay>
              <style.ModalContent>
                <style.H2Exp>Adicionar nova experiência</style.H2Exp>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newExp = {
                      id_experience: 0,
                      position: (e.target as any).position.value,
                      company: (e.target as any).company.value,
                      start_date: (e.target as any).start_date.value,
                      end_date: (e.target as any).end_date.value,
                    };
                    handleAddExp(newExp);
                    setIsModalOpenExperience(false);
                  }}
                >
                  <style.Input
                    type="text"
                    name="position"
                    placeholder="Cargo"
                    required
                  />
                  <style.Input
                    type="text"
                    name="company"
                    placeholder="Empresa"
                    required
                  />
                  <style.Input
                    type="date"
                    name="start_date"
                    placeholder="Período de início"
                    required
                  />
                  <style.Input
                    type="date"
                    name="end_date"
                    placeholder="Período final"
                    required
                  />
                  <div className="flex align-center justify-center">
                    <style.CloseButton onClick={() => setIsModalOpenExperience(false)}>Fechar</style.CloseButton>
                    <style.AddExpButton type="submit">Adicionar</style.AddExpButton>
                  </div>
                </form>
              </style.ModalContent>
            </style.ModalOverlay>
          )}
        </style.Container>



        <style.SkillsContainer>
          <style.Title>
            Habilidades
            <div className="flex gap-4">
              <button style={{ cursor: 'pointer' }} onClick={() => setIsModalOpenSkills(true)}>
                <Tooltip title="Adicionar nova habilidade">
                  <style.Add />
                </Tooltip>
              </button>
              {isSkillsExpanded ? (
                <Tooltip title="Esconder habilidades adicionadas">
                  <style.ArrowUp onClick={() => setIsSkillsExpanded(false)} style={{ cursor: 'pointer' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Mostrar todas as habilidades adicionadas">
                  <style.ArrowDown onClick={() => setIsSkillsExpanded(true)} style={{ cursor: 'pointer' }} />
                </Tooltip>
              )}
            </div>
          </style.Title>

          {/* Renderização das habilidades */}
          {skills.slice(0, isSkillsExpanded ? skills.length : 2).map((skillItem, index) => (
            <style.ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {editIndexSkills === index ? (
                  <>
                    <style.Profile
                      type="text"
                      style={{ width: "350px" }}
                      value={editedSkills?.skill || ''}
                      onChange={(e) => setEditedSkills({ ...editedSkills!, skill: e.target.value })}
                      placeholder="Habilidade"
                    />
                    <div className="flex">
                      <style.Profile
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
                      <style.SkillTitle onDoubleClick={() => handleEditSkills(skillItem)}>
                        {skillItem.skill}
                      </style.SkillTitle>
                    </Tooltip>
                    <div className="flex">
                      <div>
                        <style.ProgressBarContainer>
                          <style.ProgressBar percentage={skillItem.number} />
                        </style.ProgressBarContainer>
                      </div>
                      <style.SkillPercentage>{skillItem.number}%</style.SkillPercentage>
                    </div>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: "space-between", gap: '20px' }}>
                {editIndexSkills === index && (
                  <>
                    <button style={{ cursor: 'pointer' }} onClick={() => { setEditIndexSkills(null); setEditedSkills(null); }}>
                      <style.GoBack />
                    </button>
                    <Tooltip title="Salvar alterações">
                      <button style={{ cursor: 'pointer' }} onClick={handleSaveEditSkills}>
                        <style.Save />
                      </button>
                    </Tooltip>
                  </>
                )}
                <Tooltip title="Excluir habilidade">
                  <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteSkills(skillItem.id_skill)}>
                    <style.Delete />
                  </button>
                </Tooltip>
              </div>
            </style.ListItem>
          ))}

          {isModalOpenSkills && (
            <style.ModalOverlay>
              <style.ModalContent>
                <style.H2Exp>Adicionar nova habilidade</style.H2Exp>
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
                  <style.Input
                    type="text"
                    name="skill"
                    placeholder="Habilidade"
                    required
                  />
                  <style.Input
                    type="number"
                    name="number"
                    placeholder="Nível de conhecimento"
                    required
                  />
                  <div className="flex align-center justify-center">
                    <style.CloseButton onClick={() => setIsModalOpenSkills(false)}>Fechar</style.CloseButton>
                    <style.AddExpButton type="submit">Adicionar</style.AddExpButton>
                  </div>
                </form>
              </style.ModalContent>
            </style.ModalOverlay>
          )}
        </style.SkillsContainer>
      </style.GeneralItens>
    </>
  );
};

export default ProfilePage;
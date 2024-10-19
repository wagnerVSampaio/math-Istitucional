/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import {
  DivTopHomePage,
  DivMenu,
  ImageHome,
  DivRadio,
  StyledParagraph,
  ImageCover,
  ImageWrapper,
  ButtonStyled,
  DivBottom,
  LiStyled,
  UlStyled
} from "./style";
import type { RadioChangeEvent } from "antd/lib";
import { Radio, Modal, Button, message } from "antd/lib";
import * as style from "./style";
import Link from "next/link";
import { useRouter } from "next/router";

const images = ["/bem-vindo.png", "/sobre-nos.png"];

const HomePageContainer = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const [value, setValue] = useState(1);
  const [imageUrl, setImageUrl] = useState(images[0]);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);

  const updateImage = (index: number) => {
    setImageUrl(images[index]);
    setValue(index + 1);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentIndex = images.indexOf(imageUrl);
      if (event.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % images.length;
        updateImage(nextIndex);
      } else if (event.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(prevIndex);
      }
    },
    [imageUrl]
  );

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const onChangeRadio = (e: RadioChangeEvent) => {
    const index = e.target.value - 1;
    updateImage(index);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para exibir o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

/*   // Função para confirmar a saída
  const handleConfirm = () => {
    setIsModalVisible(false);
    
    setUserData(null);
    localStorage.removeItem("userData");
  }; */

  const handleConfirm = async () => {
    try {
        const response = await fetch('http://localhost:3002/api/logout', {
            method: 'POST',
        });

        const responseData = await response.json(); // Adicione isso para verificar a resposta
        console.log('Resposta do servidor:', responseData); // Verifique a resposta aqui

        if (response.ok) {
            sessionStorage.removeItem("userData");

            message.success('Logout realizado com sucesso!'); // Feedback ao usuário
            setIsModalVisible(false);
            router.push("/");
        } else {
            console.error('Erro ao fazer logout:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
};

const [idUser, setIdUser] = useState(null);
const [refresh, setRefresh] = useState<boolean>(false);
const fetchUserData = async () => {
  const data = sessionStorage.getItem("userData");
  if (data) {
    const parsedData = JSON.parse(data);
    console.log('Dados do usuário:', parsedData);

    const response = await fetch(`http://localhost:3002/api/getPhoto/${parsedData.id_user}/photos`);
    if (!response.ok) {
      console.error('Erro ao buscar fotos do usuário.');
      return;
    }

    const userPhotos = await response.json();
    const imageUrl = userPhotos.profile_picture || "/profile.png" || profileImage;
    const imageCoverUrl = userPhotos.cover_photo || "/default_cover.png" || coverImage;

    setUserData(parsedData);
    setProfileImage(imageUrl);
    setCoverImage(imageCoverUrl);
    setIdUser(parsedData.id_user);
  }
};

useEffect(() => {
  fetchUserData();
}, [refresh]);


  return (
    <>
      <DivTopHomePage>
        <ImageHome className="relative">
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: "100%", height: "auto" }}
          />
        </ImageHome>
        <DivRadio>
          <Radio.Group onChange={onChangeRadio} value={value}>
            <Radio value={1}></Radio>
            <Radio value={2}></Radio>
          </Radio.Group>
        </DivRadio>
        <DivMenu>
          <div>
            <ImageCover className="relative">
              <img
                style={{ borderRadius: "10px 10px 0 0" }}
                src={`http://localhost:3002/uploads/${coverImage}` || "/default_cover.png"}
                alt="Cover"
                className="w-full h-[50px] object-cover"
              />
            </ImageCover>

            <ImageWrapper className="relative">
              <img
                src={`http://localhost:3002/uploads/${profileImage}` || "/default_cover.png"}
                alt="Profile"
                className="w-full h-[50px] object-cover"
              />
            </ImageWrapper>
            <StyledParagraph>{userData?.full_name}</StyledParagraph>
            <div>
              <nav>
                <UlStyled>
                  <LiStyled>Sobre</LiStyled>
                  <LiStyled>Central de ajuda</LiStyled>
                  <Link href={'/termsAndPrivacy'}><LiStyled>Termos e privacidade</LiStyled></Link>
                </UlStyled>
              </nav>
            </div>
            <DivBottom>
            <ButtonStyled onClick={showModal}>
              Sair
              <style.Exit/>
            </ButtonStyled>
            <Modal
              title="Confirmação"
              open={isModalVisible}
              onOk={handleConfirm}
              onCancel={handleCancel}
              okText="Sim"
              cancelText="Não"
            >
              <p>Tem certeza que deseja sair?</p>
            </Modal>
            </DivBottom>
          </div>
        </DivMenu>
      </DivTopHomePage>
    </>
  );
};

export default HomePageContainer;

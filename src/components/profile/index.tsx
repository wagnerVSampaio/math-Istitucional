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
} from "./style";

import { FaCamera } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaShareAltSquare } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import Link from "next/link";

const ProfileContainer: React.FC = () => {
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

  return (
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
          <FaShareAltSquare />
        </DivIconShare>
      </DivParagraph>

      <DivButton>
        <ProfileButton>Tenho interesse em ...</ProfileButton>
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
                {bioText || "Experimente escrever uma curta biografia sobre você, incluindo suas principais conquistas, habilidades e objetivos de carreira."}
              </p>
              <DivEdit onClick={handleEditBio}>
                <MdEditNote />
              </DivEdit>
            </div>
          )}
        </DivP>
      </DivBio>
    </DivTop>
  );
};

export default ProfileContainer;

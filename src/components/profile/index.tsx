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
} from "./style";
import { FaCamera } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaShareAltSquare } from "react-icons/fa";
import Link from "next/link";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);

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
        <ProfileButton className="text-[#272727]">
          Tenho interesse em ...
        </ProfileButton>
        <Link href={"../expandable"}>
          <EditProfileButton className="text-[#272727]">
            Editar perfil
          </EditProfileButton>
        </Link>
        <DivIcon>
          <IoSettingsSharp />
        </DivIcon>
      </DivButton>
      <p className="text-[#272727] mx-5 mt-[15px] ">
          Sobre mim: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry is standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </p>
    </DivTop>
  );
};

export default Profile;

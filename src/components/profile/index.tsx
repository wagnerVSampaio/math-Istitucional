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
} from "./style";
import { FaCamera } from "react-icons/fa";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
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
          src={coverImage || '/cover.png'}
          alt="Cover"
          className="w-full h-[100px] object-cover"
        />
        <UploadButton
          type="file"
          accept="image/*"
          id="coverImageUpload"
          onChange={handleCoverImageChange}
        />
        <ButtonCoverLabel htmlFor="coverImageUpload" className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer flex items-center justify-center">
          <FaCamera />
          <span className="ml-2">Adicionar foto de capa</span>
        </ButtonCoverLabel>
      </ImageCover>
      <ImageWrapper className="relative">
        <img
          src={profileImage || '/profile.png'}
          alt="Profile"
          className="w-full h-[150px] object-cover"
        />
        <UploadButton
          type="file"
          accept="image/*"
          id="profileImageUpload"
          onChange={handleProfileImageChange}
        />
        <ButtonLabel htmlFor="profileImageUpload" className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer flex items-center justify-center">
          <FaCamera />
        </ButtonLabel>
      </ImageWrapper>
    </DivTop>
  );
};

export default Profile;

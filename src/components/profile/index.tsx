import React, { useState } from 'react';
import { ButtonLabel, ImageCover, DivTop, ImageWrapper, UploadButton, ButtonCoverLabel } from './style';
import { FaCamera } from "react-icons/fa";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  const CoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  return (
    <DivTop>
      <ImageCover>
      {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverImage} alt="Cover" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/cover.png" alt="Cover" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
        )}
        <UploadButton
          type="file"
          accept="image/*"
          id="imageUpload"
          onChange={CoverImageChange}
        />
        <ButtonCoverLabel htmlFor="imageUpload"><FaCamera />Adicionar foto de capa</ButtonCoverLabel>
      </ImageCover>
      <ImageWrapper>
        {profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/profile.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <UploadButton
          type="file"
          accept="image/*"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <ButtonLabel htmlFor="imageUpload"><FaCamera /></ButtonLabel>
      </ImageWrapper>
      
    </DivTop>
  );
};

export default Profile;

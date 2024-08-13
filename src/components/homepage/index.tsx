/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import { DivTopHomePage, DivMenu, ImageHome, DivRadio, StyledParagraph, ImageCover, ImageWrapper } from './style';
import type { RadioChangeEvent } from 'antd/lib';
import { Radio } from 'antd/lib';

const images = [
  "/bem-vindo.png",
  "/sobre-nos.png",
];

const HomePageContainer = () => {
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

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentIndex = images.indexOf(imageUrl);
    if (event.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % images.length;
      updateImage(nextIndex);
    } else if (event.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage(prevIndex);
    }
  }, [imageUrl]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  const onChangeRadio = (e: RadioChangeEvent) => {
    const index = e.target.value - 1; 
    updateImage(index);
  };

  return (
    <>
      <DivTopHomePage>
        <ImageHome className="relative">
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: '100%', height: 'auto' }}
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
            src={coverImage || "/cover.png"}
            alt="Cover"
            className="w-full h-[50px] object-cover"
          />
        </ImageCover>
  
        <ImageWrapper className="relative">
          <img
            src={profileImage || "/profile.png"}
            alt="Profile"
            className="w-full h-[40px] object-cover"
          />
          </ImageWrapper>
          <StyledParagraph>Nome do usuário</StyledParagraph>
        </div>
        </DivMenu>
      </DivTopHomePage>
    </>
  );
};

export default HomePageContainer;

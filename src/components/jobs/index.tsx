import React, { useState } from "react";
import { Tooltip } from "antd/lib";

import {
  DivVacanciesContainer,
  IconWrapper,
  JobTime,
  CalendarIcon,
  LocationIcon,
  DescriptionWrapper,
  ContainerLocation,
  ButtonFavorite,
  IconFavorite,
  ButtonClose,
  IconClose,
  DivButtons,
  ParagraphDescription
} from "./style";
import { jobsData } from "@/const";

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  postedAgo: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  location,
  postedAgo,
}) => {

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <DivVacanciesContainer
      title={
        <>
          <Tooltip title={title} className=" text-customGreen font-bold">
            <span style={{ fontSize: "20px"}}>{title}</span>
          </Tooltip>
        </>
      }
    >
      <ContainerLocation>
        <LocationIcon /> <span>{location}</span>
      </ContainerLocation>

      <IconWrapper>
        <CalendarIcon /> <JobTime>{postedAgo}</JobTime>
      </IconWrapper>

      <DescriptionWrapper >
      <ParagraphDescription>{truncateDescription(description, 170)}</ParagraphDescription>
      </DescriptionWrapper>

      <DivButtons>
        <ButtonClose>
          <IconClose />
        </ButtonClose>
        <ButtonFavorite>
          <IconFavorite />
        </ButtonFavorite>
      </DivButtons>
    </DivVacanciesContainer>
  );
};

export default JobCard;

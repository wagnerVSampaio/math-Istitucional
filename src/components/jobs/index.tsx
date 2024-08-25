import React from "react";
import { Tooltip } from "antd/lib";

import { DivVacanciesContainer, IconWrapper, JobTime, CalendarIcon, LocationIcon, UserIcon, DescriptionWrapper, ContainerLocation, ButtonFavorite, IconFavorite, IconDown, ButtonClose, IconClose, DivButtons } from "./style";

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  postedAgo: string;
  
}

const JobCard: React.FC<JobCardProps> = ({ title, description, location, postedAgo }) => {
  return (
    <DivVacanciesContainer title={
      <>
       <Tooltip title={title} className=" text-customGreen font-bold">
  
       <span style={{fontSize: "20px"}}>{title}</span>

      </Tooltip>
      </>
    }>
     
      <ContainerLocation>
        <LocationIcon /> <span>{location}</span>
      </ContainerLocation>

      <IconWrapper>
        <CalendarIcon /> <JobTime>{postedAgo}</JobTime>
      </IconWrapper>
      
        <DescriptionWrapper>Mais informações <IconDown /></DescriptionWrapper>

      <DivButtons>
        <ButtonClose><IconClose /></ButtonClose>
        <ButtonFavorite><IconFavorite /></ButtonFavorite>
      </DivButtons>
      
    </DivVacanciesContainer>
  );
};

export default JobCard;
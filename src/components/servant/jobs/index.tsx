import React from "react";
import { Tooltip } from "antd/lib";
import {
  DivVacanciesContainer,
  IconWrapper,
  JobTime,
  CalendarIcon,
  LocationIcon,
  UserIcon,
  DescriptionWrapper,
  ContainerLocation,
} from "./style";

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  postedago: string;
  onClick?: () => void; 
}

const JobCard: React.FC<JobCardProps> = ({ title, description, location, postedago, onClick }) => {
  return (
    <DivVacanciesContainer onClick={onClick} title={<Tooltip title={title}>
    <UserIcon /> <span>{title}</span>
  </Tooltip>}> 
      

      <ContainerLocation>
        <LocationIcon /> <span>{location}</span>
      </ContainerLocation>

      <DescriptionWrapper>{description}</DescriptionWrapper>

      <IconWrapper>
        <CalendarIcon /> <JobTime>{postedago}</JobTime>
      </IconWrapper>
    </DivVacanciesContainer>
  );
};

export default JobCard;
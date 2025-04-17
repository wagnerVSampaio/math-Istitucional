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
  posted_at: string;
  onClick?: () => void; 
}

const JobCard: React.FC<JobCardProps> = ({ title, description, location, posted_at, onClick }) => {
  return (
    <DivVacanciesContainer onClick={onClick} title={<Tooltip title={title}>
    <UserIcon /> <span>{title}</span>
  </Tooltip>}> 
      

      <ContainerLocation>
        <LocationIcon /> <span>{location}</span>
      </ContainerLocation>

      <DescriptionWrapper>{description}</DescriptionWrapper>

      <IconWrapper>
        <CalendarIcon /> <JobTime>{posted_at}</JobTime>
      </IconWrapper>
    </DivVacanciesContainer>
  );
};

export default JobCard;
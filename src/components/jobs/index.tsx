import React from "react";
import { Tooltip } from "antd/lib";
import { DivVacanciesContainer, IconWrapper, JobTime, CalendarIcon, LocationIcon, UserIcon, DescriptionWrapper } from "./style";

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
       <Tooltip title={title}>
  
          <UserIcon /> <span>{title}</span>

      </Tooltip>
      </>
    }>
     
      <IconWrapper>
        <LocationIcon /> <span>{location}</span>
      </IconWrapper>

        <DescriptionWrapper>{description}</DescriptionWrapper>

      <IconWrapper>
        <CalendarIcon /> <JobTime>{postedAgo}</JobTime>
      </IconWrapper>
    </DivVacanciesContainer>
  );
};

export default JobCard;
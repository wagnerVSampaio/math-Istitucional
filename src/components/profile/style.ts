import styled from "styled-components";
import { FaStar } from "react-icons/fa";

export const DivTop = styled.div`
    background-color: white;
    margin: 10px auto;
    width: 80%;
    height: 300px;
    border-radius: 10px;
    position: relative;
    margin-top: 50px;

`;

export const ImageWrapper = styled.div`
  position: absolute;
  top: 50px; 
  left: 100px; 
  transform: translateX(-50%); 
  width: 150px; 
  height: 150px; 
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff; 
  background-color: #f0f0f0; 
`;

export const UploadButton = styled.input`
  display: none;
`;

export const ButtonLabel = styled.label`
  position: absolute;
  bottom: 25px;
  right: 15px;  
  background-color: white; 
  color: #228b22;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 30px; 
  height: 30px; 

`;

export const ImageCover = styled.div`
  position: relative;
  width: 100%;
  height: 100px; 

`;
export const ButtonCoverLabel = styled.label`
    position: absolute;
  bottom: 10px; 
  right: 10px;  
  background-color: rgba(0, 0, 0, 0.5); 
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  
`;
export const DivParagraph = styled.div`
   margin-left: 200px;
   font-size: 24px;
   color: #272727;
   display: flex;
   align-items: center;
`;
export const DivIconShare = styled.div`
  font-size: 40px;
  color: #006b3f;
  display: flex;
  padding-right: 23px;
  margin-top: 5px;
  margin-left: auto;
`;

export const DivButton = styled.div`
  display: flex;
  margin-top: 10px;
`;
export const EditProfileButton = styled.button`
  padding: 8px 150px;
  background-color: #006b3f;
  color: white;
  border-radius: 10px;
  font-weight: bold;
`;
export const ProfileButton = styled.button`
  padding: 8px 120px;
  background-color: white;
  color: #006B3F;
  border: 1px solid #006B3F;
  border-radius: 10px;
  margin-left: 200px;
  margin-right: 26px;
  font-weight: bold;
  display: flex;
`;
export const DivIcon = styled.div`
  font-size: 40px;
  color: #006b3f;
  margin-left: 60px;
`;
export const DivBio = styled.div`
  position: relative;
  padding: 20px;
  background-color: #ffff;
  border-radius: 10px;
  color: #272727;
  display: flex;
`;
export const DivP = styled.div`
    width: 95%;
    height: 100px;
`;

export const DivEdit = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 45px;
  color: #006b3f;
`;

export const DivSave = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 40px;
  color: #006b3f;
  &:focus {
    border: 1px solid #006b3f; 
    outline: none; 
    
  }
`;
export const Textarea = styled.textarea`
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #006b3f;
  &:focus {
    border: 1px solid #006b3f; 
    outline: none; 
    
  }
`;

export const Container = styled.div`
  width: 80%;
  margin: 1px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: #272727;
  font-weight: bold;
`;

export const CompanyName = styled.span`
  font-weight: bold;
  color: #006B3F;
`;

export const Period = styled.span`
  font-style: italic;
  color: black;
  margin-top: 5px;
`;

export const Wrapper = styled.div`
  width: 80%;
  margin: 15px auto;
  margin-top: 50px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const EducationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const EducationItem = styled.li`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.h1`
  color: #272727;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const DegreeTitle = styled.span`
  font-weight: bold;
  color: #006B3F;
`;

export const TimePeriod = styled.span`
  font-style: italic;
  color: #272727;
  margin-top: 5px;
`;


export const SkillsContainer = styled.div`
  width: 80%;
  margin: 1px auto;
  margin-top: 20px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SkillItem = styled.div`
  list-style-type: none;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const SkillTitle = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #006B3F;
`;

export const SkillPercentage = styled.span`
  font-size: 0.8em; 
  color: #555;
  margin-left: 10px;
`;

export const ProgressBarContainer = styled.div`
  width: 150px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
`;

export const ProgressBar = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  background-color: #76c7c0;
  height: 10px; /* Ajuste a altura da barra de progresso aqui */
  border-radius: 5px;
`;

export const Star = styled(FaStar)`
  font-size: 15px;
  margin-left: 10px;
  margin-top: 5px;
`;
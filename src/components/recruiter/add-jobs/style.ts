import styled, { css } from "styled-components";
import { AiFillDelete } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";

export const Total = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivSearch = styled.div`
  width: 100%;
`;

export const DivTopSearch = styled.div`
    margin: 5px auto;
    width: 84%;
    //border-radius: 10px;
    border: 1px solid #ddd;
    background-color: #ffff;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.2);
    margin-top: 60px;
    height: 60px;
    display: flex;
    align-items: center;
`;

export const StyleInput = styled.div`
  width: 350px;
  margin-right: 20px;
  margin-left: 10px;
`;

export const ButtonRemoveUser = styled.button`
  background-color: #006b3f; 
  margin-left: 20px;
  color: white;
  padding: 5px 16px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #45a049;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

`;

export const RemoveUser = styled(AiFillDelete)`
  font-size: 22px;
  cursor: pointer;
  margin-left: 10px;

`;
export const ConfirmRemoveUser = styled(RiDeleteBinLine)`
  font-size: 22px;
  cursor: pointer;
  margin-left: 10px;
`;

export const ButtonEdit = styled.button`
  border: 1px solid #006b3f;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  padding: 4px;
  color: #006b3f;
  margin-left: 20px;

  &:hover {
    border-color: #004c2b;
    box-shadow: 0 4px 8px rgba(0, 107, 63, 0.3);
  }
  &:active {
    transform: scale(1.05);
  }
`;

export const DivNotification = styled.div`
    margin: 5px auto;
    width: 85%;
    border-radius: 10px;
    color: #272727;
    margin-top: 10px;
    height: 450px;
    overflow-x: auto; 
`;

export const StyledUl = styled.ul`
  margin: 10px;
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  box-shadow: 0 4px 8px rgba(0, 107, 63, 0.2);
`;

export const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
`;

export const StyledParagraph = styled.p`
  font-size: 22px;
  color: #006b3f;
  margin-bottom: 15px;
  font-weight: bold;
  display: flex;
`;

export const StyledP = styled.p`
  display: flex;
`;

const iconsStyle = css`
  margin-right: 10px;
  margin-top: 4px;
`;

export const Address = styled(FaMapMarkerAlt)`
  ${iconsStyle}
`;
export const ViewInterested = styled(FaEye)`
  margin-left: 10px;
  margin-top: 5px;
`;

export const Email = styled(IoMdMail)`
  ${iconsStyle}
`;
export const Description = styled(IoMdInformationCircle)`
  margin-right: 10px;
  font-size: 30px;
`;
export const Export = styled(FaFileDownload)`
  ${iconsStyle}
  margin-left: 10px;
`;
export const EditJob = styled(FaRegEdit)`
  margin-left: 20px;
  margin-top: 5px;
  font-size: 20px;
  margin-right: 20px;
`;
export const InterestedButton = styled.button`
  font-size: 16px;
  display: flex;
  margin-top: 20px;
  text-decoration: underline;
`;
export const ButtonAdd = styled.div`
    background-color: #006B3F;
    padding: 6px 100px;
    border-radius: 5px;
    position: relative;
    color: white;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    margin-left: 5px;
    transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #45a049;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
export const Container = styled.div`
  max-width: 600px;
  margin: 0px auto;
  position: relative;
  padding: 5px;
  background-color: #fff;
  border-radius: 8px;
  height: 520px;
  overflow-x: auto;
  margin-top: 5px;
`;

export const Title = styled.h2`
  color: #006B3F;
  text-align: center;
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 20px;
`;

export const DivAdd = styled.div`
  max-width: 600px;
  color: #272727;
  margin: 60px auto;
  font-size: 20px;
  text-align: center;
`;
export const DivTop = styled.div`
   margin: 5px auto;
    width: 70%;
    border-radius: 10px;
    margin-top: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const JobsAdd = styled.div`
    background-color: #fff;
    border: 1px solid #006b3f;
    padding: 8px 100px;
    border-radius: 10px;
    position: relative;
    color: white;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    color: #006b3f;
    margin-left: 20px;
`;
export const StyledImageContainer = styled.div`
width: 100px;   
height: 100px;    
border-radius: 50%;  
overflow: hidden;     
display: flex;        
align-items: center;   
justify-content: center;
margin-left: 30px;
margin-right: 20px;
`;
export const StyledImage = styled.img`
width: 100%;    
height: auto;       
object-fit: cover;     
`;

export const StyledList = styled.li`
  list-style: none; /* Remove o marcador da lista */
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #333; 
  font-size: 16px;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
  }
`;

export const ExportButton = styled.button`
  padding: 10px 20px;
  margin-top: 30px;
  background-color: #006b3f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;

  &:hover {
    background-color: #228B22;
  }
`;
export const ExportButtonGeneral = styled.button`
  background-color: #006b3f; 
  margin-left: 20px;
  color: white;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  &:hover {
    background-color: #45a049;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
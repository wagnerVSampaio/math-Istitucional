import styled, {css} from "styled-components";
import { FaSave, FaStar } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";


export const GeneralItens = styled.div`
    margin: 5px auto;
    width: 80%;
    border-radius: 10px;
    color: #272727;
    margin-top: 60px;
    height: 550px;
    overflow-x: auto;

    @media (min-width: 1024px) { 
        height: 550px; 
    }

    @media (min-width: 1440px) { 
        height: 800px;
    }
`;
export const DivTop = styled.div`
    background-color: white;
    min-height: 100px; 
    border-radius: 10px;
    position: relative;
    height: auto;
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
export const HoverText = styled.div<{ isVisible: boolean }>`
  background-color: black;
  color: white;
  font-size: 12px;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 10px;
  opacity: ${(props) => (props.isVisible ? 0.6 : 0)};
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
  display: inline-block;
  height: auto; 
  z-index: 1000; 
`;

export const DivButton = styled.div`
  display: flex;
  margin-top: 10px;
`;
export const EditProfileButton = styled.button`
  padding: 6px 100px;
  background-color: #006b3f;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  position: relative;
  @media (min-width: 1440px) { 
    padding: 8px 150px;
    }
`;
export const ProfileButton = styled.button`
  padding: 6px 100px;
  background-color: white;
  color: #ddd;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-left: 200px;
  margin-right: 26px;
  font-weight: bold;
  display: flex;
  cursor: not-allowed;
  @media (min-width: 1024px) {
    margin-left: 200px;
    }

    @media (min-width: 1440px) { 
      margin-left: 400px;
      margin-right: 100px;
      padding: 8px 120px;
    }
`;
export const DivIcon = styled.div`
  font-size: 40px;
  color: #006b3f;
  margin-left: auto;
  @media (min-width: 1024px) {
    margin-left: auto;
      margin-right: 18px;
    }

    @media (min-width: 1440px) { 
      margin-left: auto;
      margin-right: 20px
    }
`;
export const DivBio = styled.div`
  background-color: white;
  height: auto; 
  border-radius: 10px;
  position: relative;
  padding: 10px;
  overflow: hidden; 
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
  resize: none; /* Impede que o usuário redimensione manualmente */
  overflow-y: hidden; /* Remove a barra de rolagem */
  &:focus {
    border: 1px solid #006b3f; 
    outline: none;
  }
`;

export const Container = styled.div`
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
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: #272727;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
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
  margin: 15px auto;
  margin-top: 15px;
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
  display: flex;
  justify-content: space-between;
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
const StyleIcon = css`
  font-size: 25px;
  color: #006B3F;
`;
export const Editing = styled(BiSolidEdit)`
  ${StyleIcon}
`;
export const Add = styled(IoMdAdd)`
  ${StyleIcon}
`;
export const ArrowDown = styled(IoIosArrowDown)`
  ${StyleIcon}
`;
export const ArrowUp = styled(IoIosArrowUp)`
  ${StyleIcon}
`;
export const Delete = styled(MdDeleteSweep)`
  ${StyleIcon}
`;
export const Save = styled(FaSave)`
  font-size: 20px;
  color: #006B3F;
`;
export const GoBack = styled(RiArrowGoBackFill)`
  font-size: 20px;
  color: #006B3F;
`;
export const Profile = styled.input`
    border: 1px solid #228B22;
    padding: 2px;
    border-radius: 5px;
    &:focus {
    outline: none;
  }
`;
export const Input = styled.input`
  width: 450px;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  &:focus { 
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px;
  margin-top: 8px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px; 
`;

export const CloseButton = styled.button`
  margin-top: 30px;
  border: 1px solid #006B3F;
  border-radius: 8px;
  background-color: #ffff;
  cursor: pointer;
  padding: 8px 20px;
  font-weight: bold;
  color: #006B3F;
`;
export const AddExpButton = styled.button`
  margin-top: 30px;
  border: 1px solid #006B3F;
  border-radius: 8px;
  background-color: #006B3F;
  color: #ffff;
  cursor: pointer;
  padding: 8px 20px;
  margin-left: 20px;
  font-weight: bold;
`;
export const H2Exp = styled.h2`
  font-size: 20px;
  color: #005B3F;
  font-weight: bold;
  text-align: center;
`;

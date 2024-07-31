import styled from "styled-components";

export const DivTop = styled.div`
    background-color: white;
    margin: 10px auto;
    width: 80%;
    height: 300px;
    border-radius: 10px;
    position: relative;
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
  padding-right: 25px;
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
  padding: 8px 100px;
  background-color: white;
  color: #272727;
  border: 1px solid #272727;
  border-radius: 10px;
  margin-left: 200px;
  margin-right: 15px;
  font-weight: bold;
`;
export const DivIcon = styled.div`
  font-size: 40px;
  color: #006b3f;
  margin-left: 20px;
`;
export const DivBio = styled.div`
  position: relative;
  padding: 20px;
  background-color: #f9f9f9;
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
  right: 15px;
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

`;
export const TextareaEdit = styled.textarea`
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  cursor: default;
  &:read-only {
    background-color: #f5f5f5; /* Muda a cor de fundo para indicar que é não editável */
  }
`;
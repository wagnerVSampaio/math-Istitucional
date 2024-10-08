import { UserOutlined } from '@ant-design/icons/lib/icons'
import React, { useState } from 'react'
import { AddUser, DivSearch, StyleInput, ButtonAddUser, RemoveUser, ButtonRemoveUser, DivTopSearch } from './style'
import { Input } from 'antd/lib'
import { AdmData } from "@/adm-const";
import * as style from "./style";

interface Adm {
  id: number;
  name: string;
  campus: string;
  email: string;
}

interface AdmProps {
  highlightedId: number | null;
}

const Search: React.FC<AdmProps> = ({ highlightedId }) => {
  const Adm = AdmData;

  const highlightedAdm = Adm.find(Adm => Adm.id === highlightedId) || null;
  const otherAdm = Adm.filter(Adm => Adm.id !== highlightedId);

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para exibir o modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Função para confirmar a saída
  const handleConfirm = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <DivSearch>
        <DivTopSearch>
          <StyleInput>
            <Input size="large" prefix={<UserOutlined />} />
          </StyleInput>
          <ButtonAddUser>
            <AddUser />
          </ButtonAddUser>
          <ButtonRemoveUser>
            <RemoveUser />
          </ButtonRemoveUser>
        </DivTopSearch>
     

      <div>
        <style.DivNotification>
          <style.StyledUl>
            {otherAdm.map((adm) => (
              <style.StyledLi
                key={adm.id}
                style={{
                  backgroundColor: '#fff'
                }}
              >
                <div className="flex flex-col m-[20px]">
                  <style.StyledParagraph>{adm.name}</style.StyledParagraph>
                  <style.StyledP>
                    <style.Address /> {adm.campus}
                  </style.StyledP>
                  <style.StyledP>
                    <style.Email />{" "}
                    <span
                      style={{ textDecoration: "none" }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                      onClick={() => handleContactClick(adm.email)}
                    >
                      {adm.email}
                    </span>
                  </style.StyledP>
                </div>
              </style.StyledLi>
            ))}
          </style.StyledUl>
        </style.DivNotification>
      </div>
      </DivSearch>
    </>

  )
};
export default Search;
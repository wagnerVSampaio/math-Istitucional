import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState } from 'react';
import { Input } from 'antd/lib';
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
  const [searchTerm, setSearchTerm] = useState(''); 
  const Adm = AdmData;

  {/* Filtrar usuários com base no termo de busca */}
  const filteredAdm = Adm.filter(adm =>
    adm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightedAdm = Adm.find(Adm => Adm.id === highlightedId) || null;
  const otherAdm = filteredAdm.filter(adm => adm.id !== highlightedId);

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <style.Total>
      <style.DivSearch>
        <style.DivTopSearch>
          <style.StyleInput>
            <Input
              
              prefix={<UserOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar usuário"
            />
          </style.StyleInput>
          <style.ButtonRemoveUser value={"Remover usuario"}>
            <style.RemoveUser />
          </style.ButtonRemoveUser>
        </style.DivTopSearch>

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
      </style.DivSearch>
      </style.Total>
    </>
  );
};

export default Search;

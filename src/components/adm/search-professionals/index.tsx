import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState } from 'react';
import { Input, Tooltip, Modal, Checkbox } from 'antd/lib';
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
  const [selectedAdms, setSelectedAdms] = useState<number[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isSelecting, setIsSelecting] = useState(false); 
  const [userList, setUserList] = useState<Adm[]>(AdmData); 

  {/* Função para alternar entre a seleção e a remoção */}
  const showModal = () => {
    if (isSelecting) {
      setIsModalVisible(true);
    } else {
      setIsSelecting(true);
    }
  };

  {/* Função para remover os usuários selecionados */}
  const handleRemoveUsers = () => {
    const updatedAdm = userList.filter(adm => !selectedAdms.includes(adm.id)); 
    setUserList(updatedAdm); 
    setIsModalVisible(false); 
    setSelectedAdms([]); 
    setIsSelecting(false); 
  };

  {/* Função para alternar a seleção de um usuário */}
  const toggleUserSelection = (id: number) => {
    if (selectedAdms.includes(id)) {
      setSelectedAdms(selectedAdms.filter(userId => userId !== id)); 
    } else {
      setSelectedAdms([...selectedAdms, id]); 
    }
  };

  {/* Função chamada quando o usuário clica no email para abrir o cliente de e-mail */}
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  {/*Filtra os administradores com base no termo de pesquisa */}
  const filteredAdm = userList.filter(adm =>
    adm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightedAdm = userList.find(Adm => Adm.id === highlightedId) || null;
  const otherAdm = filteredAdm.filter(adm => adm.id !== highlightedId);

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

            <Tooltip title={isSelecting ? "Confirmar remoção" : "Remover usuário"}>
              <style.ButtonRemoveUser onClick={showModal}>
                {isSelecting ? <style.ConfirmRemoveUser/> : <style.RemoveUser/>}
              </style.ButtonRemoveUser>
            </Tooltip>
          </style.DivTopSearch>

          {filteredAdm.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <span>Não foi encontrado nenhum usuário com este nome.</span>
            </div>
          ) : (
          <div>
            <style.DivNotification>
              <style.StyledUl>
                {otherAdm.map((adm) => (
                  <style.StyledLi
                    key={adm.id}
                    style={{
                      backgroundColor: selectedAdms.includes(adm.id) ? '#e6f7ff' : '#fff', 
                    }}
                  >
                    <div className="flex flex-col m-[20px]">
                      <style.StyledParagraph>{adm.name} <Tooltip title="Visualizar perfil"><style.ViewProfile/></Tooltip></style.StyledParagraph>
                      <style.StyledP>
                        <style.Address /> {adm.campus}
                      </style.StyledP>
                      <Tooltip title="Entrar em contato" placement='right'>
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
                      </Tooltip>
                    </div>

                    {isSelecting && (
                      <Checkbox
                        checked={selectedAdms.includes(adm.id)}
                        onChange={() => toggleUserSelection(adm.id)}
                        className="mr-[20px]"
                      />
                    )}
                  </style.StyledLi>
                ))}
              </style.StyledUl>
            </style.DivNotification>
          </div>
          )}
        </style.DivSearch>
      </style.Total>

      {/* Modal de confirmação */}
      <Modal
        open={isModalVisible}
        onOk={handleRemoveUsers}
        onCancel={() => setIsModalVisible(false)}
        okText="Sim, remover"
        cancelText="Cancelar"
      >
        <p>Tem certeza de que deseja remover os usuários selecionados?</p>
      </Modal>
    </>
  );
};

export default Search;

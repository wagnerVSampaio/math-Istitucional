import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState, useEffect } from 'react';
import { Input, Tooltip, Modal, Checkbox, Spin } from 'antd/lib';
import * as style from "./style";

interface Adm {
  id_user: number;
  id_adm: number;
  full_name: string;
  campus: string;
  email: string;
  user_type: string;
  status: string
}

interface AdmProps {
  usersId: number | null;
}

const Search: React.FC<AdmProps> = ({ usersId }) => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedAdms, setSelectedAdms] = useState<number[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isSelecting, setIsSelecting] = useState(false); 
  const [users, setUsers] = useState<Adm[]>([]); // Dados da API
  const [loading, setLoading] = useState(true); // Indicador de carregamento
  const [pendingUsers, setPendingUsers] = useState<Adm[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
        fetchApprovedUsers(parsedData.id_user);
    }
}, []); 

const fetchApprovedUsers = async (idAdm: number) => {
    try {
        const response = await fetch(`http://localhost:3002/api/recruiterOk/${idAdm}`); 
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários aprovados');
        }
        const data = await response.json();
        setUsers(data);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
};


  const showModal = () => {
    if (isSelecting) {
      setIsModalVisible(true);
    } else {
      setIsSelecting(true);
    }
  };

  const handleRemoveUsers = async () => {
    try {

        for (let userId of selectedAdms) {
            const response = await fetch(`http://localhost:3002/api/deleteRecruiter/${userId}`, {
                method: 'DELETE', 
            });

            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user.id_user !== userId));
            } else {
                console.error('Erro ao recusar usuário:', response.statusText);
            }
        }

        setIsModalVisible(false);
        setSelectedAdms([]);
        setIsSelecting(false);

        console.log('Usuários deletados com sucesso');
    } catch (error) {
        console.error('Erro ao deletar usuários:', error);
    }
};


  const toggleUserSelection = (id: number) => {
    if (selectedAdms.includes(id)) {
      setSelectedAdms(selectedAdms.filter(userId => userId !== id));
    } else {
      setSelectedAdms([...selectedAdms, id]);
    }
  };

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Users = users.find(user => user.id_user === usersId) || null;
  const otherUsers = filteredUsers.filter(user => user.id_user !== usersId);


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
                {isSelecting ? <style.ConfirmRemoveUser /> : <style.RemoveUser />}
              </style.ButtonRemoveUser>
            </Tooltip>
          </style.DivTopSearch>

          {filteredUsers.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#272727' }}>
              <style.Info/><span>Não foi encontrado nenhum usuário.</span>
            </div>
          ) : (
            <div>
              <style.DivNotification>
                <style.StyledUl>
                  {otherUsers.map((user) => (
                    <style.StyledLi
                      key={user.id_user}
                      style={{
                        backgroundColor: selectedAdms.includes(user.id_user) ? '#e6f7ff' : '#fff',
                      }}
                    >
                      <div className="flex flex-col m-[20px]">
                        <style.StyledParagraph>{user.full_name} <Tooltip title="Visualizar perfil"><style.ViewProfile /></Tooltip></style.StyledParagraph>
                        <style.StyledP>
                          <style.Address /> {user.campus}
                        </style.StyledP>
                        <Tooltip title="Entrar em contato" placement='right'>
                          <style.StyledP>
                            <style.Email />{" "}
                            <span
                              style={{ textDecoration: "none" }}
                              onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                              onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                              onClick={() => handleContactClick(user.email)}
                            >
                              {user.email}
                            </span>
                          </style.StyledP>
                        </Tooltip>
                      </div>

                      {isSelecting && (
                        <Checkbox
                          checked={selectedAdms.includes(user.id_user)}
                          onChange={() => toggleUserSelection(user.id_user)}
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

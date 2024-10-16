import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState, useEffect } from 'react';
import { Input, Tooltip, Modal, Checkbox, Spin } from 'antd/lib';
import * as style from "./style";

interface Adm {
  id_user: number;
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


  // Função para carregar os usuários da API e filtrar os recrutadores
  useEffect(() => {
    const fetchPendingUsers = async () => {
        try {
            const response = await fetch("http://localhost:3002/api/recruiterOk"); // Rota para buscar usuários pendentes
            const data = await response.json();
            setUsers(data); // Armazena os usuários pendentes no estado
        } catch (error) {
            console.error("Erro ao buscar usuários pendentes:", error);
        }
    };

    fetchPendingUsers();
}, []);
  
  


  // Função para alternar entre a seleção e a remoção
  const showModal = () => {
    if (isSelecting) {
      setIsModalVisible(true);
    } else {
      setIsSelecting(true);
    }
  };

  // Função para remover os usuários selecionados
  const handleRemoveUsers = async () => {
    try {
        // Faz a requisição para deletar cada usuário selecionado
        for (let userId of selectedAdms) {
            const response = await fetch(`http://localhost:3002/api/deleteUser/${userId}`, {
                method: 'DELETE', 
            });

            if (response.ok) {
                // Remove o usuário do estado após deleção bem-sucedida
                setUsers(prevUsers => prevUsers.filter(user => user.id_user !== userId));
            } else {
                console.error('Erro ao recusar usuário:', response.statusText);
            }
        }

        // Fecha o modal e reseta os estados
        setIsModalVisible(false);
        setSelectedAdms([]);
        setIsSelecting(false);

        console.log('Usuários deletados com sucesso');
    } catch (error) {
        console.error('Erro ao deletar usuários:', error);
    }
};


  // Função para alternar a seleção de um usuário
  const toggleUserSelection = (id: number) => {
    if (selectedAdms.includes(id)) {
      setSelectedAdms(selectedAdms.filter(userId => userId !== id));
    } else {
      setSelectedAdms([...selectedAdms, id]);
    }
  };

  // Função chamada ao clicar no email
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  // Filtra os usuários com base no termo de pesquisa
  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Usuário destacado
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <span>Não foi encontrado nenhum usuário.</span>
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

import { UserOutlined } from '@ant-design/icons/lib/icons';
import React, { useState, useEffect } from 'react';
import { Input, Tooltip, Modal, Checkbox, Spin } from 'antd/lib';
import * as style from "./style";

interface Adm {
  id_usuario: number;
  nome_completo: string;
  campus?: string;
  email: string;
  tipo_usuario: string;
}

interface AdmProps {
  highlightedId: number | null;
}

const Search: React.FC<AdmProps> = ({ highlightedId }) => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedAdms, setSelectedAdms] = useState<number[]>([]); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isSelecting, setIsSelecting] = useState(false); 
  const [users, setUsers] = useState<Adm[]>([]); // Dados da API
  const [loading, setLoading] = useState(true); // Indicador de carregamento

  // Função para carregar os usuários da API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/allUser');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
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
      // Filtra os usuários que não foram selecionados
      const updatedUsers = users.filter(user => !selectedAdms.includes(user.id_usuario));

      // Faz a requisição para deletar cada usuário selecionado
      for (let userId of selectedAdms) {
        const response = await fetch(`http://localhost:3002/api/deleteUser/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Erro ao deletar usuário com ID ${userId}`);
        }
      }

      // Atualiza a lista de usuários no estado
      setUsers(updatedUsers);

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
    user.nome_completo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Usuário destacado
  const highlightedUser = users.find(user => user.id_usuario === highlightedId) || null;
  const otherUsers = filteredUsers.filter(user => user.id_usuario !== highlightedId);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
  }

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
              <span>Não foi encontrado nenhum usuário com este nome.</span>
            </div>
          ) : (
            <div>
              <style.DivNotification>
                <style.StyledUl>
                  {otherUsers.map((user) => (
                    <style.StyledLi
                      key={user.id_usuario}
                      style={{
                        backgroundColor: selectedAdms.includes(user.id_usuario) ? '#e6f7ff' : '#fff',
                      }}
                    >
                      <div className="flex flex-col m-[20px]">
                        <style.StyledParagraph>{user.nome_completo} <Tooltip title="Visualizar perfil"><style.ViewProfile /></Tooltip></style.StyledParagraph>
                        <style.StyledP>
                          <style.Address /> {user.campus || 'Campus não informado'}
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
                          checked={selectedAdms.includes(user.id_usuario)}
                          onChange={() => toggleUserSelection(user.id_usuario)}
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

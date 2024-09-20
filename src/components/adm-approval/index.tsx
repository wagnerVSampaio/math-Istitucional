import React, { useState } from "react";
import * as style from "./style";
import { AdmData } from "@/adm-const";
import { ButtonApprove, ButtonRefuse } from "./style";
import { Modal } from "antd/lib";

interface Adm {
  id: number;
  name: string;
  campus: string;
  email: string;
}

interface AdmProps {
  highlightedId: number | null;
}

const AdmApproval: React.FC<AdmProps> = ({ highlightedId }) => {
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
              <div className="flex mt-[40px]">
                <ButtonRefuse>Recusar</ButtonRefuse>
                <ButtonApprove onClick={showModal}>Aprovar</ButtonApprove>
              </div>
            </div>
          </style.StyledLi>
        ))}
      </style.StyledUl>
      <Modal
              title="Deseja prosseguir com a aprovação?"
              open={isModalVisible}
              onOk={handleConfirm}
              onCancel={handleCancel}
              okText="Sim"
              cancelText="Não"
            >
            </Modal>
    </style.DivNotification>
  );
};

export default AdmApproval;

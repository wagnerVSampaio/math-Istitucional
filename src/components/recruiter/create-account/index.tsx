import React, { useState } from "react";
import { Checkbox, Form, Input, Button, Flex, Select, Modal} from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { useRouter } from 'next/navigation';
import {
  ButtonCreate,
  ButtonExit,
  ButtonLabelDate,
  DateBirthUpload,
  UploadButtonDate,
} from "./style";
import "./formEdited.css"
type FieldType = {
  full_name: string;
  cpf: string;
  email: string;
  profile_picture: string;
  allocation: string;
  user_type: string;
  status: string;
  campus: string;
  password: string;
  passwordconfirmacao: string;
};

const { Option } = Select;

type SizeType = Parameters<typeof Form>[0]["size"];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};


const NavRecrutador = () => {
  const [value, setValue] = useState(1);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [registerImage, setRegisterImage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal
  const [modalContent, setModalContent] = useState<string>("");
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChangeCheck: CheckboxProps["onChange"] = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const handleRegisterImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRegisterImage(imageUrl);
    }
  };

  const [cpf, setCpf] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };


  {/*   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { full_name, value } = e.target;
    setFormData({
      ...formData,
      [full_name]: value,
    });
  };

  // Função para lidar com o upload da imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRegisterImage(imageUrl);
      setFormData({
        ...formData,
        photo: file.full_name, // Apenas salva o full_name do arquivo; ajuste conforme necessidade
      });
    }
  }; */}

  const handleOk = () => {
    setIsModalVisible(false);
    router.push("/");
    // Limpar o formulário ou redirecionar o usuário se necessário
  };

  const RegisterRecrutador = async (values: FieldType) => {
    console.log("Formulário enviado!", values);
    try {
        const formData = new FormData(); // Crie uma instância de FormData

        // Adicione todos os campos ao FormData
        formData.append('full_name', values.full_name);  // full_name completo do recrutador
        formData.append('email', values.email);  // Email do recrutador
        formData.append('password', values.password);  // Senha do recrutador
        formData.append('user_type', 'recruiter');  // Tipo de usuário
        formData.append('cpf', values.cpf);  // CPF do recrutador
        formData.append('allocation', values.allocation);  // Lotação do recrutador
        formData.append('campus', values.campus);  // Campus do recrutador
        formData.append('status', 'pending');  // Status do recrutador
        console.log(formData)
        // Adicione o arquivo da imagem se existir
        if (registerImage) {
            const file = await fetch(registerImage).then(r => r.blob()); // Obtenha o arquivo Blob da URL
            formData.append('profile_picture', file, 'photo.jpg'); // Nomeie o arquivo como você quiser
        }

        // Envia os dados para criar o usuário pendente
        const response = await fetch('http://localhost:3002/api/createusers', {
            method: 'POST',
            body: formData, // Envie o FormData
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Usuário pendente criado com sucesso:', data);
            setIsModalVisible(true); // Exibir modal de sucesso ou redirecionar
        } else {
            console.error('Erro do servidor:', data);
            setErrorMessage(data.message || 'Erro ao registrar');
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        setErrorMessage('Erro ao registrar');
    }
};


  return (
    <>
        <Form<FieldType>
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          className="ant-form-item"
          onFinish={RegisterRecrutador}
          style={{maxWidth: "600px"}}
        >
          <div className="flex">
            <div className="mr-[75px]">
              <p className="mb-[3px]">
                Nome completo <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="full_name"
                rules={[{ required: true, message: "Por favor, insira o nome!" }]}
              >
                <Input className="w-[350px]" />
              </Form.Item>

              <p className="mt-[3px] mb-[3px]">
                CPF <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="cpf"
                rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
              >
                <Input
                  type="text"
                  id="cpf"
                  value={cpf}
                  maxLength={11}
                  className="w-[350px]"
                />
              </Form.Item>

              <p className="mt-[3px] mb-[3px]">
                E-mail <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="email"
                rules={[{ required: true, message: "Por favor, insira o e-mail!" }]}
              >
                <Input className="w-[350px]" />
              </Form.Item>
            </div>

            <div>
              <p className="mb-[3px]">
                Foto <strong className="text-red-500"> *</strong>{" "}
              </p>
              <Form.Item<FieldType> name="profile_picture">
                <ButtonLabelDate htmlFor="registerImageUpload">
                  <DateBirthUpload className="relative">
                    <img
                      src={registerImage || "background-upload.png"}
                      alt="Register"
                      className="w-full object-cover"
                    />
                    <UploadButtonDate
                      type="file"
                      accept="image/*"
                      id="registerImageUpload"
                      onChange={handleRegisterImageChange}
                      style={{ display: "none" }}
                    />
                  </DateBirthUpload>
                </ButtonLabelDate>
              </Form.Item>
            </div>
          </div>
          <div className="flex mb-1">
            <div className="mr-[50px]">
              <p className="mb-[3px]">
                Lotação <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType> name="allocation">
                <Select placeholder="" style={{ width: '250px' }}>
                  <Option value="PROAD">PROAD - Pró-Reitoria de Administração</Option>
                  <Option value="PROCCE">PROCCE -  Pró-Reitoria da Cultura,Comunidade e Extensão</Option>
                  <Option value="PROPLAN">PROPLAN - Pró-Reitoria de Planejamento e Desenvolvimento Institucional</Option>
                  <Option value="PROGES">PROGES - Pró-Reitoria de Gestão Estudantil</Option>
                  <Option value="PROEN">PROEN -  Pró-Reitoria de Ensino de Graduação</Option>
                  <Option value="PROGEP">PROGEP -  Pró-Reitoria de Gestão de Pessoas</Option>
                  <Option value="PROPPIT">PROPPIT -  Pró-Reitoria de Pesquisa, Pós-Graduação e Inovação Tecnológica</Option>
                </Select>
              </Form.Item>
            </div>

            <div>
              <p className="mb-[3px]">
                Campus <strong className="text-red-500"> * </strong>
              </p>
              <Form.Item<FieldType> name="campus">
                <Select
                  placeholder="Selecione o Campus"
                  showSearch
                  style={{ width: '250px' }}>
                  <Option value="Santarém (Campus sede)">Santarém (Campus sede)</Option>
                  <Option value="Campus Alenquer">Campus Alenquer</Option>
                  <Option value="Campus Itaituba">Campus Itaituba</Option>
                  <Option value="Campus Monte Alegre">Campus Monte Alegre</Option>
                  <Option value="Campus Juruti">Campus Juruti</Option>
                  <Option value="Campus Óbidos">Campus Óbidos</Option>
                  <Option value="Campus Oriximiná">Campus Oriximiná</Option>
                  </Select>
              </Form.Item>
            </div>
          </div>
          <div className="flex">
            <div className="mr-[50px]">
              <p className="mb-[3px]">
                Senha <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a senha!",
                  },
                ]}
              >
                <Input.Password className="w-[250px]" />
              </Form.Item>
            </div>
            <div>
              <p className="mb-[3px]">
                Confirmação de senha <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="passwordconfirmacao"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a confirmação da senha!",
                  },
                ]}
              >
                <Input.Password className="w-[250px] bg-white" />
              </Form.Item>
            </div>
          </div>

          <div className="mb-[20px] flex">
            <Checkbox
              checked={checked}
              disabled={disabled}
              onChange={onChangeCheck}
              className="mr-[20px]"
            />
            <p>
              Para prosseguir, por favor, clique no botão{" "}
              <strong className="text-customGreen">Aceitar Termos</strong> abaixo
              e confirme sua concordância com nossos termos de serviço e política
              de privacidade.
            </p>
          </div>
          <div className="mt-[40px]">
            <Flex gap="small" wrap>
              <Link href={"/"}>
                <ButtonExit>
                  Voltar
                </ButtonExit>
              </Link>
              <ButtonCreate type="primary" htmlType="submit">
                Criar conta
              </ButtonCreate>
            </Flex>
          </div>
        </Form>

        {/* Modal para exibir informações do usuário */}
      <Modal 
        title="Solicitação de cadastro bem-Sucedido" 
        open={isModalVisible} 
        onOk={handleOk}
      >
          <>
            <p>Aguarde a aprovação da pró-reitoria selecionada no cadastro!</p>
          </>
      </Modal>
    </>
  );
};

export default NavRecrutador;
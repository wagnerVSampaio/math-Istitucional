import React, { useState } from "react";
import { Checkbox, Form, Flex, Select, Modal } from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { useRouter } from 'next/navigation';
import * as style from './style';
import "./formEdited.css"
import InputMask from "react-input-mask";

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
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [error, setError] = useState(false);
  const [cpf, setCpf] = useState("");

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onChangeCheck: CheckboxProps["onChange"] = (e) => {
    setChecked(e.target.checked);
    if (error) setError(false); 
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

  const handleOk = () => {
    setIsModalVisible(false);
    router.push("/");
  };

  const RegisterRecrutador = async (values: FieldType) => {
    try {
      const formData = new FormData();

      formData.append('full_name', values.full_name);  
      formData.append('email', values.email); 
      formData.append('password', values.password);
      formData.append('user_type', 'recruiter'); 
      formData.append('cpf', values.cpf);
      formData.append('allocation', values.allocation); 
      formData.append('campus', values.campus); 
      formData.append('status', 'pending');

      const defaultCoverImageUrl = "/cover.png";

      if (registerImage) {
        const file = await fetch(registerImage).then(r => r.blob()); 
        formData.append('profile_picture', file, 'photo.jpg');
      }

      const coverImageUrl = defaultCoverImageUrl;
      const coverFile = await fetch(coverImageUrl).then((r) => r.blob()); 
      formData.append("cover_photo", coverFile, "cover_photo.png");

      const response = await fetch('http://localhost:3002/api/createusers', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();
      if (response.ok) {
        setIsModalVisible(true);
      } else {
        setErrorMessage(data.message || 'Erro ao registrar');
      }
    } catch (error) {
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
        style={{ maxWidth: "600px" }}
      >
        <div className="flex">
          <div className="mr-[75px]">
            <style.ParagraphStyled className="mb-[3px]">
              Nome completo <strong className="text-red-500"> *</strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType>
              name="full_name"
              rules={[{ required: true, message: "Por favor, insira o nome!" }]}
            >
              <style.InputEditForm />
            </Form.Item>

            <style.ParagraphStyled className="mt-[3px] mb-[3px]">
              CPF <strong className="text-red-500"> *</strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType>
              name="cpf"
              rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
            >
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              >
                {({ onChange, value, ...rest }) => (
                  <style.InputEdit
                    {...rest}
                    value={value}
                    onChange={onChange}
                    type="text"
                    id="cpf"
                  />
                )}
              </InputMask>
            </Form.Item>

            <style.ParagraphStyled className="mt-[3px] mb-[3px]">
              E-mail <strong className="text-red-500"> *</strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType>
              name="email"
              rules={[{ required: true, message: "Por favor, insira o e-mail!" }]}
            >
              <style.InputEditForm />
            </Form.Item>
          </div>

          <div>
            <style.ParagraphStyled className="mb-[3px]">
              Foto <strong className="text-red-500"> *</strong>{" "}
            </style.ParagraphStyled>
            <Form.Item<FieldType> name="profile_picture">
              <style.ButtonLabelDate htmlFor="registerImageUpload">
                <style.DateBirthUpload className="relative">
                  <img
                    src={registerImage || "background-upload.png"}
                    alt="Register"
                    className="w-full h-full object-cover"
                  />
                  <style.UploadButtonDate
                    type="file"
                    accept="image/*"
                    id="registerImageUpload"
                    onChange={handleRegisterImageChange}
                    style={{ display: "none" }}
                  />
                </style.DateBirthUpload>
              </style.ButtonLabelDate>
            </Form.Item>
          </div>
        </div>
        <div className="flex">
          <div className="mr-[50px]">
            <style.ParagraphStyled>
              Lotação <strong className="text-red-500"> *</strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType> name="allocation">
              <Select placeholder="" className="select-form-item">
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
            <style.ParagraphStyled>
              Campus <strong className="text-red-500"> * </strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType> name="campus">
              <Select
                placeholder=""
                showSearch
                className="select-form-item">
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
            <style.ParagraphStyled className="mb-[3px]">
              Senha <strong className="text-red-500"> *</strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType>
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a senha!",
                },
              ]}
            >
              <style.InputEditFormPass />
            </Form.Item>
          </div>
          <div>
            <style.ParagraphStyled className="mb-[3px]">
              Confirmação de senha <strong className="text-red-500"> *</strong>
            </style.ParagraphStyled>
            <Form.Item<FieldType>
              name="passwordconfirmacao"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a confirmação da senha!",
                },
              ]}
            >
              <style.InputEditFormPass />
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
          <style.ParagraphStyled>
            Para prosseguir, clique no botão{" "}
            <strong className="text-customGreen">Aceitar Termos</strong> abaixo
            e confirme sua concordância com nossos termos de serviço e política
            de privacidade.
          </style.ParagraphStyled>
        </div>
        <div className="mt-[40px]">
          <Flex gap="small" wrap>
            <Link href={"/"}>
            <style.ButtonExit className="button-item">
              Voltar
            </style.ButtonExit>
          </Link>
          <style.ButtonRegister type="primary" htmlType="submit" className="button-item">
            Criar conta
          </style.ButtonRegister>
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
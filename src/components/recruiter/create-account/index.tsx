import React, { useState } from "react";
import { Checkbox, Form, Input, Button, Flex, Select } from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import {
  ButtonCreate,
  ButtonExit,
  ButtonLabelDate,
  DateBirthUpload,
  StyledForm,
  UploadButtonDate,
} from "./style";

type FieldType = {
  name: string;
  cpf: string;
  email: string;
  photo: string;
  lotacao: string;
  tipo_usuario: string;
  campus: string;
  password: string;
  passwordconfirmation: string;
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        photo: file.name, // Apenas salva o nome do arquivo; ajuste conforme necessidade
      });
    }
  }; */}

  const Register = async (value: any) => {
    console.log("Formulário enviado!", value); // Verifica se o register é chamado
    try {
      const response = await fetch('http://localhost:3002/api/createusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: value.name,
          email: value.email,
          senha: value.password,
          foto: registerImage,
          cpf: value.cpf,
          lotacao: value.lotacao,
          campus: value.campus,
          tipo_usuario: 'recrutador'
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Recrutador registrado com sucesso!');
      } else {
        setErrorMessage(data.error || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setErrorMessage('Erro ao registrar');
    }
  };
  

  return (
    <>
      <StyledForm
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        className="max-w-[600px]"
        onFinish={Register}
      >
        <div className="flex">
          <div className="mr-[75px]">
            <p className="mb-[3px]">
              Nome completo <strong className="text-red-500"> *</strong>
            </p>
            <Form.Item<FieldType>
              name="name"
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
            <Form.Item<FieldType> name="photo">
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
            <Form.Item<FieldType> name="lotacao">
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
                style={{ width: '250px' }}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Santarém (Campus sede)",
                  },
                  {
                    value: "2",
                    label: "Campus Alenquer",
                  },
                  {
                    value: "3",
                    label: "Campus Itaituba",
                  },
                  {
                    value: "4",
                    label: "Campus Monte Alegre",
                  },
                  {
                    value: "5",
                    label: "Campus Juruti",
                  },
                  {
                    value: "6",
                    label: "Campus Óbidos",
                  },
                  {
                    value: "7",
                    label: "Campus Oriximiná",
                  },
                ]}
              />
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
              name="passwordconfirmation"
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
            <ButtonCreate name="submit">
              Criar conta
            </ButtonCreate>
          </Flex>
        </div>
      </StyledForm>
    </>
  );
};

export default NavRecrutador;
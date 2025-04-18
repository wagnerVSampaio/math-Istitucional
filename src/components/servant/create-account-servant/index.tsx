/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Checkbox, Form, Flex, Space, message, DatePicker} from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import "./formEdited.css";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from 'next/navigation';
import InputMask from "react-input-mask";
import * as style from './style';

type FieldType = {
  full_name: string;
  cpf: string;
  email: string;
  profile_picture: string;
  cover_photo: string;
  birth_date: string;
  password: string;
  passwordconfirmation: string;
  phone: string;
};

type SizeType = Parameters<typeof Form>[0]["size"];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface NavServidorProps {
  onRegister: (values: FieldType) => Promise<void>;
}

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const NavServidor = () => {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [registerImage, setRegisterImage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | "default">("default");
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(undefined);

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onChangeCheck: CheckboxProps["onChange"] = (e) => {
    setChecked(e.target.checked);
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      setSelectedDate(date);
    } else {
      setSelectedDate(undefined);
    }
  };


  const handleRegisterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRegisterImage(imageUrl);
    }
  };

  const formatDate = (date: Dayjs): string => {
    return date.format("YYYY-MM-DD");
  };

  const URL_API = process.env.NEXT_PUBLIC_URL_API;
const RegisterServidor = async (values: FieldType) => {
  if (
    !values.full_name ||
    !values.cpf ||
    !values.email ||
    !values.password ||
    !values.passwordconfirmation ||
    !values.phone ||
    !selectedDate ||
    !registerImage
  ) {
    message.error("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  if (!checked) {
    message.error("Você deve aceitar os termos para continuar!");
    return;
  }

  if (values.password !== values.passwordconfirmation) {
    message.error("As senhas não coincidem!");
    return;
  }

  if (!selectedDate || !selectedDate.isValid()) {
    message.error("Por favor, insira uma data de nascimento válida!");
    return;
  }

  console.log("Formulário enviado!", values);
  
  try {
    const formData = new FormData();
    
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("cpf", values.cpf);
    formData.append("birth_date", formatDate(selectedDate)); 
    formData.append("phone", values.phone);
    formData.append("user_type", "server");

    if (registerImage) {
      try {
        const file = await fetch(registerImage).then(r => r.blob());
        formData.append('profile_picture', file, 'profile.jpg');
      } catch (error) {
        console.error("Erro ao processar imagem de perfil:", error);
        message.error("Erro ao processar imagem de perfil");
        return;
      }
    }

    try {
      const defaultCoverImageUrl = "/cover.png";
      const coverFile = await fetch(defaultCoverImageUrl).then(r => r.blob());
      formData.append("cover_photo", coverFile, "cover.png");
    } catch (error) {
      console.error("Erro ao carregar imagem padrão:", error);
      message.error("Erro ao carregar imagem de capa");
      return;
    }

    const response = await fetch(`${URL_API}/api/createusers`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    
    if (response.ok) {
      message.success("Cadastro realizado com sucesso! Realize o login.", 8);
      router.push("/");
    } else {
      console.error("Erro do servidor:", data);
      const errorMsg = data.error || "Erro ao registrar";
      setErrorMessage(errorMsg);
      message.error(errorMsg);
    }
  } catch (error) {
    //console.error("Erro ao enviar dados:", error);
    setErrorMessage("Erro ao conectar com o servidor");
    message.error("Erro ao conectar com o servidor");
  }
};

  return (
    <Form
      labelCol={{ span: 1 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      className="ant-form-item"
      style={{ maxWidth: "600px" }}
      onFinish={RegisterServidor}
    >
      <div className="flex">
        <div className="mr-[75px]">
          <style.ParagraphStyled>
            Nome completo <strong className="text-red-500"> *</strong>
          </style.ParagraphStyled>
          <Form.Item<FieldType>
            name="full_name"
            rules={[{ required: true, message: "Por favor, insira o nome!" }]}
          >
            <style.InputEditForm className="w-[350px]" />
          </Form.Item>

          <style.ParagraphStyled className="mt-[3px] mb-[3px]">
            CPF <strong className="text-red-500"> *</strong>
          </style.ParagraphStyled>
          <Form.Item<FieldType>
            name="cpf"
            rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
          >
            <InputMask
                mask="999.999.999-99" // Máscara de CPF
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
            Foto <strong className="text-red-500"> *</strong>
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
          <style.ParagraphStyled className="mb-[3px]">
            Telefone <strong className="text-red-500"> *</strong>
          </style.ParagraphStyled>
          <Form.Item<FieldType>
            name="phone"
            rules={[{ required: true, message: "Por favor, insira o telefone!" }]}
          >
            <InputMask
                mask="(99) 99999-9999" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              >
                {({ onChange, value, ...rest }) => (
                  <style.InputEditPhone
                    {...rest}
                    value={value}
                    onChange={onChange}
                    id="phone"
                  />
                )}
              </InputMask>
          </Form.Item>
        </div>

        <div>
          <style.ParagraphStyled className="mb-[3px]">
            Data de nascimento <strong className="text-red-500"> * </strong>
          </style.ParagraphStyled>
          <Form.Item<FieldType> name="birth_date" style={{ marginRight: "8px" }}>
            <Space direction="vertical" size={12}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format={dateFormat}
                placeholder=""
                className="date-picker"
              />
            </Space>
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
            rules={[{ required: true, message: "Por favor, insira a senha!" }]}
          >
            <style.InputEditFormPass  />
          </Form.Item>
        </div>

        <div>
          <style.ParagraphStyled className="mb-[3px]">
            Confirmação de senha <strong className="text-red-500"> *</strong>
          </style.ParagraphStyled>
          <Form.Item<FieldType>
            name="passwordconfirmation"
            rules={[{ required: true, message: "Por favor, insira a confirmação da senha!" }]}
          >
            <style.InputEditFormPass className="w-[250px] bg-white" />
          </Form.Item>
        </div>
      </div>

      <div className="mb-[20px] flex">
        <Checkbox checked={checked} disabled={disabled} onChange={onChangeCheck} className="mr-[20px]" />
        <style.ParagraphStyled>
          Para prosseguir, clique no botão{" "}
          <strong className="text-customGreen">Aceitar Termos</strong> abaixo e
          confirme sua concordância com nossos termos de serviço e política de
          privacidade.
        </style.ParagraphStyled>
      </div>

      <div>
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
  );
};

export default NavServidor;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Checkbox, DatePicker, Form, Input, Button, Flex, Space, message } from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { ButtonLabelDate, DateBirthUpload, UploadButtonDate } from "./style";
import "./formEdited.css";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from 'next/navigation';

type FieldType = {
  name: string;
  cpf: string;
  email: string;
  photo: string;
  dateBirth: string;
  password: string;
  passwordconfirmation: string;
  telefone: string;
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

const NavServidor: React.FC<NavServidorProps> = ({ onRegister }) => {
  const [cpf, setCpf] = useState("");
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
    return date.format("YYYY-MM-DD"); // Formato PostgreSQL
  };

  const RegisterServidor = async (values: FieldType) => {
    console.log("Formulário enviado!", values);
    try {
      const formData = new FormData(); // Crie uma instância de FormData

      // Adicione todos os campos ao FormData
      formData.append("nome", values.name);
      formData.append("email", values.email);
      formData.append("senha", values.password);
      formData.append("cpf", values.cpf);
      formData.append("dataNascimento", formatDate(selectedDate!)); // Formata a data no padrão do PostgreSQL
      formData.append("telefone", values.telefone);
      formData.append("tipo_usuario", "servidor");

      // Adicione o arquivo da imagem
      if (registerImage) {
        const file = await fetch(registerImage).then((r) => r.blob()); // Obtenha o arquivo Blob da URL
        formData.append("foto", file, "photo.jpg"); // Nomeie o arquivo como você quiser
      }

      const response = await fetch("http://localhost:3002/api/createusers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/");
        message.success('Cadastro realizado com sucesso! Realize o login.'); 
      } else {
        console.error("Erro do servidor:", data);
        setErrorMessage(data.error || "Erro ao registrar");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setErrorMessage("Erro ao registrar");
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
            Foto <strong className="text-red-500"> *</strong>
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

      <div className="flex">
        <div className="mr-[50px]">
          <p className="mb-[3px]">
            Telefone <strong className="text-red-500"> *</strong>
          </p>
          <Form.Item<FieldType>
            name="telefone"
            rules={[{ required: true, message: "Por favor, insira o telefone!" }]}
          >
            <Input className="w-[250px]" />
          </Form.Item>
        </div>

        <div>
          <p className="mb-[3px]">
            Data de nascimento <strong className="text-red-500"> * </strong>
          </p>
          <Form.Item<FieldType> name="dateBirth" style={{ marginRight: "8px" }}>
            <Space direction="vertical" size={12}>
              <DatePicker
                value={selectedDate}
                format={dateFormat}
                onChange={handleDateChange}
                placeholder="Selecione a data"
                className="w-[250px]"
              />
            </Space>
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
            rules={[{ required: true, message: "Por favor, insira a senha!" }]}
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
            rules={[{ required: true, message: "Por favor, insira a confirmação da senha!" }]}
          >
            <Input.Password className="w-[250px] bg-white" />
          </Form.Item>
        </div>
      </div>

      <div className="mb-[20px] flex">
        <Checkbox checked={checked} disabled={disabled} onChange={onChangeCheck} className="mr-[20px]" />
        <p>
          Para prosseguir, por favor, clique no botão{" "}
          <strong className="text-customGreen">Aceitar Termos</strong> abaixo e
          confirme sua concordância com nossos termos de serviço e política de
          privacidade.
        </p>
      </div>

      <div className="mt-[40px]">
        <Flex gap="small" wrap>
          <Link href={"/"}>
            <Button className="w-[250px] mr-[40px] text-customGreen font-bold border-[1px] border-[#006b3f]">
              Voltar
            </Button>
          </Link>
          <Button type="primary" htmlType="submit" className="w-[250px] font-extrabold">
            Criar conta
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default NavServidor;

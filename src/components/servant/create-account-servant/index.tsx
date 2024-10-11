/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Checkbox, DatePicker, Form, Input, Button, Flex, Space} from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { ButtonLabelDate, DateBirthUpload, StyledForm, UploadButtonDate, } from "./style";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


type FieldType = {
  name: string;
  cpf: string;
  email: string;
  photo: string;
  dateBirth: string;
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

const dateFormat = 'DD/MM/YYYY';

const NavServidor: React.FC<NavServidorProps> = ({ onRegister }) => {
  const [value, setValue] = useState(1);
  const [cpf, setCpf] = useState("");
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [RegisterImage, setRegisterImage] = useState<string | undefined>(
    undefined
  );
  const onFinish = (values: FieldType) => {
    if (checked) {
      onRegister(values);
    } else {
      console.error("Você deve aceitar os termos e condições.");
    }
  };

  const handleRegisterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRegisterImage(imageUrl);
    }
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

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

  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(undefined);
  const handleDateChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      setSelectedDate(date);
    } else {
      setSelectedDate(undefined); 
    }
  };

  return (
    <StyledForm
      labelCol={{ span: 1 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      className="max-w-[600px]"
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

        <div >
          <p className="mb-[3px]">Foto <strong className="text-red-500"> *</strong> </p>
          <Form.Item<FieldType>
            name="photo"
          >
            <ButtonLabelDate htmlFor="registerImageUpload">
              <DateBirthUpload className="relative">
                <img
                  src={RegisterImage || "background-upload.png"}
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
            name="phone"
            rules={[
              { required: true, message: "Por favor, insira o telefone!" },
            ]}
          >
            <Input className="w-[250px]" />
          </Form.Item>
        </div>

        <div>
          <p className="mb-[3px]">
            Data de nascimento <strong className="text-red-500"> * </strong>
          </p>
            <Form.Item<FieldType>
              name="dateBirth"
              style={{ marginRight: "8px" }}
            >
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
          <Link href={"./inside"}>
            <Button htmlType="submit" className="w-[250px] font-extrabold" type="primary">
              Criar conta
            </Button>
          </Link>
        </Flex>
      </div>
    </StyledForm>
  );
};

export default NavServidor;

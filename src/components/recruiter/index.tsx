import React, { useState } from "react";
import { Checkbox, Form, Input, Button, Flex, Select } from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import {
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
  const [RegisterImage, setRegisterImage] = useState<string | undefined>(
    undefined
  );
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

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

            
          </div>

          <div>
            <p className="mb-[3px]">
              Foto <strong className="text-red-500"> *</strong>{" "}
            </p>
            <Form.Item<FieldType> name="photo">
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
        <div className="flex mb-2">
          <div className="mr-[50px]">
            <p className="mb-[3px]">
              Lotação <strong className="text-red-500"> *</strong>
            </p>
              <Select placeholder="Selecione uma lotação" className="w-[250px]">
                <Option value="PROGEP">PROGEP</Option>
                <Option value="PROAP">PROAP</Option>
                <Option value="PROPLAN">PROPLAN</Option>
                <Option value="PROGES">PROGES</Option>
                <Option value="PROEN">PROEN</Option>
                <Option value="PROEX">PROEX</Option>
                <Option value="PROINT">PROINT</Option>
              </Select>
          </div>

          <div>
            <p className="mb-[3px]">
              Campus <strong className="text-red-500"> * </strong>
            </p>
            <Select
              placeholder="Selecione o Campus"
              showSearch
              className="w-[250px]"
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
              <Button className="w-[250px] mr-[40px] text-customGreen font-bold border-[1px] border-[#006b3f]">
                Voltar
              </Button>
            </Link>
            <Link href={"./inside-recruiter"}>
              <Button type="primary" className="w-[250px] font-extrabold">
                Criar conta
              </Button>
            </Link>
          </Flex>
        </div>
      </StyledForm>
    </>
  );
};

export default NavRecrutador;

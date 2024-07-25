import React, { useState } from "react";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Upload,
  Button,
  Flex
} from "antd/lib";
import { PlusOutlined } from "@ant-design/icons/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { P2styled } from "./style";


type FieldType = {
  nome?: string;
  email?: string;
  password?: string;
};

type SizeType = Parameters<typeof Form>[0]["size"];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const NavServidor = () => {
  const [value, setValue] = useState(1);

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

  return (
      <Form
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        className="max-w-[600px]"
      >
          <div className="flex">
            <div className="mr-[100px]">
              <P2styled className="mb-[3px]">
                Nome completo <strong className="text-red-500"> *</strong>
              </P2styled>
              <Form.Item<FieldType>
                rules={[
                  { required: true, message: "Por favor, insira o nome!" },
                ]}
              >
                <Input className="w-[350px]"/>
              </Form.Item>

              <p className="mt-[3px] mb-[3px]">
                E-mail <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira o e-mail!" },
                ]}
              >
                <Input className="w-[350px]"/>
              </Form.Item>
            </div>

            <div>
              <p className="mb-[3px]">Foto (opcional) </p>
              <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{ border: 0, background: "none", width: "150px" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div className="mt-[8px]">Carregar</div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <div className="flex">
            <div className="mr-[50px]">
              <p className="mb-[3px]">
                Telefone <strong className="text-red-500"> *</strong>
              </p>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira o e-mail!" },
                ]}
              >
                <Input className="w-[250px]"/>
              </Form.Item>
            </div>

            <div>
              <p className="mb-[3px]">
                Data de nascimento <strong className="text-red-500"> * </strong>
              </p>
              <Form.Item>
                <DatePicker
                  className="w-[250px]"
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
                        Confirmação de senha{" "}
                        <strong className="text-red-500"> *</strong>
                      </p>
                      <Form.Item<FieldType>
                        name="password"
                        rules={[
                          {
                            required: true,
                            message:
                              "Por favor, insira a confirmação da senha!",
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
            <p>Para prosseguir, por favor, clique no botão{" "}
              <strong className="text-customGreen">Aceitar Termos</strong>{" "}
              abaixo e confirme sua concordância com nossos termos de serviço e
              política de privacidade.</p>
          </div>
          <div className="mt-[40px]">
            <Flex gap="small" wrap>
              <Link href={"/"}>
                <Button
                  className="w-[250px] mr-[40px] text-customGreen font-bold border-[1px] border-[#228B22]"
                >
                  Voltar
                </Button>
              </Link>
              <Link href={"./teste"}>
                <Button
                  type="primary"
                  className="w-[250px] font-extrabold"
                >
                  Criar conta
                </Button>
              </Link>
            </Flex>
          </div>
      </Form>
    
  );
};

export default NavServidor;
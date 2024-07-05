import React, { useState } from "react";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Upload,
  Button,
  Flex,
  ConfigProvider,
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
    <ConfigProvider theme={{ token: { colorPrimary: "#228B22" } }}>
      <Form
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 600 }}
      >
          <div style={{ display: "flex" }}>
            <div style={{ margin: "0px 100px 0px 0px" }}>
              <P2styled style={{ marginBottom: "3px" }}>
                Nome completo <strong style={{ color: "red" }}> *</strong>
              </P2styled>
              <Form.Item<FieldType>
                rules={[
                  { required: true, message: "Por favor, insira o nome!" },
                ]}
              >
                <Input style={{ width: 350, border: "1px solid #0059FD" }} />
              </Form.Item>

              <p style={{ marginBottom: "3px", marginTop: "3px" }}>
                E-mail <strong style={{ color: "red" }}> *</strong>
              </p>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira o e-mail!" },
                ]}
              >
                <Input style={{ width: 350, border: "1px solid #0059FD" }} />
              </Form.Item>
            </div>

            <div>
              <p style={{ marginBottom: "3px" }}>Foto (opcional) </p>
              <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{ border: 0, background: "none", width: "150px" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Carregar</div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "50px" }}>
              <p style={{ marginBottom: "3px" }}>
                Telefone <strong style={{ color: "red" }}> *</strong>
              </p>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: "Por favor, insira o e-mail!" },
                ]}
              >
                <Input style={{ width: 250, border: "1px solid #0059FD" }} />
              </Form.Item>
            </div>

            <div>
              <p style={{ marginBottom: "3px" }}>
                Data de nascimento <strong style={{ color: "red" }}> * </strong>
              </p>
              <Form.Item>
                <DatePicker
                  style={{ width: 250, border: "1px solid #0059FD" }}
                />
              </Form.Item>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "50px" }}>
              <p style={{ marginBottom: "3px" }}>
                Senha <strong style={{ color: "red" }}> *</strong>
              </p>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  { required: true, message: "Por favor, insira a senha!" },
                ]}
              >
                <Input.Password
                  style={{ width: 250, border: "1px solid #0059FD" }}
                />
              </Form.Item>
            </div>
            <div>
              <p style={{ marginBottom: "3px" }}>
                Confirmação de senha{" "}
                <strong style={{ color: "red" }}> *</strong>
              </p>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a confirmação da senha!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    width: 250,
                    border: "1px solid #0059FD",
                    background: "white",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <p style={{ marginBottom: "20px" }}>
            <Checkbox
              checked={checked}
              disabled={disabled}
              onChange={onChangeCheck}
            >
              Para prosseguir, por favor, clique no botão{" "}
              <strong style={{ color: "#228B22" }}>Aceitar Termos</strong>{" "}
              abaixo e confirme sua concordância com nossos termos de serviço e
              política de privacidade.
            </Checkbox>
          </p>
          <div style={{ marginTop: "40px" }}>
            <Flex gap="small" wrap>
              <Link href={"/"}>
                <Button
                  style={{
                    width: "250px",
                    marginRight: "40px",
                    color: "#228B22",
                    border: "1px solid #228B22",
                    fontWeight: "bold",
                  }}
                >
                  Voltar
                </Button>
              </Link>
              <Link href={"./teste"}>
                <Button
                  type="primary"
                  style={{ width: "250px", fontWeight: 800 }}
                >
                  Criar conta
                </Button>
              </Link>
            </Flex>
          </div>
      </Form>
    </ConfigProvider>
  );
};

export default NavServidor;

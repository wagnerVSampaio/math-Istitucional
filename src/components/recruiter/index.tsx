import React, { useState } from "react";
import { Checkbox, Form, Input, Button, Flex, ConfigProvider } from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { PStyled } from "./style";

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

const NavRecrutador = () => {
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
        <div>
          <PStyled>
            Nome <strong style={{ color: "red" }}> *</strong>
          </PStyled>
          <Form.Item<FieldType>
            rules={[{ required: true, message: "Por favor, insira o nome!" }]}
          >
            <Input style={{ border: "1px solid #0059FD" }} />
          </Form.Item>

          <p style={{ marginBottom: "3px", marginTop: "3px" }}>
            CNPJ <strong style={{ color: "red" }}> *</strong>
          </p>
          <Form.Item<FieldType>
            name="email"
            rules={[{ required: true, message: "Por favor, insira o e-mail!" }]}
          >
            <Input style={{ border: "1px solid #0059FD" }} />
          </Form.Item>
        </div>
        <p style={{ marginBottom: "20px", width: "570px" }}>
          <Checkbox
            checked={checked}
            disabled={disabled}
            onChange={onChangeCheck}
          >
            Para prosseguir, por favor, clique no botão{" "}
            <strong style={{ color: "#228B22" }}>Aceitar Termos</strong> abaixo
            e confirme sua concordância com nossos termos de serviço e política
            de privacidade.
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

export default NavRecrutador;

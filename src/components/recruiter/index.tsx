import React, { useState } from "react";
import { Checkbox, Form, Input, Button, Flex } from "antd/lib";
import Link from "next/link";
import type { CheckboxProps } from "antd/lib";
import { PStyled } from "./style";

type FieldType = {
  name?: string;
  cpf?: string;
  lotacao?: string;
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
      <> 
        <Form
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          className="max-w-[600px]"
        >
          <div>
            <PStyled>
              Nome <strong className="text-red-500"> *</strong>
            </PStyled>
            <Form.Item<FieldType>
              name="name"
              rules={[{ required: true, message: "Por favor, insira o nome!" }]}
            >
              <Input />
            </Form.Item>
  
            <p className="mt-[3px] mb-[3px]">
              CPF <strong className="text-red-500"> *</strong>
            </p>
            <Form.Item<FieldType>
              name="cpf"
              rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
            >
              <Input />
            </Form.Item>
            <p className="mt-[3px] mb-[3px]">
              Lotação atual <strong className="text-red-500"> *</strong>
            </p>
            <Form.Item<FieldType>
              name="lotacao"
              rules={[{ required: true, message: "Por favor, insira o CPF!" }]}
            >
              <Input />
            </Form.Item>
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
                  className="w-[250px] mr-[40px] text-customGreen font-bold border-[1px] border-[#006b3f]"
                >
                  Voltar
                </Button>
              </Link>
              <Link href={"./inside"}>
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
      </>
  );
};

export default NavRecrutador;
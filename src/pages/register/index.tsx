import React, { useState } from "react";
import { Radio } from "antd/lib";
import type { RadioChangeEvent } from "antd/lib";
import NavServidor from "@/components/servant";
import NavRecrutador from "@/components/recruiter";
import { Itens } from "./style";

const NavRegister = () => {
  const [value, setValue] = useState(1);

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
      <Itens className="flex items-center flex-col"
      >
        <h1 className="text-green-900 font-bold text-[27px] mb-[2px] mt-[20px]">
          Faça parte da nossa comunidade! Cadastre-se agora.
        </h1>
        <p className="text-customDark text-[14px] w-[570px] mb-[10px]">
          Para aproveitar ao máximo nosso sistema, preencha seus dados
          cadastrais. Os campos marcados com{" "}
          <strong className="text-red-500"> * </strong> são obrigatórios
        </p>
        <nav>
          <Radio.Group
            onChange={onChangeRadio}
            value={value}
            className="flex justify-center"
            >
            <Radio value={1} className="mr-[60px]">
              Servidor
            </Radio>
            <Radio value={2}> Recrutadores</Radio>
          </Radio.Group>
          {value === 1 ? <NavServidor /> : <NavRecrutador />}
        </nav>
      </Itens>
  );
};

export default NavRegister;
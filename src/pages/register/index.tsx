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
      <Itens style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      >
        <h1 style={{ fontSize: "27px", marginBottom: "2px", color: "#228B22" }}>
          Faça parte da nossa comunidade! Cadastre-se agora.
        </h1>
        <p className="text-customDark" style={{ fontSize: 14, width: "570px" }}>
          Para aproveitar ao máximo nosso sistema, preencha seus dados
          cadastrais. Os campos marcados com{" "}
          <strong style={{color: "#d31414"}}> * </strong> são obrigatórios
        </p>
        <nav>
          <Radio.Group
            onChange={onChangeRadio}
            value={value}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Radio value={1} style={{ marginRight: "60px" }}>
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
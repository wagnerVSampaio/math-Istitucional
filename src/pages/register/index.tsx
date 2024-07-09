import React, { useState } from "react";
import { ConfigProvider, Radio } from "antd/lib";
import type { RadioChangeEvent } from "antd/lib";
import NavServidor from "@/components/servant";
import NavRecrutador from "@/components/recruiter";

const NavRegister = () => {
  const [value, setValue] = useState(1);

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 className="#228B22" style={{ fontSize: "27px", marginBottom: "2px" }}>
          Faça parte da nossa comunidade! Cadastre-se agora.
        </h1>
        <p className="text-customDark" style={{ fontSize: 14, width: "570px" }}>
          Para aproveitar ao máximo nosso sistema, preencha seus dados
          cadastrais. Os campos marcados com{" "}
          <strong style={{ color: "red" }}> * </strong> são obrigatórios
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
      </div>
  );
};

export default NavRegister;
import React, { useState } from "react";
import type { RadioChangeEvent } from "antd/lib";
import NavServidor from "@/components/servant/create-account-servant";
import NavRecrutador from "@/components/recruiter/create-account";
import * as style from '@/style/register-style';
import HeaderOverall from "@/components/header-overall";


const NavRegister = () => {
  const [value, setValue] = useState(1);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
      <>
      <HeaderOverall/>
        <style.DivGeneral>
        <style.Itens className="flex items-center flex-col"
        >
          <style.H1Styled >
            Faça parte da nossa comunidade! Cadastre-se agora.
          </style.H1Styled>
          <style.PStyled>
            Para aproveitar ao máximo nosso sistema, preencha seus dados
            cadastrais. Os campos marcados com{" "}
            <strong className="text-red-500"> * </strong> são obrigatórios
          </style.PStyled>
          <style.StyledNav>
            <style.ResponsiveRadioGroup
              onChange={onChangeRadio}
              value={value}
              className="flex justify-center"
              >
              <style.LargeRadio value={1} >
                Servidor
              </style.LargeRadio>
              <style.LargeRadio value={2}> Recrutadores</style.LargeRadio>
            </style.ResponsiveRadioGroup>
            {value === 1 ? <NavServidor /> : <NavRecrutador />}
          </style.StyledNav>
        </style.Itens>
        </style.DivGeneral>
      </>
  );
};

export default NavRegister;
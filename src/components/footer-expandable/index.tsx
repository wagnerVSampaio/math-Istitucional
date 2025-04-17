import React from 'react';
import { DivFooter, FooterButton } from './style';
import Link from 'next/link';

const FooterExpandable = () => {
    return (
        <DivFooter>
            <h1 className='text-customDark font-bold p-[20px] text-[18px]'>Após clicar em Salvar, suas informações serão atualizadas</h1>
            <div className='pt-3'><Link href={''}><FooterButton>SALVAR</FooterButton></Link></div>
        </DivFooter>
    );
}

export default FooterExpandable;

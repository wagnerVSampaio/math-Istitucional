import React from 'react';
import { PageWrapper, Section, Title, Subtitle, Paragraph, List, ListItem } from '@/style/termsAndPrivacy-style';

const TermsAndPrivacy: React.FC = () => {
  return (
    <PageWrapper>
      {/* Termos e Condições */}
      <Section>
        <Title>Termos e Condições</Title>
        <Paragraph>Bem-vindo aos nossos Termos e Condições.</Paragraph>

        <Subtitle>1. Introdução</Subtitle>
        <Paragraph>Esses termos regulam o uso do nosso site e serviços...</Paragraph>

        <Subtitle>2. Definições</Subtitle>
        <Paragraph>Por nós, refere-se à empresa XYZ...</Paragraph>

        <Subtitle>3. Condições de Uso</Subtitle>
        <Paragraph>O uso do site é permitido para fins pessoais e não comerciais...</Paragraph>

        <Subtitle>4. Responsabilidades e Obrigações</Subtitle>
        <Paragraph>O usuário concorda em usar o site de forma legal...</Paragraph>
      </Section>

      {/* Política de Privacidade */}
      <Section>
        <Title>Política de Privacidade</Title>
        <Paragraph>Esta política descreve como coletamos e usamos seus dados.</Paragraph>

        <Subtitle>1. Informações Coletadas</Subtitle>
        <Paragraph>Coletamos dados como nome, e-mail, e cookies...</Paragraph>

        <Subtitle>2. Uso das Informações</Subtitle>
        <Paragraph>Usamos seus dados para melhorar nossos serviços...</Paragraph>

        <Subtitle>3. Compartilhamento de Dados</Subtitle>
        <Paragraph>Podemos compartilhar dados com parceiros...</Paragraph>

        <Subtitle>4. Segurança</Subtitle>
        <Paragraph>Adotamos medidas de segurança para proteger seus dados...</Paragraph>

        <List>
          <ListItem>Criptografia de dados.</ListItem>
          <ListItem>Políticas de acesso restrito.</ListItem>
        </List>
      </Section>
    </PageWrapper>
  );
};

export default TermsAndPrivacy;

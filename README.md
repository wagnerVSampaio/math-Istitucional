# Match Institutional - UFOPA

## Visão Geral do Projeto

A Plataforma Match Institutional é um sistema desenvolvido para mapear as competências e habilidades profissionais dos servidores da Universidade Federal do Oeste do Pará (UFOPA).
Tem como objetivo desenvolver uma plataforma para viabilizar políticas de gestão, dimensionamento, capacitação e qualificação de servidores com base em competências. O objetivo é apresentar o mapeamento dos perfis profissionais de forma intuitiva, com foco na qualidade da experiência do usuário e na segurança das informações.

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Instalando Dependências

Instale as dependências do projeto:

```bash
npm install
```

Certifique-se de que você também instala pacotes adicionais:

```bash
npm install react-icons
```

## Começando

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
```


Você pode começar a editar a página modificando `app/page.tsx`. A página é atualizada automaticamente à medida que o arquivo é editado.

Este projeto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para otimizar e carregar automaticamente o Inter, um tipo de letra personalizado do Google.


## Estrutura das pastas

```bash
match-institucional/
│
├── src/
│    ├── @types/
│    │      ├── react-input-mask.d.ts   
│    ├── app/
│    │      ├── page.tsx                        # Página inicial 
│    │      ├── style.ts                        # Estilização da página inicial
│    ├── components/
│    │      ├── adm/ 
│    │      │      ├── adm-approval/             # Página de aprovação de recrutador exibida no perfil do adm
│    │      │      ├── notification-adm/         # Página de notificação exibida no perfil do adm
│    │      │      ├── search-professionals/     # Página para gerenciar recrutadores exibida no perfil do adm
│    │      ├── favorites/                       # Funcionalidade não finalizada
│    │      ├── footer-expandable/               # Rodapé sendo chamado em pages/expandable/ 
│    │      ├── homepage/                        # Tela de início dentro do sistema
│    │      ├── help/                            # Tela de ajuda, o botão de acesso está na tela de login
│    │      ├── profile/                         # Tela de perfil exibida para os 3 usuários
│    │      ├── recruiter/ 
│    │      │      ├── add-jobs/                 # Página de adicionar vagas
│    │      │      ├── create-account/           # Página de criar conta do recrutador
│    │      │      ├── interested-user/          # Página para gerenciar candidatos inscritos nas vagas
│    │      │      ├── notification-recruiter/   # Página de notificação exibida no perfil do recrutador
│    │      │      ├── professionals/            # Página para buscar servidores
│    │      ├── servant/ 
│    │      │      ├── create-account-servant/   # Página de criar conta do servidor
│    │      │      ├── jobs/                     # Página para visualizar vagas disponíveis
│    │      │      ├── notification-servant/     # Página de notificação exibida no perfil do servidor
```
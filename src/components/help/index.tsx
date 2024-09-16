import React, { useState } from 'react'
import { 
    Container, Title, Question, Answer, FAQItem,
    HelpIcon
  } from './style';


function Help() {

    const [faqData, setFaqData] = useState([
        {
          question: "Como faço para criar uma conta?",
          answer: "Para criar uma conta, clique no botão de cadastro no canto superior direito e preencha o formulário."
        },
        {
          question: "Como posso redefinir minha senha?",
          answer: "Você pode redefinir sua senha clicando em 'Esqueci minha senha' na página de login."
        },
        {
          question: "Como alterar meus dados pessoais?",
          answer: "Você pode alterar seus dados acessando a área de perfil e editando suas informações pessoais."
        },
      ]);
    
  return (
    <>
    <Container>
      <div className='flex justify-center'><Title>Central de Ajuda</Title><HelpIcon /></div>
      {faqData.map((item, index) => (
        <FAQItem key={index}>
          <Question>{item.question}</Question>
          <Answer>{item.answer}</Answer>
        </FAQItem>
      ))}
      
    </Container>
    </>
  )
}

export default Help;
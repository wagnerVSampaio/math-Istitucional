import React from 'react';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <header className="text-4xl font-bold mb-4 text-gray-800">Bem-vindo ao Nosso Site!</header>
      <p className="text-lg text-gray-600 mb-8">Estamos felizes em te ver por aqui.</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Começar
      </button>
    </div>
  );
};

export default WelcomeScreen;

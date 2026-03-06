1. instalar o node.js express 
2. Ja dentro do vs code, e no terminal colocar npm create vite@latest
3. Depois escolher o nome do projeto, e a opção react como framework
3. Selecionar a opção de type script
4. Não para vite 8 beta
5. Sim para instalar npm and start now
6. Abrir o local
7. No main é onde onde tem o código do projeto, e o App.jsx é onde tem o código do componente principal, e o index.jsx é onde tem o código de renderização do componente principal
8. um componente é uma função que retorna um elemento JSX, e o JSX é uma sintaxe que permite escrever HTML dentro do JavaScript, e o React é uma biblioteca que permite criar interfaces de usuário de forma declarativa, e o ReactDOM é uma biblioteca que permite renderizar os componentes React no DOM
10. No App.tsx tem que deixar assim: 

function App() {
  return (
    <div className="App">
      <h1>Olá, mundo!</h1>
    </div>
  );
}

export default App;

11. tudo funciona como um componente. 
12. Fazer um componente dentro de outro componente:

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Olá, mundo!</h1>
      <img src={logo} alt=""/>
      <App/>
    </div>
  );
}

13. para criar um componente rapido é rafce
14. instalar a extensão do es7 react/ redux/ graphql/ react-native snippets
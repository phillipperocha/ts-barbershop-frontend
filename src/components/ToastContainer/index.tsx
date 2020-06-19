import React from 'react';
// Importaremos o useTransition que nos permitirá controlar a transiçao
// de um elemento quando ele entra eme tela e quando é removido.
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // Vamos criar a variável agora das nossas mensagens com as transições
  // E o método useTransition vai receber as mensagens,
  const messagesWithTransitions = useTransition(
    // Vai receber as mensagens
    messages,
    // veremos qual é a informação única de uma mensagem como segundo argumento
    (message) => message.id,
    // um objeto com algumas informações de CSS (poderia ser qualquer uma)
    {
      // a posição inicial da nossa mensagem, ou seja, vamos iniciar o toast fora da tela
      from: { right: '-120%', opacity: 0 },
      // Qual que vai ser a posição do elemento quando ele entrar na tela
      enter: { right: '0%', opacity: 1 },
      // E a estilização quando ele sair de tela
      leave: { right: '-120%', opacity: 0 },
    }
  );

  // E no map agora em vez de usar as messages vamos usar messagesWithTransitions
  // e no nosso map vamos mandar atributos diferentes e específicos.
  // e vamos mudar as props do toast, passando uma nova propriedade chamada style
  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;

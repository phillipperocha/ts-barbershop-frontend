import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Vamos dizer que ele recebe todas as propriedades do botão tradicional
// mais as seguintes propriedades. (podemos fazer isso com o &)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// E agora usaremos o loading, se ele existir mostraremos a mensagem loading
// se nao mostraremos o children
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Loading...' : children}
  </Container>
);

export default Button;

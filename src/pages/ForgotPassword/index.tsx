// Também importaremos o useState
import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  // Para o loading faremos um estado
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        // no começo da requisição colocaremos o laoding
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is mandatory')
            .email('Type an valid e-mail'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // recuperação se nha
        await api.post('/password/forgot', { email: data.email });

        // Adicionando toast
        addToast({
          type: 'success',
          title: 'Password Recovery E-mail sent',
          description: 'An e-mail to recover your password was sent.',
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Password Recovery Error',
          description:
            'An error has occured when you tried to recovery your password, please check your credentials.',
        });
        // E colocaremos no finally para trocar o loading pra false
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );

  // E vamos passar pro nosso componente de botão uma propriedade chamada loading
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Barbershop" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Pasword Recovery</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recovery
            </Button>
          </Form>

          <Link to="/signin">
            <FiLogIn />
            Back to login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;

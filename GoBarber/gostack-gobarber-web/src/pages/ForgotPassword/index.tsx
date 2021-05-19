import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { useToast } from '../../hooks/toast';
import { Container, Background, Content, AnimationContainer } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () =>{
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      api.post('/password/forgot', {
        email:data.email,
      });

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para confirmar a recuperação de senha',
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      //disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao fazer recuperação de senha, tente novamente',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return(
  <Container>
    <Content>
      <AnimationContainer>
        <img src={logoImg} alt="GoBarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar Senha</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Button loading={loading} type="submit">Recuperar</Button>
        </Form>

        <Link to="/signin">
          <FiLogIn />
          Voltar ao login
        </Link>
      </AnimationContainer>
    </Content>

    <Background />
  </Container>
  );
};

export default ForgotPassword;

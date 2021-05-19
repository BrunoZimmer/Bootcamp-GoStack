import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useLocation, useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { useToast } from '../../hooks/toast';
import { Container, Background, Content, AnimationContainer } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () =>{
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      // formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatório'),
        password_confirmation: Yup.string()
          .required('Confirmação de senha obrigatória')
          .oneOf([Yup.ref('password')], 'Senha precisa ser igual'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const token = location.search.replace('?token=', '');

      if (!token) {
        throw new Error();
      }

      await api.post('/password/reset', {
        password: data.password,
        password_confirmation: data.password_confirmation,
        token,
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      //disparar um toast
      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
      });
    }
  }, [addToast, history, location.search]);

  return(
  <Container>
    <Content>
      <AnimationContainer>
        <img src={logoImg} alt="GoBarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>

          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmação da senha"
          />

          <Button type="submit">Alterar senha</Button>
        </Form>
      </AnimationContainer>
    </Content>

    <Background />
  </Container>
  );
};

export default ResetPassword;

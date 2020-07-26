import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { LoginFormData } from '../../modules/auth/authTypes';
import { useAuth } from '../../modules/auth/AuthProvider';

const PageLogin = () => {
  const { login } = useAuth();
  const { t } = useTranslation('login');
  const { register, handleSubmit, errors } = useForm<LoginFormData>();

  const onSubmit = async (formData: LoginFormData) => {
    await login(formData);
  };

  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="login">{t('username')}</FormLabel>
            <Input
              id="username"
              name="username"
              placeholder={t('username')}
              ref={register({ required: true })}
              type="text"
            />
            {errors.username && (
              <FormErrorMessage>
                {t(['loginUnknownRequired', 'loginRequired'])}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">{t('password')}</FormLabel>
            <Input
              id="password"
              name="password"
              placeholder={t('password')}
              ref={register({ required: true })}
              type="password"
            />
            {errors.password && (
              <FormErrorMessage>{t('passwordRequired')}</FormErrorMessage>
            )}
          </FormControl>

          <Button variantColor="teal" type="submit">
            {t('submit')}
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default PageLogin;

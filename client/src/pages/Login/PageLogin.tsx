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
import { FullPageLoader } from '../../components/Loader/FullPageLoader';

const PageLogin = () => {
  const { login, loading } = useAuth();
  const { t } = useTranslation('common');
  const { register, handleSubmit, errors } = useForm<LoginFormData>();

  const onSubmit = async (formData: LoginFormData) => {
    await login(formData);
  };

  return (
    <>
      {loading && <FullPageLoader />}
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="login">{t('auth.username')}</FormLabel>
              <Input
                id="username"
                name="username"
                placeholder={t('auth.username')}
                ref={register({ required: true })}
                type="text"
              />
              {errors.username && (
                <FormErrorMessage>{t('auth.fieldRequired')}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">{t('auth.password')}</FormLabel>
              <Input
                id="password"
                name="password"
                placeholder={t('auth.password')}
                ref={register({ required: true })}
                type="password"
              />
              {errors.password && (
                <FormErrorMessage>{t('auth.fieldRequired')}</FormErrorMessage>
              )}
            </FormControl>

            <Button variantColor="teal" type="submit">
              {t('auth.login')}
            </Button>
          </Stack>
        </form>
      </Flex>
    </>
  );
};

export default PageLogin;

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

const PageLogin = () => {
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation('login');
  // eslint-disable-next-line no-console
  const onSubmit = () => console.log('Submit');

  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors.login}>
            <FormLabel htmlFor="login">{t('login')}</FormLabel>
            <Input
              id="login"
              name="login"
              placeholder={t('login')}
              ref={register({ required: true })}
              type="text"
            />
            {errors.login && (
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

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from '@chakra-ui/core';
import { TAccountCreatePanelFormData } from './AccountCreatePanel';

interface AccountCreateSubmitFormProps {
  onCancel: () => void;
  onSubmit: (formData: TAccountCreatePanelFormData) => void;
}

export const AccountCreateSubmitForm = ({
  onSubmit,
  onCancel,
}: AccountCreateSubmitFormProps) => {
  const titleInputRef = useRef<HTMLInputElement>();
  const { t } = useTranslation('common');
  const { register, handleSubmit, errors } = useForm<
    TAccountCreatePanelFormData
  >();

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Stack isInline width="100%" onKeyDown={onKeyDownHandler}>
        <Button variantColor="blue" type="submit" flexBasis="120px">
          {t('form.saveButton')}
        </Button>

        <Button variant="ghost" flexBasis="120px" onClick={() => onCancel()}>
          {t('form.cancelButton')}
        </Button>

        <FormControl isInvalid={!!errors.title} flex="1 1">
          <Input
            id="title"
            name="title"
            placeholder={t('accounts.titlePlaceholder')}
            ref={(e: HTMLInputElement) => {
              register(e, { required: true });
              titleInputRef.current = e;
            }}
            type="text"
          />
          {errors.title && (
            <FormErrorMessage>{t('form.fieldRequired')}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.amount} flex="1 1">
          <Input
            id="amount"
            name="amount"
            placeholder={t('accounts.amountPlaceholder')}
            ref={register({ required: true })}
            type="number"
          />
          {errors.amount && (
            <FormErrorMessage>{t('form.fieldRequired')}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
    </form>
  );
};

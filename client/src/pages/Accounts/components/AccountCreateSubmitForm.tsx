import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/core';
import isEmpty from 'lodash/isEmpty';
import { TAccountCreatePanelFormData } from './AccountCreatePanel';

interface AccountCreateSubmitFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (formData: TAccountCreatePanelFormData) => void;
}

export const AccountCreateSubmitForm = ({
  isOpen,
  onSubmit,
  onCancel,
}: AccountCreateSubmitFormProps) => {
  const titleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { t } = useTranslation('common');
  const { register, handleSubmit, errors } = useForm<
    TAccountCreatePanelFormData
  >();

  return (
    <Drawer
      isOpen={isOpen}
      initialFocusRef={titleInputRef}
      onClose={onCancel}
      placement="left"
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> {t('accounts.createTitle')}</DrawerHeader>
          <DrawerBody>
            <Stack spacing={3}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">
                  {t('accounts.titleLabel')}
                </FormLabel>
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

              <FormControl isInvalid={!!errors.amount}>
                <FormLabel htmlFor="amount">
                  {t('accounts.amountLabel')}
                </FormLabel>
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
          </DrawerBody>
          <DrawerFooter justifyContent="flex-start">
            <Button
              variantColor="blue"
              type="submit"
              mr={3}
              isDisabled={!isEmpty(errors)}
            >
              {t('form.saveButton')}
            </Button>

            <Button variant="outline" onClick={onCancel}>
              {t('form.cancelButton')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

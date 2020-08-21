import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
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
  InputGroup,
  InputRightAddon,
  Stack,
} from '@chakra-ui/core';
import isEmpty from 'lodash/isEmpty';
import { TAccountCreatePanelFormData } from './AccountCreatePanel';

interface TAccountCreateSubmitFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (formData: TAccountCreatePanelFormData) => void;
}

export const AccountCreateSubmitForm = ({
  isOpen,
  onSubmit,
  onCancel,
}: TAccountCreateSubmitFormProps) => {
  const titleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const { t } = useTranslation('common');
  const { register, handleSubmit, errors, control } = useForm<
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
                <InputGroup>
                  <Controller
                    decimalScale={2}
                    name="amount"
                    control={control}
                    placeholder={t('accounts.amountPlaceholder')}
                    rules={{ required: true }}
                    customInput={Input}
                    as={NumberFormat}
                  />
                  <InputRightAddon>{t('currency')}</InputRightAddon>
                </InputGroup>
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

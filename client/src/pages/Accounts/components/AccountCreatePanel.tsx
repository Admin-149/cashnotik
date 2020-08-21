import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/core';
import { AccountCreateSubmitForm } from './AccountCreateSubmitForm';
import { useCreateAccountMutation } from '../../../generated/graphql';

export interface TAccountCreatePanelFormData {
  amount: string;
  title: string;
}

export const AccountCreatePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('common');

  const [createAccount] = useCreateAccountMutation({
    update(cache, result) {
      cache.modify({
        fields: {
          accounts(existingAccounts = []) {
            return [...existingAccounts, result.data?.createAccount];
          },
        },
      });
    },
  });

  const onSubmit = async (formData: TAccountCreatePanelFormData) => {
    await createAccount({
      variables: {
        input: { amount: parseFloat(formData.amount), title: formData.title },
      },
    });
    onClose();
  };

  return (
    <>
      <Button leftIcon="add" onClick={onOpen} variantColor="blue">
        {t('accounts.createButton')}
      </Button>
      <AccountCreateSubmitForm
        isOpen={isOpen}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </>
  );
};

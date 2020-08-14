import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/core';
import { useMutation } from '@apollo/client';
import { TAccount, TCreateAccountInput } from '../accountTypes';
import { CREATE_ACCOUNT } from '../accountsQueries';
import { AccountCreateSubmitForm } from './AccountCreateSubmitForm';

export interface TAccountCreatePanelFormData {
  amount: string;
  title: string;
}

export const AccountCreatePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('common');

  const [createAccount] = useMutation<
    { createAccount: TAccount },
    { input: TCreateAccountInput }
  >(CREATE_ACCOUNT, {
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

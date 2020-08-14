import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/core';
import { useMutation } from '@apollo/client';
import { TAccount, TCreateAccountInput } from '../accountTypes';
import { CREATE_ACCOUNT } from '../accountsQueries';
import { AccountCreateSubmitForm } from './AccountCreateSubmitForm';

export interface TAccountCreatePanelFormData {
  amount: string;
  title: string;
}

export const AccountCreatePanel = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
    setIsEditMode(false);
  };

  return isEditMode ? (
    <AccountCreateSubmitForm
      onSubmit={onSubmit}
      onCancel={() => setIsEditMode(false)}
    />
  ) : (
    <Button onClick={() => setIsEditMode(true)} variantColor="blue">
      {t('accounts.createButton')}
    </Button>
  );
};

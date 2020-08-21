import {
  Heading,
  Text,
  useDisclosure,
  CloseButton,
  Flex,
} from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reference, useMutation } from '@apollo/client';
import { formatBalance } from '../../../lib/formatText/formatText';
import { TAccount } from '../accountTypes';
import { DELETE_ACCOUNT } from '../accountsQueries';
import { AlertMessage } from '../../../components/Modal/AlertMessage';

export const Account = ({ amount, title, id }: TAccount) => {
  const { t } = useTranslation('common');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteAccount] = useMutation<
    { deleteAccount: Pick<TAccount, 'id'> },
    { id: number }
  >(DELETE_ACCOUNT, {
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          accounts(existingAccounts: Reference[], { readField }) {
            return existingAccounts.filter(
              (account) => id !== readField<number>('id', account),
            );
          },
        },
      });
    },
  });

  const onDeleteConfirm = async () => {
    await deleteAccount();
    onClose();
  };

  return (
    <Flex
      justifyContent="space-between"
      padding="10px"
      maxWidth="500px"
      shadow="md"
      borderWidth="1px"
    >
      <AlertMessage
        title={t('accounts.alertDeleteTitle')}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDeleteConfirm}
      >
        {t('accounts.alertDeleteText')} <b>{title}</b>?
      </AlertMessage>
      <div>
        <Heading size="md">{title}</Heading>
        <Text>{`${formatBalance(amount)} ${t('currency')}`}</Text>
      </div>
      <CloseButton size="sm" onClick={onOpen} />
    </Flex>
  );
};

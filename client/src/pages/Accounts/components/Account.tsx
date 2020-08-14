import {
  Heading,
  IconButton,
  Box,
  Text,
  PseudoBox,
  useDisclosure,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reference, useMutation } from '@apollo/client';
import { formatBalance } from '../../../lib/formatText/formatText';
import { TAccount } from '../accountTypes';
import { DELETE_ACCOUNT } from '../accountsQueries';
import { ModalPopup } from '../../../components/Modal/Modal';

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

  const onConfirmClick = async () => {
    await deleteAccount();
    onClose();
  };

  return (
    <PseudoBox
      as={Box}
      display="flex"
      justifyContent="space-between"
      padding="10px"
      maxWidth="500px"
      shadow="md"
      borderWidth="1px"
    >
      <ModalPopup isOpen={isOpen} onClose={onClose} onConfirm={onConfirmClick}>
        {t('accounts.modalText')} <b>{title}</b>?
      </ModalPopup>
      <div>
        <Heading size="md">{title}</Heading>
        <Text>{`${formatBalance(amount)} ${t('currency')}`}</Text>
      </div>
      <IconButton
        size="xs"
        variant="ghost"
        aria-label="Delete account"
        icon="close"
        onClick={onOpen}
      />
    </PseudoBox>
  );
};

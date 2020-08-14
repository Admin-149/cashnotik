import { Heading, IconButton, Box, Text, PseudoBox } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reference, useMutation } from '@apollo/client';
import { formatBalance } from '../../../lib/formatText/formatText';
import { TAccount } from '../accountTypes';
import { DELETE_ACCOUNT } from '../accountsQueries';

export const Account = ({ amount, title, id }: TAccount) => {
  const [isHover, setHover] = useState<boolean>(false);
  const { t } = useTranslation('common');

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

  return (
    <PseudoBox
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      as={Box}
      display="flex"
      justifyContent="space-between"
      padding="10px"
      maxWidth="500px"
      shadow="md"
      borderWidth="1px"
    >
      <div>
        <Heading size="md">{title}</Heading>
        <Text>{`${formatBalance(amount)} ${t('currency')}`}</Text>
      </div>
      {isHover && (
        <IconButton
          variant="ghost"
          aria-label="Delete account"
          icon="delete"
          onClick={() => deleteAccount()}
        />
      )}
    </PseudoBox>
  );
};

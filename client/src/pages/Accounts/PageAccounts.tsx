import { Flex, Stack } from '@chakra-ui/core';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from './accountsQueries';
import { Account } from './components/Account';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';
import { AccountCreatePanel } from './components/AccountCreatePanel';
import { TAccountsData } from './accountTypes';

const PageAccounts = () => {
  const { data, loading } = useQuery<TAccountsData>(GET_ACCOUNTS);

  if (loading) return <FullPageLoader />;

  return (
    <Stack spacing={5}>
      <Flex>
        <AccountCreatePanel />
      </Flex>

      <Stack spacing={5} shouldWrapChildren>
        {data?.accounts.map((account) => (
          <Account key={account.id} {...account} />
        ))}
      </Stack>
    </Stack>
  );
};

export default PageAccounts;

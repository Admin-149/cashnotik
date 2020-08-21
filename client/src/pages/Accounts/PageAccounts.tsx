import { Flex, Stack } from '@chakra-ui/core';
import React from 'react';
import { Account } from './components/Account';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';
import { AccountCreatePanel } from './components/AccountCreatePanel';
import { useGetAccountsQuery } from '../../generated/graphql';

const PageAccounts = () => {
  const { data, loading } = useGetAccountsQuery();

  if (!data && loading) return <FullPageLoader />;

  return (
    <Stack spacing={5}>
      <Flex>
        <AccountCreatePanel />
      </Flex>

      <Stack spacing={5} shouldWrapChildren>
        {data?.accounts.map((account) =>
          !account ? null : <Account key={account.id} {...account} />,
        ) ?? null}
      </Stack>
    </Stack>
  );
};

export default PageAccounts;

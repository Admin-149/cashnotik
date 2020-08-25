import React from 'react';
import { Flex, Stack } from '@chakra-ui/core';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';
import { Category } from './components/Category';
import { CategoryCreatePanel } from './components/CategoryCreatePanel';
import { useGetCategoriesQuery } from '../../generated/graphql';

const PageCategories = () => {
  const { data, loading } = useGetCategoriesQuery();

  if (loading) return <FullPageLoader />;

  return (
    <Stack spacing={5}>
      <Flex>
        <CategoryCreatePanel />
      </Flex>

      <Stack spacing={5} shouldWrapChildren>
        {data?.categories.map((category) =>
          !category ? null : <Category key={category.id} {...category} />,
        )}
      </Stack>
    </Stack>
  );
};

export default PageCategories;

import React from 'react';
import { useQuery } from '@apollo/client';
import { Flex, Stack } from '@chakra-ui/core';
import { GET_CATEGORIES } from './categoriesQueries';
import { TCategoriesData } from './categoriesTypes';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';
import { Category } from './components/Category';
import { CategoryCreatePanel } from './components/CategoryCreatePanel';

const PageCategories = () => {
  const { data, loading } = useQuery<TCategoriesData>(GET_CATEGORIES);

  if (loading) return <FullPageLoader />;

  return (
    <Stack spacing={5}>
      <Flex>
        <CategoryCreatePanel />
      </Flex>

      <Stack spacing={5} shouldWrapChildren>
        {data?.categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </Stack>
    </Stack>
  );
};

export default PageCategories;

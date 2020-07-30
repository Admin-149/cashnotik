import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_OPERATIONS, TOperationsData } from './operationsQuery';

const PageOperations = () => {
  const { data } = useQuery<TOperationsData>(GET_OPERATIONS);

  return <>{data ? JSON.stringify(data) : 'Empty'}</>;
};

export default PageOperations;

import { gql } from '@apollo/client';

export interface TOperation {
  id: number;
  amount: number;
  date: Date;
  title: string;
}

export interface TOperationsData {
  operations: TOperation[];
}

export const GET_OPERATIONS = gql`
  query GetOperations {
    operations {
      id
      amount
      date
      title
    }
  }
`;

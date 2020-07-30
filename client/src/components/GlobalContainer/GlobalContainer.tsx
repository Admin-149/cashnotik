import { Flex, Box } from '@chakra-ui/core';
import React, { ReactNode } from 'react';

export const GlobalContainer = ({ children }: { children: ReactNode }) => (
  <Flex justifyContent="center" pt="10px">
    <Box width={['100%', '100%', '75%', '50%']}>{children}</Box>
  </Flex>
);

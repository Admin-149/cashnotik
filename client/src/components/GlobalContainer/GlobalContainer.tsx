import { Flex, Box } from '@chakra-ui/core';
import React, { ReactNode } from 'react';

export const GlobalContainer = ({ children }: { children: ReactNode }) => (
  <Flex justifyContent="center">
    <Box
      minHeight="100vh"
      width="100%"
      position="relative"
      p="52px 20px 10px 20px"
    >
      {children}
    </Box>
  </Flex>
);

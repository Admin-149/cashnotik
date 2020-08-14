import { Flex, Box } from '@chakra-ui/core';
import React, { ReactNode } from 'react';

export const GlobalContainer = ({ children }: { children: ReactNode }) => (
  <Flex justifyContent="center">
    <Box
      minHeight="100vh"
      width={['100%', '100%', '75%', '50%']}
      position="relative"
      pt="52px"
    >
      {children}
    </Box>
  </Flex>
);

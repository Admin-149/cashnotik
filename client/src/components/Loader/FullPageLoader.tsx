import { Flex } from '@chakra-ui/core';
import React from 'react';
import Loader from './Loader';

const FullPageLoader = () => (
  <Flex w="100vw" h="100vh" justify="center" align="center" color="white">
    <Loader />
  </Flex>
);

export default FullPageLoader;

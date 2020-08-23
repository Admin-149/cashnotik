import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, Text, Button, Flex } from '@chakra-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navItems } from './headerConstants';
import { TNavItem } from './headerTypes';
import { useAuth } from '../../modules/auth/AuthProvider';

export const Header = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const history = useHistory();
  const { pathname } = useLocation();
  const { authState, logout } = useAuth();

  useEffect(() => {
    navItems.forEach((item, index) => {
      if (item.route === pathname) {
        setTabIndex(index);
      }
    });
  }, [pathname]);

  const handleTabsChange = (index: number) =>
    history.push(navItems[index].route);

  const { t } = useTranslation('common');
  return (
    <Tabs
      index={tabIndex}
      onChange={handleTabsChange}
      position="fixed"
      width="100%"
      zIndex={1}
    >
      <TabList>
        {navItems.map((item: TNavItem) => (
          <Tab key={item.translation}>{t(item.translation)}</Tab>
        ))}
      </TabList>
      <Flex position="absolute" top="4px" right="10px" alignItems="center">
        <Text>{authState.username ?? ''}</Text>
        <Button variantColor="blue" size="sm" onClick={logout} ml="10px">
          {t('auth.logout')}
        </Button>
      </Flex>
    </Tabs>
  );
};

import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, Button } from '@chakra-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navItems } from './headerConstants';
import { TNavItem } from './headerTypes';
import { useAuth } from '../auth/AuthProvider';

export const Header = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useAuth();

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
    <Tabs align="center" index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        {navItems.map((item: TNavItem) => (
          <Tab key={item.translation}>{t(item.translation)}</Tab>
        ))}
      </TabList>
      <Button
        variantColor="teal"
        size="sm"
        position="absolute"
        top="4px"
        right="10px"
        onClick={logout}
      >
        {t('auth.logout')}
      </Button>
    </Tabs>
  );
};

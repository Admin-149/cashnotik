import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/core';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import CategoryIcons from './CategoryIcons';
import { TCategoryIcon } from '../categoriesTypes';

export interface TCategoryCreateFormData {
  icon: TCategoryIcon;
  title: string;
}

interface TCategoryCreateFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (formData: TCategoryCreateFormData) => void;
}

export const CategoryCreateForm = ({
  isOpen,
  onCancel,
  onSubmit,
}: TCategoryCreateFormProps) => {
  const titleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof CategoryIcons>(
    'default',
  );

  useEffect(() => {
    setSelectedIcon('default');
  }, [isOpen]);

  const { t } = useTranslation('common');
  const { register, handleSubmit, errors } = useForm<TCategoryCreateFormData>();

  return (
    <Drawer
      isOpen={isOpen}
      initialFocusRef={titleInputRef}
      onClose={onCancel}
      placement="left"
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> {t('categories.createTitle')}</DrawerHeader>
          <DrawerBody>
            <Stack spacing={3}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">
                  {t('categories.titleLabel')}
                </FormLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder={t('categories.titlePlaceholder')}
                  ref={(e: HTMLInputElement) => {
                    register(e, { required: true });
                    titleInputRef.current = e;
                  }}
                  type="text"
                />
                {errors.title && (
                  <FormErrorMessage>{t('form.fieldRequired')}</FormErrorMessage>
                )}
              </FormControl>
              <Box>
                <FormLabel htmlFor="icon">
                  {t('categories.iconLabel')}
                </FormLabel>
                <Input
                  id="icon"
                  isReadOnly
                  name="icon"
                  display="none"
                  ref={register}
                  value={selectedIcon}
                />
                <Flex flexWrap="wrap" maxHeight="150px" overflow="auto">
                  {(Object.keys(CategoryIcons) as Array<
                    keyof typeof CategoryIcons
                  >).map((iconName) => (
                    <IconButton
                      aria-label={iconName}
                      onClick={() => setSelectedIcon(iconName)}
                      icon={CategoryIcons[iconName]}
                      key={iconName}
                      variant={selectedIcon === iconName ? 'solid' : 'outline'}
                      m="5px"
                    />
                  ))}
                </Flex>
                <Flex alignItems="center">
                  <Text mr="5px">{t('categories.currentIconLabel')} - </Text>
                  <Box
                    as={CategoryIcons[selectedIcon]}
                    display="inline-block"
                    size="20px"
                    color="blue"
                  />
                </Flex>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter justifyContent="flex-start">
            <Button
              variantColor="blue"
              type="submit"
              mr={3}
              isDisabled={!isEmpty(errors)}
            >
              {t('form.saveButton')}
            </Button>

            <Button variant="outline" onClick={onCancel}>
              {t('form.cancelButton')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

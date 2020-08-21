import React from 'react';
import { Box, Flex, Heading, useDisclosure } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { Reference, useMutation } from '@apollo/client';
import { AlertMessage } from '../../../components/Modal/AlertMessage';
import { TCategory } from '../categoriesTypes';
import { DELETE_CATEGORY } from '../categoriesQueries';
import CategoryIcons from './CategoryIcons';
import { EntityContainer } from '../../../components/Entity/EntityContainer';

type TCategoryProps = TCategory;

export const Category = ({ id, title, icon }: TCategoryProps) => {
  const { t } = useTranslation('common');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteCategory] = useMutation<
    { deleteCategory: Pick<TCategory, 'id'> },
    { id: number }
  >(DELETE_CATEGORY, {
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          categories(existingCategories: Reference[], { readField }) {
            return existingCategories.filter(
              (category) => id !== readField<number>('id', category),
            );
          },
        },
      });
    },
  });

  const onDeleteConfirm = async () => {
    await deleteCategory();
    onClose();
  };

  return (
    <EntityContainer entity={{ id, title, icon }} onDeleteClick={onOpen}>
      <AlertMessage
        title={t('categories.alertDeleteTitle')}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDeleteConfirm}
      >
        {t('categories.alertDeleteText')} <b>{title}</b>?
      </AlertMessage>
      <Flex alignItems="center" width="100%">
        <Box
          as={CategoryIcons[icon] ?? CategoryIcons.default}
          display="inline-block"
          size="20px"
          mr="8px"
        />
        <Heading size="md">{title}</Heading>
      </Flex>
    </EntityContainer>
  );
};

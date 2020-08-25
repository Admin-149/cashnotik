import { Button, useDisclosure } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  CategoryCreateForm,
  TCategoryCreateFormData,
} from './CategoryCreateForm';
import { useCreateCategoryMutation } from '../../../generated/graphql';

export const CategoryCreatePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('common');

  const [createCategory] = useCreateCategoryMutation({
    update(cache, result) {
      cache.modify({
        fields: {
          categories(existingCategories = []) {
            return [...existingCategories, result.data?.createCategory];
          },
        },
      });
    },
  });

  const onSubmit = async (formData: TCategoryCreateFormData) => {
    await createCategory({
      variables: {
        input: {
          icon: formData.icon,
          title: formData.title,
        },
      },
    });
    onClose();
  };

  return (
    <>
      <Button leftIcon="add" onClick={onOpen} variantColor="blue">
        {t('categories.createButton')}
      </Button>

      <CategoryCreateForm
        isOpen={isOpen}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </>
  );
};

import { Button, useDisclosure } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import React from 'react';
import { CREATE_CATEGORY } from '../categoriesQueries';
import { TCategory, TCreateCategoryInput } from '../categoriesTypes';
import {
  CategoryCreateForm,
  TCategoryCreateFormData,
} from './CategoryCreateForm';

export const CategoryCreatePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('common');

  const [createCategory] = useMutation<
    { createCategory: TCategory },
    { input: TCreateCategoryInput }
  >(CREATE_CATEGORY, {
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

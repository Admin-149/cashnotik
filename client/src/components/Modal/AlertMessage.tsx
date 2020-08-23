import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ModalCloseButton,
} from '@chakra-ui/core';
import React, { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TAlertMessageProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export const AlertMessage = ({
  isOpen,
  onConfirm,
  onClose,
  children,
  title,
}: TAlertMessageProps) => {
  const { t } = useTranslation('common');
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <ModalCloseButton />
        <AlertDialogBody>{children}</AlertDialogBody>

        <AlertDialogFooter>
          <Button variantColor="blue" mr={3} onClick={onConfirm}>
            {t('form.confirmButton')}
          </Button>
          <Button ref={cancelRef} variant="ghost" onClick={onClose}>
            {t('form.cancelButton')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

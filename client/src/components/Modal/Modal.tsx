import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/core';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TModalPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children: ReactNode;
}

export const ModalPopup = ({
  isOpen,
  onConfirm,
  onClose,
  children,
}: TModalPopupProps) => {
  const { t } = useTranslation('common');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('attention')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button variantColor="blue" mr={3} onClick={onConfirm}>
            {t('form.confirmButton')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('form.cancelButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

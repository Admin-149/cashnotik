import { Flex, IconButton } from '@chakra-ui/core';
import React, { ReactNode } from 'react';
import { useHover } from '../../hooks/useHover';

export interface TEntityContainerProps<T> {
  onEditClick?: (entity: T) => void;
  onDeleteClick?: (entity: T) => void;
  children: ReactNode;
  entity: T;
}

export const EntityContainer = <T extends unknown>({
  children,
  onEditClick,
  onDeleteClick,
  entity,
}: TEntityContainerProps<T>) => {
  const [hoverRef, isHover] = useHover();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      pr="80px"
      maxWidth="500px"
      shadow="md"
      borderWidth="1px"
      position="relative"
      ref={hoverRef}
    >
      {children}
      {isHover && (
        <Flex alignItems="center" position="absolute" right="10px">
          {onEditClick && (
            <IconButton
              onClick={() => onEditClick(entity)}
              size="sm"
              icon="edit"
              variant="ghost"
              aria-label="Edit category"
            />
          )}
          {onDeleteClick && (
            <IconButton
              onClick={() => onDeleteClick(entity)}
              size="sm"
              icon="close"
              variant="ghost"
              aria-label="Delete category"
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

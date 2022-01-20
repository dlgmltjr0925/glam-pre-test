import {
  Dimensions,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useState,
} from 'react';

import { Color } from '../../../constants/Color';
import styled from 'styled-components/native';
import { useCallback } from 'react';
import { useEffect } from 'react';

interface Item {
  name: string;
  key: string;
}

interface DialogOptions {
  title: string;
  items: Item[];
  selectedItemKey?: string;
  onPress: (item: Item) => void;
}

export interface SelectDialogRef {
  open: (options: DialogOptions) => void;
}

export interface SelectDialogProps {}

function SelectDialog(
  props: SelectDialogProps,
  ref: ForwardedRef<SelectDialogRef>,
) {
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const open = useCallback((options: DialogOptions) => {
    setOptions(options);
    setVisible(true);
  }, []);

  const handlePressItem = useCallback(
    (item: Item) => {
      return () => {
        options?.onPress(item);
        setVisible(false);
      };
    },
    [options],
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content');
      if (visible) {
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.3)', true);
      } else {
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0)', true);
      }
    }
  }, [visible]);

  useEffect(() => {
    if (ref as MutableRefObject<SelectDialogRef>) {
      (ref as MutableRefObject<SelectDialogRef>).current = {
        open,
      };
    }
  }, [open, ref]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Dimmed>
        <DialogWrapper>
          <DialogTitleWrapper>
            <DialogTitle>{options?.title}</DialogTitle>
          </DialogTitleWrapper>
          <DialogList bounces={false} overScrollMode="never">
            {options?.items.map(item => (
              <DialogItem key={item.key} onPress={handlePressItem(item)}>
                <DialogItemName
                  isSelected={item.key === options?.selectedItemKey}>
                  {item.name}
                </DialogItemName>
              </DialogItem>
            ))}
          </DialogList>
        </DialogWrapper>
      </Dimmed>
    </Modal>
  );
}

export default forwardRef(SelectDialog);

const Dimmed = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const DialogWrapper = styled.View`
  width: ${Dimensions.get('screen').width * 0.7}px;
  max-height: 412px;
  background-color: ${Color.White};
  border-radius: 8px;
`;

const DialogTitleWrapper = styled.View`
  height: 60px;
  justify-content: center;
  align-items: center;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${Color.Gray1};
`;

const DialogTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Color.Black};
`;

const DialogList = styled.ScrollView``;

const DialogItem = styled.Pressable`
  height: 44px;
  padding-left: 16px;
  justify-content: center;
`;

const DialogItemName = styled.Text<{ isSelected: boolean }>`
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? Color.GlamBlue : Color.Black)};
`;

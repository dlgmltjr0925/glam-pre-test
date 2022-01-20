import { Image, Pressable, TextInput } from 'react-native';

import { Color } from '../../../constants/Color';
import React from 'react';
import styled from 'styled-components/native';

interface ProfileItemProps {
  editable?: boolean;
  label: string;
  value: string | null;
  isLock?: boolean;
  editType?: 'input' | 'select';
}

export default function ProfileItem({
  editable = true,
  label,
  value,
  isLock = false,
  editType = 'input',
}: ProfileItemProps) {
  return (
    <Wrapper>
      <LabelWrapper>
        <Label>{label}</Label>
      </LabelWrapper>
      <ValueWrapper>
        {!editable ? (
          <ValueText>{value}</ValueText>
        ) : editType === 'input' ? (
          <ValueTextInput
            value={value || ''}
            placeholder="입력해주세요"
            placeholderTextColor={Color.Gray2}
          />
        ) : (
          <Pressable>
            {value ? (
              <ValueText>{value}</ValueText>
            ) : (
              <Placeholder>선택해주세요</Placeholder>
            )}
          </Pressable>
        )}
        {isLock && (
          <LockIcon
            source={require('../../../assets/icon/profile_edit/lock.png')}
          />
        )}
      </ValueWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  flex-direction: row;
  align-items: center;
  height: 44px;
`;

const LabelWrapper = styled.View`
  flex: 3.5;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${Color.Black};
`;

const ValueWrapper = styled.View`
  flex: 6.5;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

const ValueText = styled.Text`
  font-size: 16px;
  color: ${Color.GlamBlue};
`;

const ValueTextInput = styled.TextInput`
  font-size: 16px;
  color: ${Color.GlamBlue};
  padding-left: 0;
`;

const Placeholder = styled.Text`
  font-size: 16px;
  color: ${Color.Gray2};
`;

const LockIcon = styled.Image`
  margin-left: 4px;
`;

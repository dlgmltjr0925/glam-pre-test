import { Color } from '../../../constants/Color';
import React from 'react';
import styled from 'styled-components/native';

export interface ProfileIntroductionProps {
  value: string | null;
  onChangeText?: (text: string) => void;
}

export default function ProfileIntroduction({
  value,
  onChangeText,
}: ProfileIntroductionProps) {
  return (
    <Wrapper>
      <Label>소개</Label>
      <ValueTextInput
        multiline
        value={value || ''}
        placeholder="회원님의 매력을 간단하게 소개해주세요"
        onChangeText={onChangeText}
      />
      <Guide>SNS 아이디 등 연락처 입력 시 서비스 이용 제한됩니다</Guide>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  padding-left: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  line-height: 35px;
  color: ${Color.Black};
`;

const ValueTextInput = styled.TextInput`
  font-size: 16px;
  color: ${Color.GlamBlue};
  padding: 0;
`;

const Guide = styled.Text`
  font-size: 12px;
  line-height: 30px;
  color: ${Color.Gray4};
`;

import React, { Suspense } from 'react';

import { Color } from '../../constants/Color';
import { Dimensions } from 'react-native';
import EditProfileDetail from './components/EditProfileDetail';
import KeyboardAwareScrollView from '../../components/common/KeyboardAwareScrollView';
import StackView from '../../components/navigation/stack-navigator/StackView';
import styled from 'styled-components/native';

export default function EditProfileScreen() {
  return (
    <StackView title="프로필 수정">
      <Container>
        <Suspense fallback={<Skeleton />}>
          <EditProfileDetail />
        </Suspense>
      </Container>
    </StackView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

const Skeleton = styled.View`
  height: ${(Dimensions.get('screen').width * 2) / 3}px;
  background-color: ${Color.Gray0};
`;

import { Image, Platform } from 'react-native';
import React, { PropsWithChildren, useCallback } from 'react';

import { Color } from '../../../constants/Color';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StackViewProps {
  title: string;
}

export default function StackView({
  title,
  children,
}: PropsWithChildren<StackViewProps>) {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container style={{ paddingTop: top }}>
      <Header>
        <HeaderLeft>
          <BackButton onPress={handlePressBack}>
            <Image
              source={require('../../../assets/icon/profile_edit/back.png')}
            />
          </BackButton>
          {Platform.OS === 'android' && <Title>{title}</Title>}
        </HeaderLeft>
        {Platform.OS === 'ios' && <Title>{title}</Title>}
      </Header>
      <Body>{children}</Body>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Color.White};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding: 0 3px;
  align-items: center;
  justify-content: center;
`;

const HeaderLeft = styled.View`
  position: absolute;
  top: 0;
  left: 3px;
  height: 40px;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  margin-top: 3px;
  font-size: 17px;
  font-weight: 600;
  color: ${Color.Black};
`;

const Body = styled.View`
  flex: 1;
`;

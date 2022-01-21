import Animated, {
  WithTimingConfig,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CARD_HEIGHT, CARD_WIDTH } from './IntroductionCard';
import React, { useEffect } from 'react';

import { Color } from '../../../constants/Color';
import styled from 'styled-components/native';

const config: WithTimingConfig = {
  duration: 1000,
};

export default function MainSkeleton() {
  const width1 = useSharedValue<number>(20);
  const width2 = useSharedValue<number>(50);
  const width3 = useSharedValue<number>(50);

  const style1 = useAnimatedStyle(() => ({ width: width1.value }));
  const style2 = useAnimatedStyle(() => ({ width: width2.value }));
  const style3 = useAnimatedStyle(() => ({ width: width3.value }));

  useEffect(() => {
    width1.value = withTiming(100, config);
    width2.value = withTiming(180, config);
    width3.value = withTiming(150, config);
  }, [width1, width2, width3]);

  return (
    <Container>
      <Info style={style1} />
      <Info style={style2} />
      <Info style={style3} />
    </Container>
  );
}

const Container = styled.View`
  align-self: center;
  margin: 12px 0 0;
  padding: 0 0 60px 16px;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${Color.Gray0};
  justify-content: flex-end;
`;

const Info = styled(Animated.View)`
  margin-top: 10px;
  height: 10px;
  background-color: #f2f2f2;
`;

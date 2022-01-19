import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;

const TopTabBodyItem = styled.View`
  flex: 1;
  width: ${width};
`;

export default TopTabBodyItem;

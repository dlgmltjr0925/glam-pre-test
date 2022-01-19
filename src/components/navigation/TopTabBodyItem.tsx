import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const TopTabBodyItem = styled.View`
  flex: 1;
  width: ${Dimensions.get('screen').width}px;
`;

export default TopTabBodyItem;

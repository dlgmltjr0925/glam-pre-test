import { ImageSourcePropType } from 'react-native';
import React from 'react';

export interface Options {
  title?: string;
  icon?: ImageSourcePropType;
}

export interface ScreenProps {
  name: string;
  component: React.ComponentType<any>;
  options?: Options;
}

export default function Screen({}: ScreenProps) {
  return null;
}

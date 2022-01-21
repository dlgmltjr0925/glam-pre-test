import {
  HostComponent,
  Keyboard,
  KeyboardEventListener,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  TextInput,
  ViewStyle,
} from 'react-native';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  style?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
}

const IS_IOS = Platform.OS === 'ios';

export default function KeyboardAwareScrollView({
  children,
  ...props
}: PropsWithChildren<KeyboardAwareScrollViewProps>) {
  const scrollViewRef = useRef(null);
  const layoutRef = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const offsetY = useSharedValue<number>(0);
  const footer = useSharedValue<number>(0);

  const _handleLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      layoutRef.current = layout;
    },
    [],
  );

  const _handleScroll = useCallback(
    ({ nativeEvent: { contentOffset } }) => {
      offsetY.value = contentOffset.y;
    },
    [offsetY],
  );

  /**
   * 키보드가 보여질 때 키보드와 입력창이 겹쳐지지 않도록 스크롤 이동
   */
  const _handleKeyboardShow: KeyboardEventListener = useCallback(
    ({ endCoordinates }) => {
      if (IS_IOS) {
        const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
        if (!currentlyFocusedInput || !scrollViewRef.current) return;
        currentlyFocusedInput.measureLayout(
          scrollViewRef.current as unknown as HostComponent<unknown>,
          (left: number, top: number, width: number, height: number) => {
            const offset =
              top -
              (layoutRef.current.height - endCoordinates.height - height - 20);
            footer.value = endCoordinates.height;
            setTimeout(() => {
              if (scrollViewRef.current) {
                if (offsetY.value < offset) {
                  (scrollViewRef.current as ScrollView).scrollTo({
                    y: offset,
                  });
                }
              }
            }, 10);
          },
          () => {},
        );
      }
    },
    [footer, offsetY],
  );

  const _handleKeyboardHide: KeyboardEventListener = useCallback(() => {
    if (IS_IOS) {
      footer.value = withTiming(0);
    }
  }, [footer]);

  const animatedStyle = useAnimatedStyle(() => ({ height: footer.value }));

  useEffect(() => {
    const showEventName = 'keyboardWillShow';
    const hideEventName = 'keyboardWillHide';

    const showSubscription = Keyboard.addListener(
      showEventName,
      _handleKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      hideEventName,
      _handleKeyboardHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [_handleKeyboardHide, _handleKeyboardShow]);

  return (
    <Reanimated.ScrollView
      ref={scrollViewRef}
      onLayout={_handleLayout}
      onScroll={_handleScroll}
      scrollEventThrottle={16}
      {...props}>
      {children}
      <Reanimated.View style={animatedStyle} />
    </Reanimated.ScrollView>
  );
}

import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";

const SIZE = 50;

export default function App() {
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);
  const offsetXBoundary = useSharedValue<number>(0);
  const offsetYBoundary = useSharedValue<number>(0);
  const backgroundColor = useSharedValue<string>("#dc1212");
  const deceleration = 0.9999;
  const prevOffsetX = useSharedValue<number>(0);
  const prevOffsetY = useSharedValue<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.width;
    offsetXBoundary.value = width.value / 2 - SIZE / 2;
    offsetYBoundary.value = height.value - SIZE;
  };

  useFrameCallback(({ timeSincePreviousFrame }) => {
    //timeSincePreviousFrame is in ms
    if (Math.abs(offsetX.value) === offsetXBoundary.value) {
      offsetX.value = withDecay({
        velocity:
          (-(offsetX.value - prevOffsetX.value) / timeSincePreviousFrame) *
          1000,
        deceleration,
        rubberBandEffect: false,
        clamp: [-offsetXBoundary.value, offsetXBoundary.value],
      });
    }
    if (Math.abs(offsetY.value) === offsetYBoundary.value) {
      offsetY.value = withDecay({
        velocity:
          (-(offsetY.value - prevOffsetY.value) / timeSincePreviousFrame) *
          1000,
        deceleration,
        rubberBandEffect: false,
        clamp: [-offsetYBoundary.value, offsetYBoundary.value],
      });
    }
    prevOffsetX.value = offsetX.value;
    prevOffsetY.value = offsetY.value;
  });

  const pan = Gesture.Pan()
    .onBegin((event) => {
      backgroundColor.value = withTiming("#12dc4f", { duration: 0 });
    })
    .onChange((event) => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeY;
    })
    .onFinalize((event) => {
      offsetX.value = withDecay({
        velocity: event.velocityX,
        deceleration,
        rubberBandEffect: false,
        clamp: [-offsetXBoundary.value, offsetXBoundary.value],
      });
      offsetY.value = withDecay({
        velocity: event.velocityY,
        deceleration,
        rubberBandEffect: false,
        clamp: [-offsetYBoundary.value, offsetYBoundary.value],
      });
      backgroundColor.value = withTiming("#dc1212", { duration: 0 });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    backgroundColor: backgroundColor.value,
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    borderRadius: "50%",
    cursor: "grab",
    alignItems: "center",
    justifyContent: "center",
  },
});

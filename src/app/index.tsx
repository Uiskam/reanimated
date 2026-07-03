import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

// Letters and numbers are completely separated by spaces
// 26 pure numbers for the circle
const CIRCLE_COORDS = [
  25, 50, 10, 50, 0, 40, 0, 25, 0, 10, 10, 0, 25, 0, 40, 0, 50, 10, 50, 25, 50,
  40, 40, 50, 25, 50,
];

// 26 pure numbers for the line (all Y-values flattened to 25)
const LINE_COORDS = [
  25, 25, 10, 25, 0, 25, 0, 25, 0, 25, 10, 25, 25, 25, 40, 25, 50, 25, 50, 25,
  50, 25, 40, 25, 25, 25,
];

export default function App() {
  const coords = useSharedValue(CIRCLE_COORDS);

  useEffect(() => {
    // Reanimated effortlessly interpolates every number in this array simultaneously!
    coords.value = withRepeat(
      withTiming(LINE_COORDS, { duration: 1000 }),
      -1,
      true,
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const c = coords.value;
    // Reconstruct the SVG path string on the fly every frame
    return {
      d: `M${c[0]} ${c[1]}C${c[2]} ${c[3]} ${c[4]} ${c[5]} ${c[6]} ${c[7]} ${c[8]} ${c[9]} ${c[10]} ${c[11]} ${c[12]} ${c[13]} ${c[14]} ${c[15]} ${c[16]} ${c[17]} ${c[18]} ${c[19]} ${c[20]} ${c[21]} ${c[22]} ${c[23]} ${c[24]} ${c[25]}`,
    };
  });
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="-25 0 100 100">
        <AnimatedPath
          fill="#b58df100"
          stroke="#d40909"
          strokeWidth="2"
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
  },
});

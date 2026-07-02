import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LINE = "M 0 0 L 50 0";
const CIRCLE =
  "M25 50C10 50 0 40 0 25 0 10 10 0 25 0 40 0 50 10 50 25 50 40 40 50 25 50";

export default function App() {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="-25 0 100 100">
        <AnimatedPath
          fill="#b58df100"
          stroke="#d40909"
          strokeWidth="2"
          d={CIRCLE}
          animatedProps={{
            animationName: {
              from: { d: CIRCLE },
              to: { d: LINE },
            },
            animationDuration: "2s",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationTimingFunction: "ease-in-out",
          }}
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

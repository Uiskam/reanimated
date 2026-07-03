import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

function GetPlanet(
  radius: number,
  style: any,
  rotationTime: number,
  reverseOrbit: boolean,
) {
  const reverseCoef = reverseOrbit ? 1 : -1;
  const netRadius = radius * reverseCoef;
  const position = useSharedValue(-netRadius);
  const zIndex = useSharedValue(1);

  useEffect(() => {
    position.value = withRepeat(
      withSequence(
        withTiming(
          netRadius,
          {
            duration: rotationTime,
            easing: Easing.linear,
          },
          () => {
            console.log(`zIndex before ${zIndex.value}`);
            zIndex.value = -1 * zIndex.value;
            console.log(`zIndex after ${zIndex.value}`);
          },
        ),
        withTiming(
          -netRadius,
          {
            duration: rotationTime,
            easing: Easing.linear,
          },
          () => {
            zIndex.value = -1 * zIndex.value;
          },
        ),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
      zIndex: zIndex.value,
    };
  });

  return <Animated.View style={[style, animatedStyle]} />;
}

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.sun} />
      {GetPlanet(100, styles.mars, 2500, true)}
      {GetPlanet(150, styles.earth, 4750, false)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sun: {
    position: "absolute",
    borderRadius: "50%",
    width: 100,
    height: 100,
    backgroundColor: "rgb(233, 206, 52)",
    zIndex: 0,
  },
  mars: {
    position: "absolute",
    borderRadius: "50%",
    width: 25,
    height: 25,
    backgroundColor: "rgb(210, 95, 13)",
  },
  earth: {
    position: "absolute",
    borderRadius: "50%",
    width: 40,
    height: 40,
    backgroundColor: "rgb(33, 210, 13)",
  },
});

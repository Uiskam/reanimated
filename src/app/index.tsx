import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

function GetPlanet(
  radius: number,
  style: any,
  rotationTime: number,
  reverseOrbit: boolean,
) {
  const angle = useSharedValue(0);
  const reverseCoef = reverseOrbit ? 1 : -1;

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(reverseCoef * 2 * Math.PI, {
        duration: rotationTime,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: radius * Math.cos(angle.value) },
        { translateY: radius * Math.sin(angle.value) },
      ],
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
    backgroundColor: "rgb(218, 247, 73)",
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

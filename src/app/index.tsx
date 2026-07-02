import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

function GetPlanet(
  radius: number,
  style: any,
  rotationTime: number,
  reverseOrbit: boolean,
) {
  return (
    <Animated.View
      style={[
        style,
        {
          animationName: {
            "0%": {
              transform: [{ rotate: "0deg" }, { translateX: radius }],
            },
            "100%": {
              transform: [
                { rotate: reverseOrbit ? "-360deg" : "360deg" },
                { translateX: radius },
              ],
            },
          },
          animationDuration: rotationTime,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        },
      ]}
    />
  );
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

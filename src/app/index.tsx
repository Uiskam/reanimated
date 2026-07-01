import { Button, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function Index() {
  const sharedWidth = useSharedValue(100);

  const handlePress = () => {
    sharedWidth.value = withSpring(Math.random() * 100 + 50);
  }
  return (
    <View style={styles.container}>
        <Animated.View
        style={{
          width: sharedWidth,
          height: 100,
          backgroundColor: 'violet',
        }}/>
      <Button onPress={handlePress} title="Click me"/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

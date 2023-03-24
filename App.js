import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
// import LoginScreen from './Screens/LoginScreen';
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <LoginScreen/> */}
      <RegistrationScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
});

import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import useRoute from "./router";
import 'react-native-gesture-handler';


export default function App() {
  const [loaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const routing = useRoute(true);

  return (
    <NavigationContainer>
     {routing}
    </NavigationContainer>
  );
};
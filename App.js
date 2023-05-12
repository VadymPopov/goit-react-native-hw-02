import  Main  from "./components/Main";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";

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
    <Provider store={store}>
      <Main/>
    </Provider>
  );
};
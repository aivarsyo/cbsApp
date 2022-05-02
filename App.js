import { StyleSheet, Text, View } from "react-native";
import NavigationComponent from "./components/Navigation";
import { Provider } from "react-redux";
import { Store } from "./store/store";

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationComponent />
    </Provider>
  );
}

const styles = StyleSheet.create({});

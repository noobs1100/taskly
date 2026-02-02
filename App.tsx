import { StyleSheet, Text, View } from "react-native";
import { theme } from "./theme";
import { ShoppingListItem } from "./components/ShoppingList";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="Milk" />
      <ShoppingListItem name="Coffee" isCompleated />
      <ShoppingListItem name="Suger" />
      <ShoppingListItem name="linus" isCompleated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
});

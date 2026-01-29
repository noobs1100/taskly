import { TouchableOpacity, View, Alert, StyleSheet, Text } from "react-native";
import { theme } from "../theme";

type Props = {
  name: string;
};

export function ShoppingListItem({ name }: Props) {
  const handleDelete = () => {
    Alert.alert("you sure you want it deleated", "it will be gone for good", [
      {
        text: "yes",
        onPress: () => console.log("ok deleting"),
        style: "destructive",
      },
      { text: "cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemcontainer}>
        <Text style={styles.itemText}>contents</Text>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>delete</Text>
        </TouchableOpacity>
      </View>
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
  itemcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
  },
  itemText: {
    fontWeight: "200",
    fontSize: 18,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 6,
    borderRadius: 8,
    margin: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

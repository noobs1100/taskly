import { TouchableOpacity, View, Alert, StyleSheet, Text } from "react-native";
import { theme } from "../theme";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  name: string;
  isCompleated?: boolean;
};

export function ShoppingListItem({ name, isCompleated }: Props) {
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
    <View
      style={[
        styles.itemcontainer,
        isCompleated ? styles.compleatedContainer : undefined,
      ]}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleated ? "check" : "circle"}
          size={24}
          color={isCompleated ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[
            styles.itemText,
            isCompleated ? styles.compleatedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} hitSlop={20}>
        <MaterialIcons
          name="delete-forever"
          size={24}
          color={isCompleated ? theme.colorGrey : theme.colorBlack}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemcontainer: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
  },
  itemText: {
    fontWeight: "400",
    fontSize: 20,
    marginLeft: 8,
    flex: 1,
  },
  compleatedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  compleatedText: {
    color: theme.colorGrey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    fontWeight: "300",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});

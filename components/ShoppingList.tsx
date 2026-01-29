import { TouchableOpacity, View, Alert, StyleSheet, Text } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

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
      <Text
        style={[
          styles.itemText,
          isCompleated ? styles.compleatedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity onPress={handleDelete} hitSlop={6}>
        <AntDesign
          name="close-circle"
          size={20}
          color={isCompleated ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
  },
  itemText: {
    fontWeight: "200",
    fontSize: 20,
  },
  compleatedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  compleatedText: {
    color: theme.colorGrey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
});

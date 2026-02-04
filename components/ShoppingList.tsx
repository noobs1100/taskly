import {
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { theme } from "../theme";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  name: string;
  isCompleated?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleated,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert("you sure you want it deleated", "it will be gone for good", [
      {
        text: "yes",
        onPress: () => onDelete(),
        style: "destructive",
      },
      { text: "cancel", style: "cancel" },
    ]);
  };

  return (
    <Pressable
      style={[
        styles.itemcontainer,
        isCompleated ? styles.compleatedContainer : undefined,
      ]}
      onPress={onToggleComplete}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemcontainer: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginVertical: 2,
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

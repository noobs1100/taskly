import { StyleSheet, TextInput, FlatList, LayoutAnimation } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingList";
import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";
import * as Haptics from "expo-haptics";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  compleatedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "add something", lastUpdatedTimestamp: 1 },
];

export default function App() {
  const [ShoppingList, setShoppingList] = useState(initialList);
  const [value, setValue] = useState<string>();

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);
      }
    };

    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...ShoppingList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
      setValue(undefined);
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = ShoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    saveToStorage(storageKey, newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = ShoppingList.map((item) => {
      if (item.id === id) {
        if (item.compleatedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
        return {
          ...item,
          compleatedAtTimestamp: item.compleatedAtTimestamp
            ? undefined
            : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      } else {
        return item;
      }
    });
    saveToStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      ListHeaderComponent={
        <TextInput
          value={value}
          style={styles.textInput}
          onChangeText={setValue}
          placeholder="E.g Coffee"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      data={orderShoppingList(ShoppingList)}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleated={Boolean(item.compleatedAtTimestamp)}
        />
      )}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((i1, i2) => {
    if (i1.compleatedAtTimestamp && i2.compleatedAtTimestamp) {
      return i2.compleatedAtTimestamp - i1.compleatedAtTimestamp;
    }

    if (i1.compleatedAtTimestamp && !i2.compleatedAtTimestamp) {
      return 1;
    }

    if (!i1.compleatedAtTimestamp && i2.compleatedAtTimestamp) {
      return -1;
    }

    if (!i1.compleatedAtTimestamp && !i2.compleatedAtTimestamp) {
      return i2.lastUpdatedTimestamp - i1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: theme.colorGrey,
    borderWidth: 2,
    padding: 12,
    fontSize: 20,
    borderRadius: 50,
    marginHorizontal: 12,
    marginTop: 4,
    marginBottom: 12,
  },
});

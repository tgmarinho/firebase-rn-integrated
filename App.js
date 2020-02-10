import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import Todo from "./Todo";
import firestore from "@react-native-firebase/firestore";
import { Appbar, TextInput, Button } from "react-native-paper";

export default function App() {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const ref = firestore().collection("todos");

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete
        });
      });

      setTodos(list.sort((i, j) => i.title > j.title));

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading, ref]);

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false
    });
    setTodo("");
  }

  if (loading) {
    return null; // or a spinner
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content title={"TODOs List"} />
      </Appbar>
      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <TextInput label={"New Todo"} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </SafeAreaView>
  );
}

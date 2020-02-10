import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

function Todo({ id, title, complete }) {
  async function toggleComplete() {
    await firestore()
      .collection('todos')
      .doc(id)
      .update({
        complete: !complete,
      });
  }

  async function deleteTodo() {
    await firestore()
      .collection('todos')
      .doc(id)
      .delete();

    Alert.alert(`${title} foi deletado!`);
  }

  return (
    <List.Item
      title={title}
      onPress={() => toggleComplete()}
      onLongPress={() => deleteTodo()}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
    />
  );
}

export default React.memo(Todo);

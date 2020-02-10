import React from 'react';
import firestore from '@react-native-firebase/firestore';

function Todos() {
  const ref = firestore().collection('todos');

  return null;
}

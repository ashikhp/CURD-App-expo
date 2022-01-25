import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import NoteScreen from './app/screens/NoteScreen';
import Intro from './app/screens/Intro';

export default function App() {

  const [user, setUser] = useState({})

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user")
    if (result !== null) {
      setUser(JSON.parse(result))
    }
  }

  useEffect(() => {
    findUser()
  }, [])


  if (!user.name) return <Intro onFinish={findUser} />
  return <NoteScreen user={user} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

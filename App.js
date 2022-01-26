import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Alert, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import NoteScreen from './app/screens/NoteScreen';
import Intro from './app/screens/Intro';
import NoteDetail from './app/components/NoteDetail';

const Stack = createStackNavigator()

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

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />

  if (!user.name) return <Intro onFinish={findUser} />
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen component={renderNoteScreen} name='NoteScreen' options={{
          headerShown: false
        }} />
        <Stack.Screen component={NoteDetail} name='NoteDetail' />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { View, Text, StyleSheet } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';



const NoteContext = createContext()

const NoteProvider = ({ children }) => {
  const [notes, SetNotes] = useState([]);


  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) SetNotes(JSON.parse(result))

  }

  useEffect(() => {
    findNotes()
  }, [])


  return (
    <NoteContext.Provider value={{ notes, SetNotes, findNotes }} >

      {children}

    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext)

export default NoteProvider;

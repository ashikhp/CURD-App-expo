import { View, Text,StyleSheet } from 'react-native';
import React, { createContext } from 'react';



const NoteContext = createContext()

const NoteProvider = ({children}) => {
  return (
    <NoteContext.Provider>

    {children}

    </NoteContext.Provider>
  );
};

const styles = StyleSheet.create({
    container:{

    }
})

export default NoteProvider;

import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import colors from '../misc/colors'

const SearchBar = ({ containerStyle }) => {
    return (
        <View style={styles.container, { ...containerStyle }}>
            <TextInput style={styles.searchBar} placeholder='Search here..' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
    }
})
export default SearchBar;


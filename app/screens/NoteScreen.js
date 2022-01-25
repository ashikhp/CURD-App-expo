import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'
import RoundIconBtn from '../components/RoundIconBtn'
import SearchBar from '../components/SearchBar'
import NotInputModal from '../components/NotInputModal'
import colors from '../misc/colors'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Note from '../components/Note'

const NoteScreen = ({ user }) => {

    const [greet, setGreet] = useState("")
    const [modalVisible, SetModalVisible] = useState(false)
    const [notes, SetNotes] = useState([]);

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet("morning");
        if (hrs === 1 || hrs < 17) return setGreet("afternoon");
        setGreet("evening")
    }

    const findNotes = async () => {
        const result = await AsyncStorage.getItem("notes");
        if (result !== null) SetNotes(JSON.parse(result))

    }

    useEffect(() => {
        findNotes()
        findGreet()
    }, [])

    const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now() }

        const updatedNotes = [...notes, note];

        SetNotes(updatedNotes)

        await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes))

    }


    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                    {notes.length ? <SearchBar containerStyle={{ marginVertical: 15 }} /> : null}

                    <FlatList
                        data={notes}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Note item={item} />}
                    />
                    {!notes.length ? <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                        <Text style={styles.emptyHeader}>Add Notes</Text>

                    </View> : null}

                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn
                onPress={() => {
                    SetModalVisible(true)
                }}
                antIconName="plus"
                style={styles.addBtn}

            />
            <NotInputModal
                visible={modalVisible}
                onClose={() => SetModalVisible(false)}
                onsubmit={handleOnSubmit}
            />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: "bold"
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1
    },
    emptyHeader: {
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
        opacity: 0.5,
    },
    emptyHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        zIndex: -1
    },
    addBtn: {
        position: "absolute",
        right: 15,
        bottom: 50
    }
})

export default NoteScreen;
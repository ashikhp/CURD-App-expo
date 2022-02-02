import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '../misc/colors'
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNotes } from '../../contexts/NoteProvider';
import NotInputModal from '../components/NotInputModal'



const formatDate = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;

}

const NoteDetail = (props) => {

    const { SetNotes } = useNotes()
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)


    const [note, SetNote] = useState(props.route.params.note)

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if (result !== null) notes = JSON.parse(result)

        const newNotes = notes.filter(n => n.id !== note.id)
        SetNotes(newNotes)
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes))

        props.navigation.goBack()
    }

    const displayDeleteAlert = () => {

        Alert.alert("Are You Sure?", "This action will delete your notes permanently!", [
            {
                text: "Delete",
                onPress: () => deleteNote()
            },
            {
                text: "No thanks",
                onPress: () => console.log("no")
            }
        ], {
            cancelable: true
        })

    }

    const openEditModal = () => {
        setIsEdit(true)
        setShowModal(true)
    }

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes')
        let notes = [];
        if (result !== null) notes = JSON.parse(result)
        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title
                n.desc = desc
                n.isUpdated = true
                n.time = time

                SetNote(n)
            }
            return n;
        })
        SetNotes(newNotes)

        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))

    }
    const handleOnClose = () => setShowModal(false)
    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.time}>{note.isUpdated ? `updated at ${formatDate(note.time)}` : `Created at ${formatDate(note.time)}`}</Text>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.desc}>{note.desc}</Text>

            </ScrollView>
            <View style={styles.btnContainer}>
                <RoundIconBtn
                    antIconName="delete"
                    style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
                    onPress={displayDeleteAlert}

                />
                <RoundIconBtn
                    antIconName="edit"
                    onPress={openEditModal}
                />

            </View>

            <NotInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onsubmit={handleUpdate} visible={showModal} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 25,
        color: colors.PRIMARY,
        fontWeight: "bold",
    },
    desc: {
        opacity: 0.6,
        fontSize: 15,
    },
    time: {
        textAlign: "right",
        fontSize: 10,
        opacity: 0.5,

    },
    btnContainer: {
        position: "absolute",
        right: 15,
        bottom: 50
    }
})

export default NoteDetail;


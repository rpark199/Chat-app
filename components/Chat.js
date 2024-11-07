import React, { useState, useEffect } from 'react';
import {
    collection,
    getDoc,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy,
} from 'firebase/firestore';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ route, navigation, db }) => {
    const { name, background, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name, color: background });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
        })
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        let newItem = {
            ...newMessages[0],
            createdTime: new Date()
        }
        addDoc(collection(db, "messages"), newMessages[0])
    }

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" />: null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        color: "#000000",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    },
});

export default Chat;

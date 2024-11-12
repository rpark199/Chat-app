import React from "react";
import { StyleSheet, Alert } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

const App = () => {
    const connectionStatus = useNetInfo();

    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection lost!");
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    const firebaseConfig = {
      apiKey: "AIzaSyAReNpgcWZ65vd9LImg_n64ahEdeBxi2yo",
      authDomain: "chat-app-b5f1c.firebaseapp.com",
      projectId: "chat-app-b5f1c",
      storageBucket: "chat-app-b5f1c.firebasestorage.app",
      messagingSenderId: "982738672296",
      appId: "1:982738672296:web:8150c19eecd5dd8d37c09d",
      measurementId: "G-5BREEM7YYS"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Start">
                <Stack.Screen
                    name="Start"
                    component={Start}
                />
                <Stack.Screen
                    name="Chat">
                    {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
}

export default App;

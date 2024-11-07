import React from "react";
import { StyleSheet } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const App = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBIxleVPX0Xea739eMwfxemldq7kvxSHFQ",
        authDomain: "chat-app-815f1.firebaseapp.com",
        projectId: "chat-app-815f1",
        storageBucket: "chat-app-815f1.firebasestorage.app",
        messagingSenderId: "1045944665896",
        appId: "1:1045944665896:web:f87d81fb421a6f4702321d",
        measurementId: "G-RFBP1KLV3D"
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
                    {props => <Chat db={db} {...props} />}
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

import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start =({ navigation }) => {
    const [name, setName] = useState("");
    const colors = ['#f0d6ff', '#c6e99f', '#e4f8ba', '#faf3d7'];
    const [background, setBackground] = useState('');

    const auth = getAuth();
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", {userID: result.user.uid, name: name, background: background});
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/Image.png")}
                style={styles.imageBackground}>
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        {/* name */}
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder="Your name"
                        />
                        {/* user selects background color */}
                        <Text style={styles.chooseBgColor}>Choose Background Color</Text>
                        <View style={styles.colorContainer}>
                            {colors.map((color, index) => (
                                <TouchableOpacity
                                    key={color}
                                    accessibilityRole="button"
                                    style={[
                                        styles.colorButton,
                                        { backgroundColor: color },
                                        background === color && styles.selectedColor,
                                    ]}
                                    onPress={() => setBackground(color)}
                                />
                            ))}
                        </View>
                        {/* to start chat */}
                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="Start Chatting"
                            accessibilityRole="button"
                            accessibilityHint="Lets you choose to enter the chat room"
                            style={styles.button}
                            onPress={signInUser} >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 25,
  },
  box: {
    // backgroundColor: '#ffffff',
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    width: '88%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {
    width: '88%',
    borderColor: '#757083',
    borderRadius: 4,
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 50,
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
  },
  chooseBgColor:{
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 100,
  },
  colorButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
},
selectedColor:{
    borderColor: '#c0c0c0',
    borderWidth: 1,
},
  button:{
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 4,
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    width: '88%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;

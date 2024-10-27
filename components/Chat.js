import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const Chat = ({ route, navigation }) => {
 const { name, background } = route.params;

 useEffect(() => {
  navigation.setOptions({ title: name });
 }, []);

 return (
  <View style={[styles.container, { backgroundColor: background }]}>
   <Text>Welcome</Text>
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

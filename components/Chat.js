import React, { useState, useEffect } from 'react';
import {
	collection,
	addDocs,
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

const Chat = ({ route, navigation, db }) => {
	const { name, background } = route.params;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		navigation.setOptions({ title: name, color: background });
	}, []);

	let unsubMessages;

	useEffect(() => {
		const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
		unsubMessages = onSnapshot(q, (doc) => {
			let newMessages = [];
			docs.forEach((doc) => {
				newMessages.push({
					id: doc.id,
					...doc.data(),
					createdAt: new Date(doc.data().createdAt.toMillis()),
				});
			});
			cacheMessages(newMessages);
			setMessages(newMessages);
		});
	});

	const onSend = (newMessages) => {
		addDoc(collection(db, 'messages'), newMessages[0]);
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#000',
					},
					left: {
						backgroundColor: '#FFF',
					},
				}}
			/>
		);
	};

	return (
		<View style={[styles.container, { backgroundColor: background }]}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: userID,
					name: name,
				}}
			/>
			{Platform.OS === 'android' ? (
				<KeyboardAvoidingView behavior="height" />
			) : null}
			{Platform.OS === 'ios' ? (
				<KeyboardAvoidingView behavior="padding" />
			) : null}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	textInput: {
		color: '#000000',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 10,
		paddingVertical: 5,
		fontSize: 16,
	},
});

export default Chat;

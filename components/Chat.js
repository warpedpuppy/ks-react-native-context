import React from 'react';
import {
    View,
    Platform,
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    LogBox
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import AppContext from '../AppContext';

export default class Chat extends React.Component{
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
                avatar: ''
            },
            loggedInText: 'Please wait, you are getting logged in.',
            isConnected: false
        }

        const firebaseConfig = {
            apiKey: "AIzaSyBQ0l3BqF5b5UczVr6U4q4g2nUWoBSQ1zc",
            authDomain: "test-183b4.firebaseapp.com",
            projectId: "test-183b4",
            storageBucket: "test-183b4.appspot.com",
            messagingSenderId: "820936259648",
            appId: "1:820936259648:web:10f56afb9569c1236a07a5",
            measurementId: "G-CHMTEGV545"

        }

        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection('messages');
        firebase.firestore().collection('messages').doc('messages');

        // to ignore warnings
        LogBox.ignoreLogs([
            'Setting a timer',
            'Animated.event now requires a second argument for options',
            'Cannot update a component from inside'
        ])
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                }
            });
        });
        this.setState({
            messages,
        })
    }

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text || null,
            user: message.user,
        });
    }

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    };

    onSend(messages = []) {
        this.setState(previousState => ({
            // .append is built into GiftedChat component
            messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
            this.addMessage();
            this.saveMessages();
        });
    }

    async deleteMessages() {
        try{
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        // checking if offline or online, will fetch data from either asyncStorage or firestore
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                console.log('online');
            } else {
                console.log('offline');
            }
        });

        // calls firebase auth to app.
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            // update user with current active user data
            this.setState({
                user: {
                    _id: user.uid,
                    name: this.context.name,
                    avatar: 'https://placeimg.com/140/140/any'
                },
                messages: [],
                loggedInText: `Hi ${this.props.route.params.name}, welcome to the chat!`,

            });
            this.referenceChatMessages = firebase.firestore().collection('messages');
            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
        });
        this.getMessages();
        // this.renderSystemMessage();
    }

    // renderSystemMessage() {
    //     this.setState({
    //         messages: [
    //             {
    //                 _id: 1,
    //                 text: `Hi ${this.props.route.params.name}, welcome to the chat!`,
    //                 createdAt: new Date(),
    //             // grey-scaled message above all others, system message used for something like "A has entered chat!", etc.
    //                 system: true
    //             },
    //         ]
    //     })
    // }

    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    };


    renderBubble(props) {
        return(
            <Bubble
            // inherits props with spread operator
            {...props}
            wrapperStyle={{
                // right speech bubbles are for the sender
                right: {
                    backgroundColor: 'pink',
                }
            }}
            textStyle={{
                right: {
                    color: 'black',
                }
            }}
            />
        );
    };

    renderInputToolbar(props) {
        if(this.state.isConnected == false) {
        } else {
            return(
                <InputToolbar
                {...props}
                />
            );
        }
    }

    render() {
        // pulling props from Start.js as passed in onPress
        const { color } = this.props.route.params;
        const { name } = this.context;
        // props user's name into title of chat message
        this.props.navigation.setOptions({ title: name })

        return(
            <View style={{flex: 1, backgroundColor: color }}>
                <Text style={styles.loggedInText}>{this.state.loggedInText}</Text>
                <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                renderInputToolbar={this.renderInputToolbar.bind(this)}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={this.state.user}
                />
                {/* old android keyboard covering fix */}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height'/> : null}
            </View>
        )
    }
}
Chat.contextType = AppContext;
const styles = StyleSheet.create({
    loggedInText: {
        textAlign: 'center',
        color: 'white',
        opacity: 50
    }
})

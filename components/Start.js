import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    } from 'react-native';
import { Icon } from 'react-native-elements';
import AppContext from '../AppContext';

const image = require('../assets/background-image.png')

export default class Start extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            name: '',
            color: ''
        }
    }



 render() {
     const {navigation} = this.props;
     const {color} = this.state;
     const {name} = this.context;
    return (
        <ImageBackground source={image} style={styles.image}>
            <Text style={styles.title}>ChatApp</Text>

            <View style={styles.chatContainer}>
                <View style={styles.yourContainer}>
                    <Icon style={styles.icon} name='person-outline' color='#000' size={25} />

                    <TextInput 
                    style={styles.yourName}
                    placeholder='Your Name'
                    onChangeText={(name) => this.context.changeName(name)}
                    value={name}
                    />
                </View>

                <Text style={styles.chooseText}>Choose Background Color:</Text>
                <View style={styles.colorContainer}>
                    <TouchableOpacity 
                    style={styles.color1} 
                    onPress={() => this.setState({color: '#090C08'})}
                    accessible={true}
                    accessibilityRole='Button'
                    accessibilityLabel='Choose Background Color Black'
                    accessibilityHint='Clicking this will change the background of your chat window, optional.'
                    ></TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.color2} 
                    onPress={() => this.setState({color: '#474056'})}
                    accessible={true}
                    accessibilityRole='Button'
                    accessibilityLabel='Choose Background Color Dark Blue-Grey'
                    accessibilityHint='Clicking this will change the background of your chat window, optional.'
                    ></TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.color3} 
                    onPress={() => this.setState({color: '#8A95A5'})}
                    accessible={true}
                    accessibilityRole='Button'
                    accessibilityLabel='Choose Background Color Light Slate-Grey'
                    accessibilityHint='Clicking this will change the background of your chat window, optional.'   
                    ></TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.color4} 
                    onPress={() => this.setState({color: '#B9C6AE'})}
                    accessible={true}
                    accessibilityRole='Button'
                    accessibilityLabel='Choose Background Color Laurel Green'
                    accessibilityHint='Clicking this will change the background of your chat window, optional.'  
                    ></TouchableOpacity>
                </View>

                {/* 'button' that allowed for text within, presses navigates to chat, brings text and selected color with it */}
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Chat', { name: name, color: color })}
                    style={styles.button}
                    accessible={true}
                    accessibilityRole='Button'
                    accessibilityHint='Clicking this will enter new window chat window.'   
                    >
                        <Text style={styles.buttonText}>
                        Start Chatting
                        </Text>
                </TouchableOpacity>
            </View>
      </ImageBackground>
    )
}
}
Start.contextType = AppContext;
const styles = StyleSheet.create({
    // where is container used??
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 90,
        fontSize: 45,
        height: '50%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
    chatContainer: {
        width: '88%',
        height: '44%',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: 'white'
    },
    yourContainer: {
        width: '88%',
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        borderColor: '#757083',
        borderWidth: 2,
        borderRadius: 3,
        padding: 10,
        margin: 10
    },
    icon: {
        fontSize: 10,
        paddingRight: 5,
        color: '#757083',
        opacity: 0.2
    },
    yourName: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
    },
    chooseText: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,
    },
    colorContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around'
    },
    color1: {
        backgroundColor: '#090C08',
        width: 50,
        height: 50,
        borderRadius: 50/2,
    },
    color2: {
        backgroundColor: '#474056',
        width: 50,
        height: 50,
        borderRadius: 50/2
    },
    color3: {
        backgroundColor: '#8A95A5',
        width: 50,
        height: 50,
        borderRadius: 50/2
    },
    color4: {
        backgroundColor: '#B9C6AE',
        width: 50,
        height: 50,
        borderRadius: 50/2
    },
      button: {
        backgroundColor: '#757083',
        width: '90%',
        marginLeft: 20,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
  },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },
});
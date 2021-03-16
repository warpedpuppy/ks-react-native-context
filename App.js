import React from 'react';
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Chat from './components/Chat';
import Start from './components/Start';
import AppContext from './AppContext';
const Stack = createStackNavigator();

export default class App extends React.Component {

  state={name: ''}

  changeName = name => {
    this.setState({name})
  }
  constructor(props) {
    super(props);
  }

  render() {
    const contextValue = {
      name: this.state.name,
      changeName: this.changeName,
     }
  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>

          <Stack.Screen
          name='Start'
          component={Start}
          />

          <Stack.Screen
          name='Chat'
          component={Chat}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },


});

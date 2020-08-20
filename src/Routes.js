import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './screens/Profile'
import Settings from './screens/Settings'

import Login from './screens/Login';
import Scanner from './screens/Scanner';
import CreateAccount from './screens/CreateAccount';




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Routes extends React.Component {

  _getDrawerComponent() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen />
      </Drawer.Navigator>
    )
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle:
              {
                backgroundColor: '#c0d4e2'
              },
            }}
          />

          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle:
              {
                backgroundColor: '#c0d4e2'
              },
            }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#c0d4e2' },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#c0d4e2' },
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}







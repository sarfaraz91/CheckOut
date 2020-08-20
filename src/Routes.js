import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './screens/Profile'
import Settings from './screens/Settings'

import Login from './screens/Login';
import Scanner from './screens/Scanner';
import MenuSlider from './screens/Scanner'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Routes extends React.Component {

  _getDrawerComponent() {
    return(
    <Drawer.Navigator >
      <Drawer.Screen name="Home" component={Scanner}/>
      <Drawer.Screen name="Profile" component={Profile}/>
      <Drawer.Screen name="Settings" component={Settings}/>
         
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
          name="MyDrawer"
          component={this._getDrawerComponent}
          options={{ headerShown: false }}
        />


      
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}







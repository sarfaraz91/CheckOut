import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import MenuSlider from './screens/MenuSlider'
import ItemList from './screens/ItemList'

import Login from './screens/Login';
import Scanner from './screens/Scanner';
import CreateAccount from './screens/CreateAccount';
import Bill from './screens/Bill';
import Payment from './screens/Payment';
import AddFriends from './screens/AddFriends';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Routes extends React.Component {

  _getDrawerComponent() {
    return (
      <Drawer.Navigator drawerContent={props => <MenuSlider {...props} />}>
        <Drawer.Screen name="Home" component={Scanner} />
        <Drawer.Screen name="AddFriends" component={AddFriends} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />

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
            name="ItemList"
            component={ItemList}
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

          <Stack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#c0d4e2' },
            }}
          />

          <Stack.Screen
            name="Bill"
            component={Bill}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#c0d4e2' },
            }}
          />

          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#c0d4e2' },
            }}
          />

          {/* <Stack.Screen
            name="AddFriends"
            component={AddFriends}
            options={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#c0d4e2' },
            }}
          /> */}



        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}







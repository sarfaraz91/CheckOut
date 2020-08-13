import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';

const Stack = createStackNavigator();

export default class Routes extends React.Component {

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
            headerStyle: { backgroundColor: '#c0d4e2' },
          }}
        />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
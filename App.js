/**

 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import Routes from './src/Routes';
import FCM from "./src/FCM";
//import CommonStyles from '../CheckOut/src/CommonStyles';

import { View, StyleSheet, StatusBar, SafeAreaView,Alert } from 'react-native';
import { ViewUtils } from './src/Utils';


class App extends React.Component {
  constructor(props) {
    super(props);
    FCM.instance().notifyUser = (title, message) => {
      console.warn("notifii")
      Alert.alert(
        'Delete Activity',
        "Are you sure you want to delete this activity?",
        [
          {
            text: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => { this.props.actions.deleteActivity(this.props.token, id) }
          }
        ]
      )
      // ViewUtils.showAlert("Hello notification")
    }
  }

  componentDidMount() {
    FCM.instance().appInit();
  }

  componentWillUnmount() {
    FCM.instance().appDesroyed();
  }

  render() {
    return (
      <Root>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Routes />
          </View>
        </SafeAreaView>
      </Root>
    );
  }

}

export default App;

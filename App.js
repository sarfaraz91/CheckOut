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

import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { ViewUtils } from './src/Utils';


class App extends React.Component {
  constructor(props) {
    super(props);
    FCM.instance().notifyUser = (title, message) => {
        ViewUtils.showAlert("Hello notification")
    }
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

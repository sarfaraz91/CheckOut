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

import { View, StyleSheet, StatusBar, SafeAreaView, Alert, AsyncStorage } from 'react-native';
import { ViewUtils } from './src/Utils';


class App extends React.Component {
  navigationRef: any;
  constructor(props) {
    super(props);

    try {
      FCM.instance().notifyUser = (title, message) => {
        let that = this;
        const currentRouteName = that.navigationRef.getCurrentRoute().name
        console.warn("currentRouteName :: ",currentRouteName)
        console.warn("ss : ",message.data['foodItem'])

        var dividedBill = message.data['dividedBill'];
        var totalBill = message.data['totalBill'];
        var foodItem = message.data['foodItem']
        
        AsyncStorage.setItem('dividedBill', dividedBill)
        AsyncStorage.setItem('totalBill', totalBill)


        Alert.alert(
          'Pay Bill',
          "Please chose option for payment.",
          [
            {
              text: 'Pay Item wise',
              onPress: () => {
                that.navigationRef.navigate('Itemwise', { foodItem })
              }
            },
            {
              text: 'Pay Full Bill',
              onPress: () => {
                AsyncStorage.setItem('totalFlag', JSON.stringify(true))
                AsyncStorage.setItem('dividedFlag', JSON.stringify(false))
                that.navigationRef.navigate('Payment', { totalBill })
              }

            },
            {
              text: 'Pay Divided Bill',
              onPress: () => {
                AsyncStorage.setItem('totalFlag', JSON.stringify(false))
                AsyncStorage.setItem('dividedFlag', JSON.stringify(true))
                that.navigationRef.navigate('Payment', { dividedBill })
              }
            }
           
          ]
        )
        // ViewUtils.showAlert("Hello notification")
      }
    } catch (e) {
      console.warn("error at fcm ::: ", e)
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

          <NavigationContainer props={"abc"} ref={navigationRef => this.navigationRef = navigationRef}>
            <Routes />
          </NavigationContainer>

        </SafeAreaView>
      </Root>
    );
  }

}

export default App;

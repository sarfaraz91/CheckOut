 import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';


class Login extends React.Component {
  
  constructor(props) {
    super(props);

  } 
  render() {
    return (
      <View style={[CommonStyles.container, { backgroundColor: 'red'}]}></View>
    );
  }
}

export default Login;

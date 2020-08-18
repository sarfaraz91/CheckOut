import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Text } from 'react-native';



class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[CommonStyles.container, CommonStyles.bgColor, { justifyContent: 'center', alignItems: 'center' }]}>
        <TouchableOpacity
        
        onPress={() => {this.props.navigation.navigate('Scanner')}}
        style={
          [

            {
              backgroundColor: '#000',
              borderRadius: 10,
              //marginHorizontal: 50,
              width: '92%', 
              justifyContent: 'center',
              alignItems: 'center'


            }
          ]
        }>
          <Text style={{ color: '#fff', padding: 20, fontSize: 16 }}>Login</Text>

        </TouchableOpacity>



      </View>
    );
  }
}

export default Login;

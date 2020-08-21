import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';
import { ViewUtils } from '../Utils'


import { Text } from 'react-native';



export default class CreateAccount extends Component {

  constructor(props) {
    super(props);
   this.state = {
   //  initializing: true,
     //user: {},
     isLoading: false,
     username: '',
     password: '',
   }
 
  }

  CreateAccount() {

    if (this.state.username.length == 0) {
      ViewUtils.showToast('Please Enter Username');
      return
    }
    
    if (this.state.password.length == 0) {
      ViewUtils.showToast('Please Enter Password');
      return
    
    }
    this.setState({ isLoading: true })
  
    auth()
    .createUserWithEmailAndPassword(this.state.username, this.state.password)
    .then(() => {

      this.props.navigation.navigate('Profile')
      ViewUtils.showToast('User account created & signed in!!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    })

    .finally(() => {
      this.setState({ isLoading: true });
  });

  }

  // onAuthStateChanged(user) {
  //   setUser(user)
  //   this.setState({
  //     initializing: false
  //   })
  // }

  // signout() {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }




  render() {
    return (
      <View style={Style.container}>
        <Image style={Style.logo} source={require('../assets/img/checkout_logo.png')}></Image>
        <TextInput
        value={this.state.username}
        onChangeText={val => this.setState({ username: val })}
        underlineColorAndroid='transparent' placeholderTextColor='black' placeholder="Username" style={Style.input}></TextInput>
        <TextInput
        value={this.state.password}
        onChangeText={val => this.setState({ password: val })}
        underlineColorAndroid='transparent' placeholderTextColor='black' placeholder="Password" style={Style.input}></TextInput>
        <View style={Style.btnContainer}>
          <TouchableOpacity style={Style.btnStyle}
            onPress={this.CreateAccount.bind(this) }
          >
            <Text style={Style.btnText}>Create Account</Text>
          </TouchableOpacity>

       
         
        </View>

      


     
      </View>

      
    );
  }
}

const Style = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    logo: {
      width: 300,
      height: 150,
    },
    input: {
      marginTop: 5,
      width: '90%',
      padding: 15,
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 1,
    },
    btnContainer: {
      width: '90%',
      marginTop: 50,
      flexDirection: 'column'
    },
    btnStyle: {
      padding: 7,
      marginTop: 10,
      backgroundColor: '#F5F5F5'
    },
    btnText: {
      textAlign: 'center',
      color: '#006400'
    }
  }
)

{/* <TouchableOpacity
        
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

</TouchableOpacity> */}
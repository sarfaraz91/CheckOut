import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';
import { ViewUtils } from '../Utils'
import { Text } from 'react-native';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initializing: true,
      user: {},
      isLoading: false,
      username: '',
      password: '',
    }
  }

  loginTouch() {
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
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {

        this.props.navigation.navigate('MyDrawer')
        ViewUtils.showToast('You are logged in Successfully!')

      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ViewUtils.showToast('That email address is already in use!')
        
        }

        if (error.code === 'auth/invalid-email') {
          ViewUtils.showToast('That email address is invalid!')
      
        }

        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <View style={[CommonStyles.container, CommonStyles.bgColor ]}>
        <KeyboardAwareScrollView style={[CommonStyles.container]}>

          <Image style={[CommonStyles.container, Style.logo, {marginVertical: 50}]} source={require('../assets/img/checkout_logo.png')}></Image>
          <TextInput
            value={this.state.username}
            onChangeText={val => this.setState({ username: val })}
            underlineColorAndroid='transparent'
            placeholderTextColor='black'
            placeholder="Username"
            enablesReturnKeyAutomatically
            autoCapitalize='none'
            style={Style.input}>
            </TextInput>
          <TextInput
            value={this.state.password}
            onChangeText={val => this.setState({ password: val })}
            underlineColorAndroid='transparent'
            placeholderTextColor='black'
            placeholder="Password"
            autoCapitalize='none'
            secureTextEntry
            style={Style.input}></TextInput>
          <View style={Style.btnContainer}>
            <TouchableOpacity style={Style.btnStyle}
              onPress={this.loginTouch.bind(this)}
            >
              <Text style={Style.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity

              onPress={() => { this.props.navigation.navigate('CreateAccount') }}
              style={Style.btnStyle}>
              <Text style={Style.btnText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <Loader loading={this.state.isLoading} />

        </KeyboardAwareScrollView>

      </View>
    );
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('MyDrawer')
      }
   });

  }
  

  

}

const Style = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    logo: {
      width: 300,
      height: 150,
      alignSelf: 'center'
    },
    input: {
      marginTop: 5,
      width: '90%',
      padding: 15,
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 2,
      fontSize: 15, 
      alignSelf: 'center'
    },
    btnContainer: {
      width: '90%',
      marginTop: 70,
      alignSelf: 'center',
    },
    btnStyle: {
      marginVertical: 10,
      backgroundColor: '#F5F5F5',
      borderRadius: 5
    },
    btnText: {
      textAlign: 'center',
      color: '#8BC080',
      fontSize: 20,
      padding: 10,
      fontWeight: 'bold'
    }
  }
)
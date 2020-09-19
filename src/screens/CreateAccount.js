import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';
import { ViewUtils } from '../Utils'
import { Text } from 'react-native';
import database from '@react-native-firebase/database';

export default class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      .then((res) => {

        this.props.navigation.navigate('Profile')
        ViewUtils.showToast('User account created & signed in!!');
        database()
          .ref(`/Users/${res.user.uid}/`)
          .set({
            email: this.state.username,
            password: this.state.password,
          })
          .then(() => console.warn('Data set.'));
          
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ViewUtils.showToast('That email address is already in use!!');
        }

        if (error.code === 'auth/invalid-email') {
          //  console.log('That email address is invalid!');
          ViewUtils.showToast('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: true });
      });
  }
  render() {
    return (
      <View style={[CommonStyles.container, CommonStyles.bgColor]}>
        <KeyboardAwareScrollView style={[CommonStyles.container]}>

          <Image style={[CommonStyles.container, Style.logo, { marginVertical: 50 }]} source={require('../assets/img/checkout_logo.png')}></Image>
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
              onPress={this.CreateAccount.bind(this)}
            >
              <Text style={Style.btnText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>


    );
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
      marginTop: 80,
      alignSelf: 'center',
    },
    btnStyle: {
      marginVertical: 15,
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

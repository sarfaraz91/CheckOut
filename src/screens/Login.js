import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';
import { ViewUtils } from '../Utils'
import { Text,AsyncStorage } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initializing: true,
      user: {},
      isLoading: false,
      username: '',
      password: '',
      token:''
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
      .then((data) => {

        this.props.navigation.navigate('MyDrawer')
        ViewUtils.showToast('You are logged in Successfully!')
        //this.sendUserToApi();

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
          <Text style={{alignSelf:'center'}}>Or Login With</Text>
          <View style={{ alignItems: 'center',marginTop:10}}>
            
            <LoginButton
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        //this.props.navigation.navigate('MyDrawer')
                        //console.warn("accessToken : ",data.accessToken.toString())
                        this.initUser()
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => console.log("logout.")} />
          </View>
          <Loader loading={this.state.isLoading} />

        </KeyboardAwareScrollView>

      </View>
    );
  }

  initUser() {
    const infoRequest = new GraphRequest(
      '/me?fields=name,email,picture.type(large)',
      null,
      this._responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

 
_responseInfoCallback = (error, result) => {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    this._storeData(result)
    this.props.navigation.navigate('MyDrawer')
  }
}

_storeData = async (result) => {
  let obj = {  
    name: result.name,  
    image: result.picture.data.url,  
  }
  try {
    await AsyncStorage.setItem(
      'user',JSON.stringify(obj)
    );
  } catch (error) {
    // Error saving data
  }
};


componentDidMount() {  
  auth().onAuthStateChanged((user) => {
    if (user) {
     // this.sendUserToApi(user)
      this.props.navigation.navigate('MyDrawer')
    }
  });

}
  
async sendUserToApi(user){
  user.getIdToken().then(function(idToken) {  // <------ Check this line
    // It shows the Firebase token now
    console.warn("user token ::",idToken)

  });

 // console.warn("token ::: ",idToken)
  // const idTokenResult = await auth().currentUser.getIdTokenResult();
  // console.warn("tokenApi :: ",idTokenResult)
    // axios.post('https://checkoutapp1.herokuapp.com/api/stripe', {
    //   token: this.state.tokenId,
    //   amount: this.state.amount
    // })
    //   .then(function (response) {
    //     // this.setState({ loading: false })      
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // this.setState({ loading: false })
    //     console.warn(error);
    //   });

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
      marginTop: 30,
      alignSelf: 'center',
  },
  btnStyle: {
      marginVertical: 10,
      backgroundColor: '#8BC080',
      borderRadius: 5
  },
  btnText: {
      textAlign: 'center',
      color: '#FFF',
      fontSize: 20,
      padding: 10,
      fontWeight: 'bold'
  }
  }
)
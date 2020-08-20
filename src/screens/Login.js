import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView,Image,TextInput,TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
     <View style={Style.container}>
       <Image style={Style.logo} source={require('../assets/img/logo.png')}></Image>
        <TextInput underlineColorAndroid='transparent' placeholderTextColor='black' placeholder="Username" style={Style.input}></TextInput>
        <TextInput underlineColorAndroid='transparent' placeholderTextColor='black' placeholder="Password" style={Style.input}></TextInput>
        <View style={Style.btnContainer}>
          <TouchableOpacity style={Style.btnStyle}
          onPress={()=> this.props.navigation.navigate('MyDrawer')}
          >
            <Text style={Style.btnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.btnStyle}>
            <Text style={Style.btnText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
     </View>
    );
  }
}

export default Login;

const Style = StyleSheet.create(
  {
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white'
    },
    logo:{
      width: 203,
      height: 100,
      margin:30
    },
    input:{
      marginTop:5,
      width:'90%',
      padding:15,
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 1, 
    },
    btnContainer:{
      width:'90%',
      marginTop:50,
      flexDirection:'column'
    },
    btnStyle:{
      padding:7,
      marginTop:10,
      backgroundColor:'#F5F5F5'
    },
    btnText:{
      textAlign:'center',
      color:'#006400'
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
import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View,Text,StyleSheet,Image, ImageBackground} from 'react-native';

class Profile extends React.Component{

    render(){
        return(
            <View style={Style.container}>
                <View style={Style.header}>
                    <ImageBackground
                    source={require('../assets/img/curved_header.png')}
                    style={Style.ImageBackground} 
                    >
                    <Text style={Style.TextStyle}>gewrerwe</Text>
                    <Image style={Style.Image}  source={require('../assets/img/person.png')}/>
                    </ImageBackground>
                </View>
            </View>
            
        )
    }
}

export default Profile;

const Style = StyleSheet.create(
    {
      container:{
          flex:1,
          backgroundColor:'white'
      },
      header:{
          flex:1
      },
      ImageBackground:{
          flex:1,
          alignItems:'center',
          justifyContent:'center',
          width:'100%',
          height:'105%',
          marginTop:-150
      },
      Image:{
        width:'100%',
        height:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
        marginTop:-80
    },
    TextStyle:{
        color:'white',
        fontSize:28,
        marginTop:80,
        justifyContent:'center'
    }
     
    }
  )

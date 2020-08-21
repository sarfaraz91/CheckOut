import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View,Text,StyleSheet,Image, ImageBackground,TextInput} from 'react-native';
import { Icon,Input } from 'native-base';
import { color } from 'react-native-reanimated';
class Profile extends React.Component{

    render(){
        return(
            <View style={Style.container}>

                    <View
                    style={Style.BgHeader} 
                    >
                    <View style={{flex: 1}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Jack and Dexter</Text>
                    <Image style={Style.ProfileImage}  source={require('../assets/img/person.png')}/>
                    </View>    

                    </View>

                    <View style={Style.parentContainer}>
                    <View style={Style.childContainer}>
                    <Icon name="user-o" type='FontAwesome' style={Style.IconStyle} />
                    <TextInput placeholderTextColor="#8BC080" placeholder="Username" style={Style.TextStyle}></TextInput>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="birthday-cake" type='FontAwesome5' style={Style.IconStyle} />
                    <TextInput placeholderTextColor="#8BC080" placeholder="Birthday" style={Style.TextStyle}></TextInput>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="smartphone" type='Feather' style={Style.IconStyle} />
                    <TextInput placeholderTextColor="#8BC080" placeholder="Phone Number" style={Style.TextStyle}></TextInput>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="instagram" type='AntDesign' style={Style.IconStyle} />
                    <TextInput placeholderTextColor="#8BC080" placeholder="Social Account" style={Style.TextStyle}></TextInput>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="email" type='Fontisto' style={Style.IconStyle} />
                    <TextInput placeholderTextColor="#8BC080" placeholder="Email" style={Style.TextStyle}></TextInput>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="eye" type='Feather' style={Style.IconStyle} />
                    <TextInput placeholderTextColor="#8BC080" placeholder="Password" style={Style.TextStyle}></TextInput>
                    </View>
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
          backgroundColor:'#f2f2f2'
      },
      BgHeader:{
          height: 200,
          alignItems:'center',
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          backgroundColor: '#8BC080',
      },
      ProfileImage:{
        width:500,
        height:500,
        marginTop:60
    },
    
    parentContainer:{
        flex:0.7,
        flexDirection:'column',
        marginTop:80
    },
    childContainer:{
        alignItems:'center',
        flexDirection:'row',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
        padding:5,
        marginLeft:10
    },
    TextStyle:{
        color:'#8BC080',
        fontSize:16,
        textAlign:'center',
        paddingLeft:30
        
    },
    IconStyle:{
        fontSize:18,
        color:'#8BC080',
        marginLeft:10
    }
}
  )

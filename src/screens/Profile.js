import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View,Text,StyleSheet,Image, ImageBackground} from 'react-native';
import { Icon } from 'native-base';
import { color } from 'react-native-reanimated';
class Profile extends React.Component{

    render(){
        return(
            <View style={Style.container}>

                    <View
                    style={Style.BgHeader} 
                    >
                    <View>
                    <Text style={{alignSelf:'center',color:'white'}}>Jack and Dexter</Text>
                    <Image style={Style.ProfileImage}  source={require('../assets/img/person.png')}/>
                    </View>    

                    </View>

                <View style={Style.parentContainer}>
                    <View style={Style.childContainer}>
                    <Icon name="edit" type='Feather' style={Style.IconStyle} />
                    <Text style={Style.TextStyle}>Sarfaraz Malik</Text>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="edit" type='Feather' style={Style.IconStyle} />
                    <Text style={Style.TextStyle}>11 Jan 1991</Text>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="edit" type='Feather' style={Style.IconStyle} />
                    <Text style={Style.TextStyle}>+92 3359959</Text>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="edit" type='Feather' style={Style.IconStyle} />
                    <Text style={Style.TextStyle}>Instagram</Text>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="edit" type='Feather' style={Style.IconStyle} />
                    <Text style={Style.TextStyle}>abc@gmail.com</Text>
                    </View>

                    <View style={Style.childContainer}>
                    <Icon name="edit" type='Feather' style={Style.IconStyle} />
                    <Text style={Style.TextStyle}>Password</Text>
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
          backgroundColor:'white'
      },
      BgHeader:{
          flex: 0.3,
          alignItems:'center',
          borderBottomLeftRadius: 130,
          borderBottomRightRadius: 130,
          backgroundColor: "#8BC080",
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
        padding:10
    },
    TextStyle:{
        color:'#006400',
        fontSize:14,
        textAlign:'center',
        marginLeft:50
    },
    IconStyle:{
        fontSize:20,
        color:'#006400'
    }
}
  )

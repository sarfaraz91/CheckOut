import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';
import auth from '@react-native-firebase/auth';
import CommonStyles from '../CommonStyles';

class MenuSlider extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            role: ''
        }
    }

    componentDidMount() {

    }

    // signOutUser = async () => {
    //     try {
    //         await auth().signOut();
    //         this.props.navigation.navigate('Login');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    render() {

        const menuComponents = [
            { name: 'Home', iconName: 'home', iconFamily: 'Feather', iconSize: '18', route: 'Home' },
            { name: 'Add Friends', iconName: 'addusergroup', iconFamily: 'AntDesign', iconSize: '18', route: 'AddFriends' },
            { name: 'Edit Profile', iconName: 'profile', iconFamily: 'AntDesign', iconSize: '18', route: 'Profile' },
            { name: 'Settings', iconName: 'setting', iconFamily: 'AntDesign', iconSize: '18', route: 'Settings' },
            // { name: 'Log out', iconName: 'logout', iconFamily: 'AntDesign', iconSize: '18', route: 'Settings' },
        ];

        return (
            <View style={[CommonStyles.container, CommonStyles.padding, { backgroundColor: '#F7FAFE' }]}>
                
                <View
                    style={[CommonStyles.padding, CommonStyles.mtt10]} >
                    <Label style={[CommonStyles.fontBold, CommonStyles.textSizeLarge]}>Check Out</Label>
                </View>


                <FlatList
                    data={menuComponents}
                    style={{ flex: 1, marginTop: 5 }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => 
                        {
                            // item.name == "Log out" ? this.signOutUser() :
                            this.props.navigation.navigate(`${item.route}`)
                        }
                        
                        }>
                            <View style={[CommonStyles.container,
                            { flexDirection: 'row', marginVertical: 5 }]}>
                                <Icon style={[CommonStyles.padding, { fontSize: 20 }]}
                                    name={item.iconName} type={item.iconFamily} ></Icon>
                                <Text style={[CommonStyles.fontMedium,
                                CommonStyles.padding,
                                CommonStyles.textSizeNormal,
                                CommonStyles.centerText,

                                ]}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />

            </View>
        )
    }
}

export default MenuSlider;
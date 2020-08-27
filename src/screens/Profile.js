import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Profile extends React.Component {

    render() {
        return (
            <View style={Style.container}>
                <KeyboardAwareScrollView>
                    <View style={{ backgroundColor: '#8BC080', height: 60 }}></View>

                    <View style={Style.BgHeader}>

                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: 25, justifyContent: 'center' }}>Christopher</Text>
                    </View>
                    <View style={{ width: 100, height: 100, backgroundColor: '#f2f2f2', borderRadius: 50, alignSelf: 'center', marginTop: -50, alignItems: 'center', justifyContent: 'center', borderColor: '#8BC080', borderWidth: 2 }}>

                     
                        <Icon name="user" type='FontAwesome' style={{ fontSize: 80, color: '#8BC080' }} />
                     
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
                </KeyboardAwareScrollView>
                <View
                    style={[
                        CommonStyles.backButtonStyle
                    ]}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Icon
                            name="arrow-back"
                            type="MaterialIcons"
                            style={{ color: '#FFF' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Profile;

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    BgHeader: {
        height: 100,
        borderBottomEndRadius: 120,
        borderBottomStartRadius:120,
        backgroundColor: '#8BC080',
    },
    ProfileImage: {
        width: 500,
        height: 500,
        marginTop: 60
    },

    parentContainer: {
        flex: 0.7,
        flexDirection: 'column',
        marginTop: 30
    },
    childContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
        padding: 5,
        marginLeft: 10
    },
    TextStyle: {
        color: '#8BC080',
        fontSize: 16,
        textAlign: 'center',
        paddingLeft: 30

    },
    IconStyle: {
        fontSize: 18,
        color: '#8BC080',
        marginLeft: 10
    }
}
)

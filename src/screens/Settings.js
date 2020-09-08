import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, Dimensions, TextInput,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Icon, Input } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class Settings extends React.Component {

    render() {
        return (
            <View style={[CommonStyles.container]}>
                <KeyboardAwareScrollView style={Style.container}>

                    <View style={{ backgroundColor: '#8BC080', height: 120, padding: 10 }}>
                        <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Settings</Text>
                        <Text style={{ fontSize: 14, color: 'white' }}>Account Information</Text>
                    </View>
                    <View style={Style.boxContainer}>
                        <View style={Style.box}>
                            <View style={{ flexDirection: 'column', margin: 30 }}>
                                <View style={Style.boxChildren}>
                                    <Icon name="user-circle" type='FontAwesome' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" placeholder="Username" style={Style.boxtextStyle}></TextInput>
                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="smartphone" type='Feather' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" placeholder="Phone Number" style={Style.boxtextStyle}></TextInput>
                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="email" type='Fontisto' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" placeholder="Email" style={Style.boxtextStyle}></TextInput>
                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="eye" type='Feather' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" placeholder="Password" style={Style.boxtextStyle}></TextInput>
                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="appstore-o" type='AntDesign' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" style={Style.boxtextStyle}>Apps and sessions</TextInput>
                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="eye" type='Feather' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" style={Style.boxtextStyle}>Location</TextInput>
                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="poweroff" type='AntDesign' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" style={Style.boxtextStyle}>Deactivate</TextInput>
                                </View>

                            </View>

                        </View>
                    </View>
                </KeyboardAwareScrollView>
                {/* <View
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
                </View> */}
            </View>

        )
    }
}

export default Settings;

const Style = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#f2f2f2'
        },
        boxContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -30,
        },
        box: {
            height: SCREEN_HEIGHT - SCREEN_HEIGHT / 6,
            width: SCREEN_WIDTH - SCREEN_WIDTH / 8,
            backgroundColor: 'white',
            borderRadius: 10
        },
        boxChildren: {
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center'

        },
        boxtextStyle: {
            textAlign: 'center',
            color: '#8BC080',
            marginLeft: 20,
            fontSize: 16
        },
        IconStyle: {
            fontSize: 18,
            color: '#8BC080',
        }
    }
)

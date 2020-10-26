import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Icon, Input } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import { AsyncStorage } from 'react-native';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            phone: '',
            email: '',
            user: {},
            isFb: false
        };
    }

    getUser = () => {
        auth().onAuthStateChanged((user) => {
            this.setState({ user: user })
            if (user) {
                this.setState({ user: user })
                this.setState({ email: user.email })

                database()
                    .ref(`/Users/${this.state.user.uid}/`)
                    .once("value")
                    .then(async snapshot => {
                        this.setState({ username: snapshot.val().username })
                        this.setState({ phone: snapshot.val().phone })

                    });

            }
        });
    }

    componentDidMount() {
        const data = this._retrieveData()
        if (this.state.isFb == false) {
            this.getUser()
        }
    }


    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.setState({ isFb: true })
                let parsed = JSON.parse(value);
                this.setState({ username: parsed.name })
                return value;
            } else {
                this.setState({ isFb: false })
            }
        } catch (error) {
            return null;
            // Error retrieving data
        }
    };

    signOutUser = async () => {
        if (this.state.isFb == true) {
            LoginManager.logOut()
            this.removeItemValue()
            this.props.navigation.navigate('Login');
        } else {
            try {
                await auth().signOut();
                this.props.navigation.navigate('Login');
            } catch (e) {
                console.log(e);
            }
        }

    }

    async removeItemValue() {
        try {
            await AsyncStorage.removeItem('user');
            console.warn("hogya")
            return true;

        }
        catch (exception) {
            console.warn(" nh hogya :: ", exception)
            return false;
        }
    }

    render() {
        return (
            <View style={[CommonStyles.container]}>
                <KeyboardAwareScrollView style={Style.container}>

                    <View style={{ backgroundColor: '#8BC080', height: 120, justifyContent: 'center', padding: 10 }}>
                        <View style={{ marginTop: 30 }}>
                            <Text
                                style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Settings</Text>
                            <Text
                                style={{ fontSize: 14, color: 'white' }}>
                                Account Information
                            </Text>
                        </View>

                    </View>
                    <View style={Style.boxContainer}>
                        <View style={Style.box}>
                            <View style={{ flexDirection: 'column', margin: 30 }}>
                                <View style={Style.boxChildren}>
                                    <Icon name="user-circle" type='FontAwesome' style={Style.IconStyle} />
                                    {this.state.username != undefined ?
                                        <Text style={Style.boxtextStyle}>
                                            {this.state.username}
                                        </Text>
                                        :
                                        <Text style={Style.boxtextStyle}>
                                            Username
                                    </Text>
                                    }

                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="smartphone" type='Feather' style={Style.IconStyle} />
                
                                    {this.state.phone != undefined ?
                                        <Text style={Style.boxtextStyle}>
                                            {this.state.phone}
                                        </Text> :
                                        <Text style={Style.boxtextStyle}>
                                            Phone
                                        </Text>
                                    }

                                </View>

                                <View style={Style.boxChildren}>
                                    <Icon name="email" type='Fontisto' style={Style.IconStyle} />
                                    <Text style={Style.boxtextStyle}>
                                        {this.state.email != "" ? this.state.email : ""}
                                    </Text>
                                </View>


                                {/* <View style={Style.boxChildren}>
                                    <Icon name="appstore-o" type='AntDesign' style={Style.IconStyle} />
                                    <TextInput placeholderTextColor="#8BC080" style={Style.boxtextStyle}>Apps and sessions</TextInput>
                                </View> */}
                                {/* 
                                <View style={Style.boxChildren}>
                                    <Icon name="eye" type='Feather' style={Style.IconStyle} />
                                    <Text  style={Style.boxtextStyle}>Location</Text>
                                </View> */}

                                <View style={Style.boxChildren}>
                                    <Icon name="logout" type='AntDesign' style={Style.IconStyle} />
                                    <TouchableOpacity onPress={() => this.signOutUser()}>
                                        <Text style={Style.boxtextStyle}>Logout</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

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
                        }}
                    >
                        <Icon
                            name="arrow-back"
                            type="MaterialIcons"
                            style={{ color: '#FFF' }}
                        />
                    </TouchableOpacity>
                </View>
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
            marginTop: -10,
        },
        box: {
            height: SCREEN_HEIGHT - SCREEN_HEIGHT / 6,
            width: SCREEN_WIDTH - SCREEN_WIDTH / 8,
            backgroundColor: 'white',
            borderRadius: 10
        },
        boxChildren: {
            flexDirection: 'row',
            marginTop: 30,
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

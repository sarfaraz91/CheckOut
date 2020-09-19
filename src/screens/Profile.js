import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { ViewUtils } from '../Utils';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            user: {},
            username:'',
            birthday:'',
            phone:'',
            social:'',
            email:'',

        };


    }


    getUser = () => {
        auth().onAuthStateChanged((user) => {
            this.setState({ user: user })
            if (user) {
                this.setState({ user: user })
                this.setState({email:user.email})
            }

        });

    }

    componentDidMount() {
        this.getUser()
        console.warn("this.state.user.uid :: ",this.state.user.uid)

        database()
        .ref(`/Users/${this.state.user.uid}/`)
        .once("value")
        .then(async snapshot => {
            console.warn("snapshot :: ",snapshot)
            snapshot.forEach(item => {
                console.warn("item :: ",item)
                this.setState({ username: item.username })
                this.setState({ phone: item.phone })
                this.setState({ social: item.social })
                this.setState({ birthday: item.birthday })
            });
            
        });

    }


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
                            <TextInput
                                value={this.state.username}
                                onChangeText={val => this.setState({ username: val })}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#8BC080'
                                placeholder="Username"
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                style={Style.TextStyle}>
                            </TextInput>
                        </View>

                        <View style={Style.childContainer}>
                            <Icon name="birthday-cake" type='FontAwesome5' style={Style.IconStyle} />
                            <TextInput
                                value={this.state.birthday}
                                onChangeText={val => this.setState({ birthday: val })}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#8BC080'
                                placeholder="Birthday"
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                style={Style.TextStyle}>
                            </TextInput>
                        </View>

                        <View style={Style.childContainer}>
                            <Icon name="smartphone" type='Feather' style={Style.IconStyle} />
                            <TextInput
                                value={this.state.phone}
                                onChangeText={val => this.setState({ phone: val })}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#8BC080'
                                placeholder="Phone Number"
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                style={Style.TextStyle}>
                            </TextInput>
                        </View>

                        <View style={Style.childContainer}>
                            <Icon name="instagram" type='AntDesign' style={Style.IconStyle} />
                            <TextInput
                                value={this.state.social}
                                onChangeText={val => this.setState({ social: val })}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#8BC080'
                                placeholder="Social Account"
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                style={Style.TextStyle}>
                            </TextInput>

                        </View>

                        <View style={Style.childContainer}>
                            <Icon name="email" type='Fontisto' style={Style.IconStyle} />
                            <TextInput
                                value={this.state.email}
                                onChangeText={val => this.setState({ email: val })}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#8BC080'
                                placeholder="Email"
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                style={Style.TextStyle}>
                            </TextInput>

                        </View>

                        {/* <View style={Style.childContainer}>
                            <Icon name="eye" type='Feather' style={Style.IconStyle} />
                            <TextInput
                                value={this.state.user.email}
                                //onChangeText={val => this.setState({ username: val })}
                                underlineColorAndroid='transparent'
                                placeholderTextColor='#8BC080'
                                placeholder="Password"
                                enablesReturnKeyAutomatically
                                autoCapitalize='none'
                                style={Style.TextStyle}>
                            </TextInput>
                            <TextInput placeholderTextColor="#8BC080" placeholder="Password" style={Style.TextStyle}></TextInput>
                        </View> */}
                    </View>
                    <View style={Style.btnContainer}>
                        <TouchableOpacity style={Style.btnStyle}
                            onPress={()=>this.updateProfile() }
                        >
                            <Text style={Style.btnText}>Update</Text>
                        </TouchableOpacity>
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

    updateProfile(){
        database()
        .ref(`/Users/${this.state.user.uid}/`)
        .set({
          email: this.state.email,
          birthday: this.state.birthday,
          phone: this.state.phone,
          social: this.state.social,
          username: this.state.username,
        })
        .then(() => ViewUtils.showAlert("Update Successfully."));
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
        borderBottomStartRadius: 120,
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

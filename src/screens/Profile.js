import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { Icon, Input, Item, DatePicker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker'
import { ViewUtils } from '../Utils';
import storage from '@react-native-firebase/storage';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            user: {},
            username: '',
            birthday: '',
            phone: '',
            social: '',
            email: '',
            image: '',
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
                        console.warn("snapshot : ",snapshot)
                        this.setState({ username: snapshot.val().username })
                        this.setState({ phone: snapshot.val().phone })
                        this.setState({ social: snapshot.val().social })
                        this.setState({ birthday: snapshot.val().birthday })

                    });

                this.getImage()
            }
        });
    }

    async getImage() {
        const url = await storage()
            .ref(`gs://comcheckout.appspot.com/${this.state.user.uid}`)
            .getDownloadURL();

        this.setState({ image: url })

    }

    componentDidMount() {
        const data = this._retrieveData()
        console.warn("data : ",data)
        if (this.state.isFb == false) {
            this.getUser()
        }

    }


    render() {
        return (
            <View style={Style.container}>
                <KeyboardAwareScrollView>
                    <View style={{ backgroundColor: '#8BC080', height: 60 }}></View>

                    <View style={Style.BgHeader}>
                        {this.state.username != '' ? (
                            <Text style={{ alignSelf: 'center', color: 'white', fontSize: 25, justifyContent: 'center' }}>{this.state.username}</Text>

                        ) : (
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 25, justifyContent: 'center' }}>{this.state.email}</Text>

                            )}
                    </View>
                    <TouchableOpacity
                        style={{ width: 100, height: 100, backgroundColor: '#f2f2f2', borderRadius: 50, alignSelf: 'center', marginTop: -50, alignItems: 'center', justifyContent: 'center', borderColor: '#8BC080', borderWidth: 2 }}

                        onPress={() => this.handleChoosePhoto()}
                    >
                        {this.state.image != '' ? (
                            <Image
                                source={{ uri: this.state.image }}
                                style={Style.profileImg}
                            />
                        ) : (
                                <Icon name="user" type='FontAwesome' style={{ fontSize: 80, color: '#8BC080' }} />

                            )
                        }


                    </TouchableOpacity>

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
                                editable={this.state.isFb == false ? true : false}
                                style={Style.TextStyle}>
                            </TextInput>
                        </View>

                        <View style={Style.childContainer}>
                            <Icon name="birthday-cake" type='FontAwesome5' style={Style.IconStyle} />
                            <Item
                            >
                                <DatePicker
                                    // defaultDate={new Date()}
                                    // minimumDate={new Date()}
                                    locale={'en'}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={'fade'}
                                    androidMode={'default'}
                                    underlineColorAndroid={'transparent'}
                                    placeHolderText="mm/dd/yyyy"
                                    textStyle={Style.TextStyle}
                                    placeHolderTextStyle={Style.TextStyle}
                                    value={this.state.birthday}
                                    onDateChange={val => this.setState({ birthday: val.getDate() + "-" + (val.getMonth() + 1) + "-" + val.getFullYear() })}
                                    disabled={this.state.isFb == false ? false : true}

                                />
                            </Item>
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
                                keyboardType='numeric'
                                editable={this.state.isFb == false ? true : false}
                                style={Style.TextStyle}>
                            </TextInput>
                        </View>

                        {/* <View style={Style.childContainer}>
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

                        </View> */}

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
                                editable={this.state.isFb == false ? true : false}
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
                    {this.state.isFb == false && 
                     <View style={Style.btnContainer}>
                     <TouchableOpacity style={Style.btnStyle}
                         onPress={() => this.updateProfile()}
                     >
                         <Text style={Style.btnText}>Update</Text>
                     </TouchableOpacity>
                 </View>}
                   
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

    handleChoosePhoto = () => {

        const options = {
            title: '',
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // show loader
                const fileData = new FormData();
                const source = { uri: response.uri };
                this.setState({
                    image: source.uri,
                });
            }
        });

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.setState({isFb : true})
                let parsed = JSON.parse(value);  
                this.setState({username : parsed.name})
                this.setState({image : parsed.image})
                return value;
            }else{
                this.setState({isFb : false})
            }
        } catch (error) {
            return null;
            // Error retrieving data
        }
    };



    updateProfile() {
        console.warn("this.state.user.uid :: ",this.state.user.uid)
        database()
        .ref(`/Users/${this.state.user.uid}/`)
        .set({
            email: this.state.email,
            birthday: this.state.birthday,
            phone: this.state.phone,
            //social: this.state.social,
            username: this.state.username,
        })
        .then(() => {
             ViewUtils.showAlert("Update Successfully.")
            //console.warn("done")
        });

        // if (this.state.image != '') {
        //     var reference = storage().ref(`gs://comcheckout.appspot.com/${this.state.user.uid}`);
        //     const task = reference.putFile(this.state.image)
        //     task.then(() => {
        //         console.log('Image uploaded to the bucket!');
        //     });
        // }
        
     

        
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
    },
    profileImgContainer: {
        marginLeft: 8,
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    profileImg: {
        height: 95,
        width: 95,
        borderRadius: 55,
    },
}
)

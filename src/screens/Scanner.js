import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { Icon } from 'native-base';
import { View, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { BackHandler, Alert,AsyncStorage } from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';


class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billId: ''
        }

    }

    onSuccess = e => {
        try {
            if (e.data != undefined) {
                if(this.state.billId != ''){
                    axios.get(e.data)
                    .then(res => {
                        this.props.navigation.navigate('Bill', { res: res });
                    })
                }else{
                    this._showAlertForOrder()
                }
               

            }
        } catch (error) {
            console.log(error);
        }
    }

    _showAlertForOrder(){
        Alert.alert(
            "Add Order",
            `Please Add Your Order First!`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                { text: "Add Order", onPress: () => this.props.navigation.navigate('Order') }
            ],
            { cancelable: false }
        );
    }

    renderScanner(){
        
        return (
            <QRCodeScanner
                    onRead={this.onSuccess}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={

                        <Text style={styles.textBold}>Please scan the Barcode for Payment</Text>

                    }
                />
        )
    }

    render() {


        return (
            <View style={[CommonStyles.container, { backgroundColor: '#F7FAFE' }]}>
              {this.renderScanner()}

                <View
                    style={[
                        {
                            position: 'absolute',
                            left: 17,
                            top: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    ]}>
                    <TouchableOpacity
                        onPress={() => {
                            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name="bars" type='AntDesign' size={21} color="#303030" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    getUser = () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                console.warn("email :: ",user.email)
            }
        });
    }

    componentDidMount() {
        this.getUser()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.props.navigation.addListener('focus', payLoad => {
            this.renderScanner()
            this._GetBillId()
            })
        
    }

    async _GetBillId() {
        try {
            let billId = await AsyncStorage.getItem('billId');
            console.warn("billId : ",billId)
            if (billId != null) {
                this.setState({billId : billId})
            }
            else {
                // do something else
            }
        } catch (error) {
            console.warn("error : ",error)
            // Error retrieving data
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

}

export default Scanner;

const styles = StyleSheet.create({
    centerText: {
        fontSize: 18,
        padding: 32,
        color: '#777',
        marginTop: 10

    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 18,
    }
});
import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { Icon } from 'native-base';
import { View, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { BackHandler, Alert } from 'react-native';
import axios from 'axios';


class Scanner extends React.Component {
    constructor(props) {
        super(props);
    }

  
    onSuccess = e => {
        try {
            if (e.data != undefined) {
                console.warn("e.data :: ",e.data)
                axios.get(e.data)
                    .then(res => {
                        //console.warn("response == ",res);
                        this.props.navigation.navigate('Bill',{res});
                    })
               // this.props.navigation.navigate('Bill');
                // Linking.openURL(e.data).catch(err => {
                //     console.error('An error occured', err)
                //     console.warn('DATA === ', e.data)
                //     //this.props.navigation.navigate('Bill',{data:e.data});
                // });

                console.warn('DATA === ', e.data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
    

        return (
            <View style={[CommonStyles.container, { backgroundColor: '#F7FAFE' }]}>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={
  
                            <Text style={styles.textBold}>Please scan the Barcode for Payment</Text> 

                    }
                    // bottomContent={

                    //     <TouchableOpacity style={styles.buttonTouchable}>
                    //         <Text style={styles.buttonText}>OK. Got it!</Text>
                    //     </TouchableOpacity>
                    // }
                />

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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

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
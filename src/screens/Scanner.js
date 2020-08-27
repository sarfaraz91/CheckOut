import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import {Icon} from 'native-base';
import { View, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class Scanner extends React.Component {
    constructor(props) {
        super(props);
    }

    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    render() {
        return (
            <View style={[CommonStyles.container, { backgroundColor: '#F7FAFE' }]}>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    // flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to{' '}
                            <Text style={styles.textBold}>e</Text> on
            your computer and scan the QR code.
          </Text>
                    }
                    bottomContent={

                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
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
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name="bars" type='AntDesign' size={21} color="#303030" />
                    </TouchableOpacity>
                </View>
            </View>
        );
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
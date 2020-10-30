import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet,AsyncStorage } from 'react-native';
import CommonStyles from '../CommonStyles';
import { Icon, Item, Picker } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ViewUtils } from '../Utils';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


export default class Invoice extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            billId: props.route.params.billId,
            invoice: [],
            amountLeft: 0,
            email: '',
            amountPaid: 0
        };

        console.warn("props.route.params : ", props.route.params)
    }


    componentDidMount() {
        AsyncStorage.setItem('billId','')
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userId: user.uid })

            }
        });
        this._getBill()
        this._getInvoice()
    }

    _getBill() {
        var self = this
        axios.get(`https://checkoutapp1.herokuapp.com/api/getbills`)
            .then(function (response) {
                let bill = response.data.filter(x => x._id == self.state.billId)
                self.setState({ amountLeft: bill[0].amount })
            })
            .catch(function (error) {
                console.warn(error);
            });

    }

    _getInvoice() {
        var self = this
        if (self.state.billId != null) {
            self.setState({ isLoading: true })
            axios.get(`https://checkoutapp1.herokuapp.com/api/getInvoice/${self.state.billId}`)
                .then(function (response) {
                    self.setState({ invoice: response.data[0] })
                    self.setState({email: response.data[0].userId})
                    self.setState({amountPaid: response.data[0].amount})
                    self.setState({ isLoading: false })
                   console.warn('invoice res ::', response.data[0].amount);
                })
                .catch(function (error) {
                    self.setState({ isLoading: false })
                    // this.setState({ loading: false })
                    console.warn(error);
                });
        } else {
            // ViewUtils.showAlert('Please provide correct amount')
        }
    }

    render() {
        return (
            <View style={Style.container}>
                <KeyboardAwareScrollView style={Style.container}>
                    <View style={{ backgroundColor: '#8BC080', height: 120, justifyContent: 'center', padding: 10 }}>
                        <View style={{ marginTop: 30 }}>
                            <Text
                                style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Invoice</Text>
                            <Text
                                style={{ fontSize: 14, color: 'white' }}>
                                Your Payment Details
              </Text>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'column', flex: 1,
                        marginTop: 40, justifyContent: 'center', alignItems: 'center'
                    }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={Style.textStyle}>Bill Paid By:</Text>
                            <Text style={Style.textStyle2}>{this.state.email}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={Style.textStyle}>Bill amount Paid:</Text>
                            <Text style={Style.textStyle2}>${this.state.amountPaid}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={Style.textStyle}>Bill amount Remaining:</Text>
                            <Text style={Style.textStyle2}>${this.state.amountLeft}</Text>
                        </View>
                        
                        <View style={Style.btnContainer}>
                        <TouchableOpacity style={Style.btnStyle}
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Text style={Style.btnText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    </View>

                </KeyboardAwareScrollView>
                <Loader loading={this.state.isLoading} />



            </View>
        );
    }

  


}



const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
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
    textStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,

    },
    textStyle2: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        marginLeft: 5

    },


}
)

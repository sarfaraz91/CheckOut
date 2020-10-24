import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Icon, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';
import { ViewUtils } from '../Utils';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Bill extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            bill: props.route.params,
            net_amount: 0

        }

        console.warn("new props :: ",props.route.params)
    }

    componentDidMount(){
        auth().onAuthStateChanged((user) => {
            this.setState({ user: user })
            if (user) {
                this.setState({ user: user })

                database()
                    .ref(`/Groups/${this.state.user.uid}/Friends`)
                    .once("value")
                    .then(async snapshot => {
                        snapshot.forEach(item => {
                            
                            const temp = item.val();
                           // console.warn("tem : ",temp)
                        });

                    });

            }
        });
    }

    async shareBill() {
        axios.post('https://checkoutapp1.herokuapp.com/api/users', {
            token: fcmToken,
            username: this.state.username,
            email: this.state.username
        })
            .then(function (response) {
                // this.setState({ loading: false })      
                console.log(response);
            })
            .catch(function (error) {
                // this.setState({ loading: false })
                console.log(error);
            });

    }


    render() {
        var total = 0;
        // for (var i in this.state.bill) {
        //     total += this.state.bill[i].amount;
        // }

        //console.warn("total : ", total)

        return (
            <View style={Style.container}>
                <KeyboardAwareScrollView style={Style.container}>
                    <View style={{ backgroundColor: '#8BC080', height: 120, padding: 10, flexDirection: 'row' }}>
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
                        <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', marginLeft: 50, marginTop: 15 }}>Bill</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, fontSize: 16 }}>Food</Text>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                    {/* <Text style={Style.TextStyle}>Q</Text>
                                    <Text style={Style.TextStyle}>Unit</Text> */}
                                    <Text style={Style.TextStyle}>Price</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <FlatList
                            data={this.state.bill}
                            renderItem={({ item }) => (
                                <View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 1, fontSize: 16 }}>{item.foodItem}</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                            <Text style={Style.TextStyle}>$</Text>
                                            {/* <Text style={Style.TextStyle}>${item.price}</Text>
                                            <Text style={Style.TextStyle}>${item.TOTAL}</Text> */}
                                            {/* <Text style={Style.TextStyle}>2</Text>
                                            <Text style={Style.TextStyle}>100</Text>
                                            <Text style={Style.TextStyle}>200</Text> */}
                                        </View>

                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 40, marginLeft: 10 }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: 24 }}>Net Amount = </Text>
                                {/* <Text style={{ fontSize: 24 }}>${this.state.net_amount}</Text> */}
                                <Text style={{ fontSize: 24 }}>{total}</Text>

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                        <View style={Style.btnContainer}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => this.props.navigation.navigate('Payment')}
                            >
                                <Text style={Style.btnText}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Style.btnContainer2}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => ViewUtils.showToast("Work in Progress")}
                            >
                                <Text style={Style.btnText}>Share Bill</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default Bill;

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

    },
    IconStyle: {
        fontSize: 18,
        color: '#8BC080',
        marginLeft: 10
    }, btnContainer: {
        width: '95%',
        marginTop: 30,
        alignSelf: 'center',
    },
    btnContainer2: {
        width: '95%',
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

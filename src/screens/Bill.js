import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Icon, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Bill extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // bill: props.route.params.res.data,
            //             net_amount:0
            bill: []
        }

        // console.warn("my billll -- ",this.state.bill)
        this.state.bill = ['11', '33', '44', '55']
    }
    render() {
        //this.state.net_amount = this.state.bill[0].totalprice;
        // console.warn("bill --- ",this.state.bill);
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
                                    <Text style={Style.TextStyle}>Q</Text>
                                    <Text style={Style.TextStyle}>Unit</Text>
                                    <Text style={Style.TextStyle}>Total</Text>
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
                                        <Text style={{ flex: 1, fontSize: 16 }}>{item.name}</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                            {/* <Text style={Style.TextStyle}>{item.quantity}</Text>
                                            <Text style={Style.TextStyle}>${item.price}</Text>
                                            <Text style={Style.TextStyle}>${item.TOTAL}</Text> */}
                                            <Text style={Style.TextStyle}>2</Text>
                                            <Text style={Style.TextStyle}>100</Text>
                                            <Text style={Style.TextStyle}>200</Text>
                                        </View>

                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ margin: 40 }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24 }}>Net Amount = </Text>
                                {/* <Text style={{ fontSize: 24 }}>${this.state.net_amount}</Text> */}
                                <Text style={{ fontSize: 24 }}>800</Text>

                            </View>
                        </View>
                    </View>
                    <View style={Style.btnContainer}>
                        <TouchableOpacity style={Style.btnStyle}
                            onPress={()=>this.props.navigation.navigate('Payment')}
                        >
                            <Text style={Style.btnText}>Payment</Text>
                        </TouchableOpacity>
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
        width: '70%',
        marginTop: 70,
        alignSelf: 'center',
    },
    btnStyle: {
        marginVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        color: '#8BC080',
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold'
    }
}
)

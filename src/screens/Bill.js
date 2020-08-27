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
            //bill: props.route.params.data
            bill: [],
            net_amount:0
        }
    }
    render() {
        const bill = [{ "name": "Burger", "quantity": 2, "price": "150", "TOTAL": 300, "totalprice": 430 }, { "name": "Fries", "quantity": 3, "price": "50", "TOTAL": 150, "totalprice": 430 }, { "name": "Pepsi", "quantity": 3, "price": "30", "TOTAL": 90, "totalprice": 430 }, { "name": "sandwitch", "quantity": 1, "price": "200", "TOTAL": 200, "totalprice": 430 }]
        this.state.bill = bill
        this.state.net_amount = bill[0].totalprice;
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
                                            <Text style={Style.TextStyle}>{item.quantity}</Text>
                                            <Text style={Style.TextStyle}>${item.price}</Text>
                                            <Text style={Style.TextStyle}>${item.TOTAL}</Text>
                                        </View>

                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ margin: 40 }}>
                        <View>
                            <View style={{ flexDirection: 'row',alignItems:'flex-end',justifyContent:'center' }}>
                                <Text style={{ fontSize: 24 }}>Net Amount = </Text>
                                <Text style={{ fontSize: 24 }}>${this.state.net_amount}</Text>

                            </View>
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
    }
}
)

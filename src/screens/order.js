import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, TextInput, FlatList, Alert,AsyncStorage } from 'react-native';
import CommonStyles from '../CommonStyles';
import { Icon, Item, Picker } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ViewUtils } from '../Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';
import Loader from '.././assets/components/Loader';

export default class Order extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            itemName: '',
            itemPrice: 0,
            foodItem: [],
            refresh: false
        };


    }

    componentDidMount() {

    }

    showAlertAddItem(itemName) {
        Alert.alert(
            "Add Item",
            `Do you want to add ${itemName} to your order?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                { text: "OK", onPress: () => this.addItem() }
            ],
            { cancelable: false }
        );
    }
    
    showAlertConfirmOrder() {
        Alert.alert(
            "Confirm Your Order",
            `Are you sure you want to order these items?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                { text: "OK", onPress: () => this.confirmOrder() }
            ],
            { cancelable: false }
        );
    }

    addItem() {
        var element = {}
        element.item = this.state.itemName;
        element.price = parseInt(this.state.itemPrice);
        this.state.foodItem.push(element)
        this.setState({
            refresh: !this.state.refresh
        })
        ViewUtils.showToast('Item is added!')
    }

    confirmOrder() {
    var self = this;

        var totalAmount = this.state.foodItem.map(x => x.price).reduce((totalAmount, current) => totalAmount + current, 0)
        self.setState({ isLoading: true })
        axios.post('https://checkoutapp1.herokuapp.com/api/bills', {
            foodItem: this.state.foodItem,
            amount: totalAmount,
        })
            .then(function (response) {
                // this.setState({ loading: false })      
                console.warn("res :: ",response.data._id);
                self.setState({ isLoading: false })
                self.setState({itemName: ''})
                self.setState({itemPrice: 0})
                self.setState({foodItem: []})
                ViewUtils.showToast('Order sent successfully!')
                AsyncStorage.setItem('billId', response.data._id)
                self.props.navigation.navigate('Home')
            })
            .catch(function (error) {
                self.setState({ loading: false })
                console.warn("err:: ",error);
              //  this.setState({ isLoading: false })
            });

    }


    render() {

        return (
            <View style={Style.container}>
                <KeyboardAwareScrollView>
                    <View style={{ backgroundColor: '#8BC080', height: 120, justifyContent: 'center', padding: 10 }}>
                        <View style={{ marginTop: 30 }}>
                            <Text
                                style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Order</Text>
                            <Text
                                style={{ fontSize: 14, color: 'white' }}>
                                Order your food
                        </Text>
                        </View>
                    </View>
                    <View style={[CommonStyles.container]}>

                        <TextInput
                            value={this.state.itemName}
                            onChangeText={val => this.setState({ itemName: val })}
                            underlineColorAndroid='#8BC080'
                            placeholderTextColor='black'
                            placeholder="Food Name"
                            autoCapitalize='none'
                            style={Style.input}></TextInput>

                        <TextInput
                            value={this.state.itemPrice}
                            onChangeText={val => this.setState({ itemPrice: val })}
                            underlineColorAndroid='#8BC080'
                            placeholderTextColor='black'
                            placeholder="Food Price"
                            keyboardType='numeric'
                            autoCapitalize='none'
                            style={Style.input}></TextInput>

                        <View style={Style.btnContainer}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => {
                                    if (this.state.itemName != '' && this.state.itemPrice != '') {
                                        this.showAlertAddItem(this.state.itemName)
                                    } else {
                                        ViewUtils.showToast('Please fill all fields')
                                    }
                                }}
                            >
                                <Text style={Style.btnText}>Add Item</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 15 }}>
                            {this.state.foodItem.length > 0 ? <Text style={{ fontSize: 20 }}>Order Details</Text> : console.log('no items')}
                            <FlatList
                                data={this.state.foodItem}
                                extraData={this.state.refresh}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'column' }}>

                                        <Text style={Style.TextStyle}>Item: {item.item}</Text>
                                        <Text style={Style.TextStyle}>Price: {item.price}</Text>

                                    </View>
                                )}
                            />
                        </View>
                        {this.state.foodItem.length > 0 ?
                            <View style={Style.btnContainer}>
                                <TouchableOpacity style={Style.btnStyle}
                                    onPress={() => this.showAlertConfirmOrder()}
                                >
                                    <Text style={Style.btnText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                            : console.log('no items')
                        }


                    </View>
                    <Loader loading={this.state.isLoading} />
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
    input: {
        marginTop: 5,
        width: '90%',
        padding: 15,
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 2,
        fontSize: 15,
        alignSelf: 'center'
    },
    TextStyle: {
        color: 'black',
        fontSize: 16,
    },
}
)

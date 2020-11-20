import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, TextInput, FlatList, Alert, AsyncStorage } from 'react-native';
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
            refresh: false,
            countPizza: 0,
            countBurger: 0,
            countFries: 0,
            countSalad: 0,
            countPasta: 0

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
        self.setState({ foodItem: [] })

        console.warn("foodItem : ", this.state.foodItem)



        if (this.state.countPizza != 0) {
            for (var i = 0; i < this.state.countPizza; i++) {
                let element = {}
                element.item = "Pizza";
                element.price = 12
                this.state.foodItem.push(element)
                console.warn("hogya")
            }
        }

        if (this.state.countBurger != 0) {
            for (var i = 0; i < this.state.countBurger; i++) {
                let element = {}
                element.item = "Burger";
                element.price = 8
                this.state.foodItem.push(element)
            }

        }

        if (this.state.countFries != 0) {
            for (var i = 0; i < this.state.countFries; i++) {
                let element = {}
                element.item = "Fries";
                element.price = 5
                this.state.foodItem.push(element)
            }

        }

        if (this.state.countSalad != 0) {
            for (var i = 0; i < this.state.countSalad; i++) {
                let element = {}
                element.item = "Salad";
                element.price = 10
                this.state.foodItem.push(element)
            }

        }

        if (this.state.countPasta != 0) {
            for (var i = 0; i < this.state.countPasta; i++) {
                let element = {}
                element.item = "Pasta";
                element.price = 10
                this.state.foodItem.push(element)
            }

        }

        // element.item = this.state.itemName;
        // element.price = parseInt(this.state.itemPrice);



        // this.setState({
        //     refresh: !this.state.refresh
        // })
        // ViewUtils.showToast('Item is added!')


        var totalAmount = this.state.foodItem.map(x => x.price).reduce((totalAmount, current) => totalAmount + current, 0)
        console.warn("totalAmount :: ",totalAmount)
        self.setState({ isLoading: true })
        axios.post('https://checkoutapp1.herokuapp.com/api/bills', {
            foodItem: this.state.foodItem,
            amount: totalAmount+1.44,
        })
            .then(function (response) {
                // this.setState({ loading: false })      
                console.warn("res :: ", response.data._id);
                self.setState({ isLoading: false })
                self.setState({ itemName: '' })
                self.setState({ itemPrice: 0 })
                self.setState({ foodItem: [] })
                ViewUtils.showToast('Order sent successfully!')
                AsyncStorage.setItem('billId', response.data._id)
                self.props.navigation.navigate('Home')
            })
            .catch(function (error) {
                self.setState({ loading: false })
                console.warn("err:: ", error);
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
                                style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Menu</Text>
                            <Text
                                style={{ fontSize: 14, color: 'white' }}>
                                Add menu items to your order
                        </Text>
                        </View>
                    </View>
                    <View style={[CommonStyles.container]}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>
                                    Pizza</Text>
                                {this.state.countPizza != 0 ? <Text>12$x{this.state.countPizza}</Text> : <Text>12$</Text>}
                            </View>


                            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>

                                <View style={Style.btnContainerItem}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countPizza: this.state.countPizza + 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ alignSelf: 'center', marginLeft: 30, fontSize: 20 }}>{this.state.countPizza}</Text>

                                <View style={[Style.btnContainerItem, { marginLeft: 30 }]}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countPizza: this.state.countPizza - 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>-</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>



                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>
                                    Burger</Text>
                                {this.state.countBurger != 0 ? <Text>8$x{this.state.countBurger}</Text> : <Text>8$</Text>}
                            </View>

                            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>

                                <View style={[Style.btnContainerItem]}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countBurger: this.state.countBurger + 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ alignSelf: 'center', marginLeft: 30, fontSize: 20 }}>{this.state.countBurger}</Text>

                                <View style={[Style.btnContainerItem, { marginLeft: 30 }]}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countBurger: this.state.countBurger - 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>-</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>
                                    Fries</Text>
                                {this.state.countFries != 0 ? <Text>5$x{this.state.countFries}</Text> : <Text>5$</Text>}
                            </View>

                            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>

                                <View style={Style.btnContainerItem}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countFries: this.state.countFries + 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ alignSelf: 'center', marginLeft: 30, fontSize: 20 }}>{this.state.countFries}</Text>

                                <View style={[Style.btnContainerItem, { marginLeft: 30 }]}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countFries: this.state.countFries - 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>-</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>



                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>
                                    Salad</Text>
                                {this.state.countSalad != 0 ? <Text>10$x{this.state.countSalad}</Text> : <Text>10$</Text>}
                            </View>

                            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>

                                <View style={Style.btnContainerItem}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countSalad: this.state.countSalad + 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ alignSelf: 'center', marginLeft: 30, fontSize: 20 }}>{this.state.countSalad}</Text>

                                <View style={[Style.btnContainerItem, { marginLeft: 30 }]}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countSalad: this.state.countSalad - 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>-</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>



                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>
                                    Pasta</Text>
                                {this.state.countPasta != 0 ? <Text>10$x{this.state.countPasta}</Text> : <Text>10$</Text>}
                            </View>

                            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}>

                                <View style={Style.btnContainerItem}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countPasta: this.state.countPasta + 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ alignSelf: 'center', marginLeft: 30, fontSize: 20 }}>{this.state.countPasta}</Text>

                                <View style={[Style.btnContainerItem, { marginLeft: 30 }]}>
                                    <TouchableOpacity style={Style.btnStyle}
                                        onPress={() => {
                                            this.setState({ countPasta: this.state.countPasta - 1 })
                                        }}
                                    >
                                        <Text style={Style.btnText}>-</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>



                        </View>

                        {/* 
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
                        
                         */}

                        {/* {this.state.foodItem.length > 0 ?
                            <View style={Style.btnContainer}>
                                <TouchableOpacity style={Style.btnStyle}
                                    onPress={() => this.showAlertConfirmOrder()}
                                >
                                    <Text style={Style.btnText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                            : console.log('no items')
                        } */}

                        <View style={Style.btnContainer}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => this.showAlertConfirmOrder()}
                            >
                                <Text style={Style.btnText}>Order</Text>
                            </TouchableOpacity>
                        </View>


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
    btnContainerItem: {
        width: '20%',
        alignSelf: 'center',
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

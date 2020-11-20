import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, Image } from 'react-native';
import CommonStyles from '../CommonStyles';
import { CheckBox } from 'react-native-elements'
import { Icon, Item, Picker } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ViewUtils } from '../Utils';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


export default class Itemwise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            billId: 'props.route.params.billId',
            checked:[],
            items: JSON.parse(props.route.params.foodItem),
            sum:0,
            taxPerItem:0
        };

        console.warn("items :: ", props.route.params.foodItem)

    }


    componentDidMount() {
        console.warn("items :: ", this.state.items.length)
        this.state.taxPerItem = 1.44/this.state.items.length
        console.warn("this.state.taxPerItem : ",this.state.taxPerItem)

        this.state.items.forEach(element => {
            element.price = element.price + this.state.taxPerItem
        });;
        console.warn("this.state.items : ",this.state.items)


        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userId: user.uid })

            }
        });
        let { items, checked } = this.state;
        let intialCheck = this.state.items.map(x => false);
        this.setState({ checked: intialCheck })

    }

    async handleChange(index,item){
        console.warn("itmm :: 0 ",item)
        let checked = [...this.state.checked];
        checked[index] = !checked[index];
        await this.setState({ checked });
        console.warn("this.state.checked[index].price :: ",item.price)
        if(this.state.checked[index] == true){
            await this.setState({sum : this.state.sum = this.state.sum + item.price})
            console.warn("sum :: ",this.state.sum)
        }else{
            await this.setState({sum : this.state.sum = this.state.sum - item.price})
            console.warn("sum :: ",this.state.sum)
        }
      }
    render() {

        return (
            <View style={Style.container}>
                <KeyboardAwareScrollView style={Style.container}>
                    <View style={{ backgroundColor: '#8BC080', height: 120, justifyContent: 'center', padding: 10 }}>
                        <View style={{ marginTop: 30 }}>
                            <Text
                                style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Bill Items</Text>
                            <Text
                                style={{ fontSize: 14, color: 'white' }}>
                                Chose bill items to pay
              </Text>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'column', flex: 1,
                        marginTop: 40
                    }}>

                        <FlatList
                            data={this.state.items}
                            extraData={this.state.items}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row' }}>
                                   

                                    <CheckBox
                                        containerStyle={{
                                            backgroundColor: 'rgba(52, 52, 52, 0.0)',
                                            borderColor: 'rgba(52, 52, 52, 0.0)',
                                            marginRight: -12,
                                        }}
                                          textStyle={[
                                            CommonStyles.textSizeMedium,
                                            {
                                             
                                              fontWeight: '600',
                                            },
                                          ]}


                                        title={item.item}
                                        iconRight
                                        iconType="material"
                                        checkedIcon={<Image style={{ width: 30, height: 30 }} source={require('../assets/img/checked.png')} />}
                                        checkedColor="#000"
                                        uncheckedIcon={<Image style={{ width: 30, height: 30 }} source={require('../assets/img/uncheck.png')} />}
                                        onPress={() => this.handleChange(index,item)}
                                        checked={this.state.checked[index]}
                                    />
                                </View>
                            )}
                        />


                        <View style={Style.btnContainer}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => {
                                    if(this.state.sum != 0){
                                        this.props.navigation.navigate('Payment',{itemwise: this.state.sum.toString()})
                                    }else{
                                        ViewUtils.showAlert("Please chose atlease one item")
                                    }
                                }}
                            >
                                <Text style={Style.btnText}>Done</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAwareScrollView>
                <Loader loading={this.state.isLoading} />
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
    TextStyle: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',

    },
    checkbox: {
        alignSelf: "center",
    },

}
)

import React, { Component } from 'react';
import CommonStyles from '../CommonStyles';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList,Alert,AsyncStorage } from 'react-native';
import { Icon, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';
import { ViewUtils } from '../Utils';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Bill extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user: {},
            allBills: props.route.params.res.data,
            myBill:[],
            billId: '',
            net_amount: 0,
            emails:[],
            myBill: []
        }

    }   

    async _getBill(){
        const billId =  await AsyncStorage.getItem('billId')
        this.setState({billId:billId})        
        const bill = this.state.allBills.filter(x => x._id == this.state.billId)
        Object.keys(bill).forEach(key => {
         this.setState({myBill:bill[key].foodItem})
         this.setState({net_amount:bill[key].amount})
       });
    }

    componentDidMount() {
        this._getBill()
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user })

                database()
                    .ref(`/Groups/${this.state.user.uid}/Friends`)
                    .once("value")
                    .then(async snapshot => {
                        let emails = [];
                       // console.warn("this.state.user.email ::: ",this.state.user.email)
                        emails.push(this.state.user.email)
                        snapshot.forEach(item => {

                            const temp = item.val();
                            emails.push(temp.email);
                        })
                       // console.warn("emails ::: ",emails)

                        this.setState({ emails: emails });
                    });

            }
        });
    }

    showAlertForShare() {
        Alert.alert(
            "Share Bill",
            `Do you want to share bill with your friends?`,
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                },
                { text: "Yes", onPress: () => this.shareBill() }
            ],
            { cancelable: false }
        );
    }

    async shareBill() {
        var self = this;
      //  self.setState({ isLoading: true })
        // console.warn('dsadsads :: ',this.state.emails);

        axios.post('https://checkoutapp1.herokuapp.com/api/noti', {
            userIds: this.state.emails,
            billId: this.state.billId,
            isDivide: true
        })
            .then(function (response) {
                console.warn('res :: ',response);
                self.props.navigation.navigate('Payment')
               // self.setState({ loading: false })      
            })
            .catch(function (error) {
                console.warn('err :: ',error);

               // self.setState({ loading: false })
            });

    }


    render() {
        
      
        //console.warn("ss :: ",myBill[0])
        // this.state.myBill = myBill[0].foodItem
        // this.state.net_amount = myBill[0].amount

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
                                <Text style={{ flex: 1, fontSize: 20 }}>Item</Text>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                    <Text style={Style.TextStyle}>Price</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <FlatList
                            data={this.state.myBill}
                            renderItem={({ item }) => (
                                <View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 1, fontSize: 16,color:'#8BC080' }}>{item.item}</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                            <Text style={{fontSize: 16,color:'#8BC080'}}>${item.price}</Text>
                                        </View>

                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 40, marginLeft: 10 }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end',marginRight:10 }}>
                            <Text style={{ fontSize: 20,color:'#8BC080' }}>Total = ${this.state.net_amount}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                        <View style={Style.btnContainer}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => this.props.navigation.navigate('Payment')}
                            >
                                <Text style={Style.btnText}>Pay Full Bill</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Style.btnContainer2}>
                            <TouchableOpacity style={Style.btnStyle}
                                onPress={() => this.showAlertForShare()}
                            >
                                <Text style={Style.btnText}>Share Bill</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Loader loading={this.state.isLoading} />
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
        color: 'black',
        fontSize: 20,
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

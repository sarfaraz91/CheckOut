import React, { PureComponent } from 'react';
import Button from '../../components/Button';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, AsyncStorage, Modal, } from 'react-native';
import stripe from 'tipsi-stripe';
import axios from 'axios';
import CommonStyles from '../CommonStyles';
import { Icon, Input } from 'native-base';
import { ViewUtils } from '../Utils';
import Loader from '.././assets/components/Loader';
import auth from '@react-native-firebase/auth';


stripe.setOptions({
  publishableKey: 'pk_test_mIEBlVIOKBx6lt0FzuyGdFgo'
})

export default class Payment extends PureComponent {
  static title = 'Card Form'
  constructor(props) {
    super(props);
    if(this.props.route.params){
      if(this.props.route.params.dividedBill != undefined){
        this.state = {
          loading: false,
          token: null,
          isLoading: false,
          amount: this.props.route.params.dividedBill,
          tokenId: null,
          billId: '',
          email: ''
        }
      }else if(this.props.route.params.totalBill != undefined){
        this.state = {
          loading: false,
          token: null,
          isLoading: false,
          amount: this.props.route.params.totalBill,
          tokenId: null,
          billId: '',
          email: ''
        }
      }else if(this.props.route.params.itemwise != undefined){
        this.state = {
          loading: false,
          token: null,
          isLoading: false,
          amount: this.props.route.params.itemwise,
          tokenId: null,
          billId: '',
          email: ''
        }
      }else if(this.props.route.params.net_amount != undefined){
        this.state = {
          loading: false,
          token: null,
          isLoading: false,
          amount: this.props.route.params.net_amount,
          tokenId: null,
          billId: '',
          email: '',
          
        }
      }
    }
    // else{
    //   this.state = {
    //     loading: false,
    //     token: null,
    //     isLoading: false,
    //     amount: '',
    //     tokenId: null,
    //     billId: '',
    //     email: ''
    //   }
    // }

    console.warn("props :: ", this.state.amount)

  }

  getUser = () => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ email: user.email })
        }
    });
}


  componentDidMount() {
    this.getUser()
    this._getData()

    this.handleCardPayPress();
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      })
      this.setState({ loading: false, token, tokenId: token.tokenId })
    } catch (error) {
      this.props.navigation.goBack();
      this.setState({ loading: false })
    }
  }

  async _getData() {
    const billId = await AsyncStorage.getItem('billId')
    // const email = await AsyncStorage.getItem('email')

    // console.warn("email :: ",email)
    console.warn("billId :: ",billId)

   // this.setState({ email: email })

    // const dividedFlag = await AsyncStorage.getItem('dividedFlag', (err, value) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.warn("df :: ", JSON.parse(value))
    //     JSON.parse(value)
    //   }
    // })

    // const totalFlag = await AsyncStorage.getItem('totalFlag', (err, value) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.warn("tf :: ", JSON.parse(value))
    //     JSON.parse(value) // boolean false
    //   }
    // })


    // if (totalFlag === 'true') {
    //   const totalBill = await AsyncStorage.getItem('totalBill')
    //   console.warn("tb ", totalBill)
    //   this.setState({ amount: totalBill })
    // } else if (dividedFlag === 'true') {
    //   const dividedBill = await AsyncStorage.getItem('dividedBill')
    //   console.warn("db ", dividedBill)
    //   this.setState({ amount: dividedBill })
    // }


    this.setState({ billId: billId })
  }

  makePayment = async () => {
    console.warn("ampunt ::: ", this.state.amount)
    var self = this
    var amountInNumber = parseFloat(this.state.amount)

    console.warn("this.state.tokenId :: ",this.state.tokenId)
    console.warn("amountInNumber :: ",amountInNumber)
    console.warn("this.state.billId :: ",this.state.billId)
    console.warn("this.state.email :: ",this.state.email)


    if (amountInNumber != 0) {

      self.setState({ isLoading: true })
      // console.warn("ampunt ::: ",this.state.amount)

      axios.post('https://checkoutapp1.herokuapp.com/api/stripe', {
        token: this.state.tokenId,
        amount: amountInNumber,
        billId: this.state.billId,
        userId: this.state.email
      })
        .then(function (response) {
          console.warn("response:: ", response.data.status);
          self.setState({ isLoading: false })
          if(response.data.status == "paid"){
            ViewUtils.showToast('Full Payment Recieved! ')
          }else{
            ViewUtils.showToast('Partial Payment Recieved! ')
          }
          
          self.props.navigation.navigate('Invoice',{billId: self.state.billId})

        })
        .catch(function (error) {
          self.setState({ isLoading: false })
          console.warn("errro : ", error);
        });
    } else {
      ViewUtils.showAlert('Please provide correct amount')
    }


  }


  render() {
    const { loading, token } = this.state
    console.warn("token :: ",token)
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: '#8BC080', height: 120, justifyContent: 'center', padding: 10 }}>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Payment</Text>
            <Text
              style={{ fontSize: 14, color: 'white' }}>
              Pay bill
              </Text>
          </View>

        </View>
        <View
          style={[CommonStyles.container]}
        >
            <View>
              <TextInput
                value={this.state.amount}
                editable={false}
                underlineColorAndroid='transparent'
                placeholderTextColor='black'
                placeholder="Enter amount"
                enablesReturnKeyAutomatically
                autoCapitalize='none'
                keyboardType='numeric'
                maxLength={6}
                style={styles.input}>
              </TextInput>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnStyle}
                  onPress={() => this.makePayment()}
                >
                  <Text style={styles.btnText}>Make Payment</Text>
                </TouchableOpacity>
              </View>
            </View>
          
        </View>
        <Loader loading={this.state.isLoading} />
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  input: {
    marginTop: 5,
    width: '90%',
    padding: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontSize: 15,
    alignSelf: 'center'
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
  }
})
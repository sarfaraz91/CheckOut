import React, { PureComponent } from 'react';
import Button from '../../components/Button';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert,AsyncStorage } from 'react-native';
import stripe from 'tipsi-stripe';
import axios from 'axios';
import CommonStyles from '../CommonStyles';
import { Icon, Input } from 'native-base';
import { ViewUtils } from '../Utils';


stripe.setOptions({
  publishableKey: 'pk_test_mIEBlVIOKBx6lt0FzuyGdFgo'
})

export default class Payment extends PureComponent {
  static title = 'Card Form'
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: null,
      amount:'',
      tokenId: null,
      billId:''
    }


  }

  componentDidMount() {
    this._getData()
  //  this.setState({amout : this.props.route.params})
    console.warn("props.route.params :: ",this.props)

    this.handleCardPayPress();
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
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

  async _getData(){
    const billId =  await AsyncStorage.getItem('billId')

    const dividedFlag =  await AsyncStorage.getItem('dividedFlag', (err, value) => {
      if (err) {
          console.log(err)
      } else {
        console.warn("df :: ",JSON.parse(value))
          JSON.parse(value) 
      }
  })

    const totalFlag =  await AsyncStorage.getItem('totalFlag', (err, value) => {
      if (err) {
          console.log(err)
      } else {
        console.warn("tf :: ",JSON.parse(value))
          JSON.parse(value) // boolean false
      }
  })


    const dividedBill =  await AsyncStorage.getItem('dividedBill')
    const totalBill =  await AsyncStorage.getItem('totalBill')
    
    if(totalFlag === 'true'){
      this.setState({amount:totalBill})
    }else if(dividedFlag === 'true'){
      this.setState({amount:dividedBill})
    }


    this.setState({billId:billId})        
}

  makePayment = async () => {

    if (this.state.amount != null) {
      //this.setState({amount: this.state.amount*100})
      // this.setState({ loading: true })
      console.warn("token:,", this.state.tokenId)
      console.warn("this.state.billId :: ",this.state.billId)
      console.warn('this.state.amount ::: ',this.state.amount)
      var self = this
      axios.post('https://checkoutapp1.herokuapp.com/api/stripe', {
        token: this.state.tokenId,
        amount: this.state.amount,
        billId:this.state.billId
      })
        .then(function (response) {
          // this.setState({ loading: false })
          ViewUtils.showAlert('Bill Paid Successfully! ')
          self.props.navigation.navigate('Home')
          console.log(response);
        })
        .catch(function (error) {
          // this.setState({ loading: false })
          console.warn(error);
        });
    } else {
      ViewUtils.showAlert('Please provide correct amount')
    }


  }


  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        {/* <Text style={styles.header}>
          Card Form
          </Text> */}
        {/* <Text style={styles.instruction}>
          Click button to show Card Form.
          </Text> */}
        {/* <Button
          text="Enter your card details"
          loading={loading}
          onPress={this.handleCardPayPress}
        /> */}
        <View
          style={styles.token}
        >
          {token &&
            <View>
              {/* <TextInput placeholder="Enter amount" placeholderTextColor="#8BC080" style={styles.TextStyle}></TextInput> */}
              <TextInput
                value={this.state.amount}
                editable = {false}
                underlineColorAndroid='transparent'
                placeholderTextColor='black'
                placeholder="Enter amount"
                enablesReturnKeyAutomatically
                autoCapitalize='none'
                keyboardType='numeric'
                maxLength={6}
                style={styles.input}>
              </TextInput>
              <Button text="Make Payment"
                onPress={this.makePayment} />
            </View>
          }
        </View>
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
              style={{ color: '#000' }}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
})
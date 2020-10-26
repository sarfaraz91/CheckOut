import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import CommonStyles from '../CommonStyles';
import { Icon, Item, Picker } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ViewUtils } from '../Utils';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Loader from '.././assets/components/Loader';

export default class AddFriends extends Component {



    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            isLoading: false,
            selected: "",
            userId: '',
            emailExist: false,
        };


    }

    _getAllUsers(userEmail){
        this.setState({ isLoading: true })

        database()
            .ref('/Users/')
            .once("value")
            .then(async snapshot => {
                this.setState({ isLoading: false })
                if(snapshot.val()){
                    let emails = [];
                    snapshot.forEach(item => {
                        const temp = item.val();
                        if(temp.email !== userEmail){
                            emails.push(temp);
                        }
                        
                    });
                    this.setState({ emails: emails })
                }else{
                    ViewUtils.showToast('No Record Found')
                }
                
            });
    }

    componentDidMount() {
        
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ userId: user.uid })
                this._getAllUsers(user.email)
            }
        });
        
       

    }

    onValueChange = (value) => {
        this.setState({ selected: value })
    }

    render() {
        return (
            <View style={Style.container}>
                <View style={{ backgroundColor: '#8BC080', height: 120, justifyContent: 'center', padding: 10 }}>
                    <View style={{ marginTop: 30 }}>
                        <Text
                            style={{ textAlign: 'left', fontSize: 24, color: 'white', fontWeight: 'bold' }} >Add Friends</Text>
                        <Text
                            style={{ fontSize: 14, color: 'white' }}>
                            Add your friends to your Group
              </Text>
                    </View>

                </View>
                <View style={[CommonStyles.container]}>
                    <Item
                        picker
                        style={[
                            CommonStyles.itemStyle,
                            { marginVertical: 10, paddingTop: 10 },
                        ]}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}

                            placeholder="Choose Frequency"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Picker.Item
                                color="gray"
                                selected={false}
                                label="Please select a Friend"
                                value=""
                            />
                            {this.renderPicker()}
                        </Picker>
                    </Item>
                    <View style={Style.btnContainer}>
                        <TouchableOpacity style={Style.btnStyle}
                            onPress={() => this.addFriend()}
                        >
                            <Text style={Style.btnText}>Add</Text>
                        </TouchableOpacity>
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

    addFriend() {
        if (this.state.selected == '') {
            ViewUtils.showAlert('Please select a Friend to add.')
            return;
        }
        this.setState({ isLoading: true })

        database()
            .ref(`/Groups/${this.state.userId}/Friends/`)
            .once("value")
            .then(async snapshot => {
                this.setState({ isLoading: false })

                if(snapshot != null){
                    snapshot.forEach(item => {
                        const temp = item.val();
                        if (temp.email == this.state.selected) {
                            this.state.emailExist = true;
                        }
                    });
                }
                
                if (this.state.emailExist == false) {
                    let group = database()
                        .ref(`/Groups/${this.state.userId}/Friends/`).push();
                    group.set({
                        email: this.state.selected,
                    })
                        .then(() => ViewUtils.showAlert('Successfully Added.'));
                        this.state.emailExist = false;
                }else{
                    ViewUtils.showAlert('This Friend is already in your Group.')
                    this.state.emailExist = false
                }

            });



    }

    renderPicker() {
        return (
            this.state.emails.map((myValue, myIndex) => {
                return (
                    <Picker.Item label={myValue.email} value={myValue.email} key={myIndex} />
                );
            }
            )
        )
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
    }
}
)

import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import CommonStyles from '../CommonStyles';
import { Icon, Item, Picker } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ViewUtils } from '../Utils';

export default class AddFriends extends Component {

    state = {
        appointments: [],
        isLoading: true,
        selected: "key2"

    };

    constructor(props) {
        super(props);
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
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
                            {/* <Picker.Item
                                                    color="gray"
                                                    selected={false}
                                                    label="Select Vital Type"
                                                    value=""
                                                /> */}
                            <Picker.Item label="Coming 7 days" value="key0" />
                            <Picker.Item label="Coming 15 days" value="key1" />
                            <Picker.Item label="Upcoming Appointments" value="key2" />
                        </Picker>
                    </Item>


                </View>
                <View
                    style={[
                        CommonStyles.backButtonStyle
                    ]}>
                    <TouchableOpacity
                    // onPress={() => {
                    //     //this.props.navigation.goBack();
                    // }}
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
    }
}
)

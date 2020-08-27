import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';

import CommonStyles from '../CommonStyles';

class ItemList extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {

    }
    render() {

        const menuComponents = [
            { name: 'Home', iconName: 'home', iconFamily: 'Feather', iconSize: '18', route: 'Home' },
            { name: 'Profile', iconName: 'profile', iconFamily: 'AntDesign', iconSize: '18', route: 'Profile' },
            { name: 'Settings', iconName: 'setting', iconFamily: 'AntDesign', iconSize: '18', route: 'Settings' },

        ];

        return (
            <View style={[ { backgroundColor: '#F7FAFE',  alignItems: 'center', flex: 1}]}>

                <View
                    style={[CommonStyles.padding, CommonStyles.mtt10]} >
                    <Label style={[CommonStyles.fontBold, CommonStyles.textSizeLarge]}>Item List</Label>
                </View>


                <FlatList
                    data={menuComponents}
                    //style={{ marginTop: 5 }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                            <View style={[CommonStyles.container,
                            { flexDirection: 'row', marginVertical: 5 }]}>
                                <Icon style={[CommonStyles.padding, { fontSize: 20 }]}
                                    name={item.iconName} type={item.iconFamily} ></Icon>
                                <Text style={[CommonStyles.fontMedium,
                                CommonStyles.padding,
                                CommonStyles.textSizeNormal,
                                CommonStyles.centerText,

                                ]}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />

            </View>
        )
    }
}

export default ItemList;
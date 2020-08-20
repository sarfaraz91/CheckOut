import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';
import { FlatGrid } from 'react-native-super-grid'
import CommonStyles from '../../CommonStyles';



class MenuSlider extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            role: ''
        }
    }

    componentDidMount() {

    }



    render() {

        const menuComponents = [
            { name: 'Home', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'Home' },
            { name: 'Profile', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'Profile' },
            { name: 'Settings', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'Settings' },

        ];


        return (
            <View style={[CommonStyles.container, CommonStyles.padding, { backgroundColor: '#F7FAFE' }]}>

                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10]} >
                        <Label style={[CommonStyles.fontBold, CommonStyles.textSizeLarge]}>TeleMedicine</Label>
                    </View>

                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}>Personal Profile</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={menuComponents}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 22 }]}
                                        name={item.iconName} type={item.iconFamily} ></Icon>
                                    <Text style={[CommonStyles.fontMedium,
                                    CommonStyles.padding,
                                    CommonStyles.textSizeNormal,
                                    CommonStyles.centerText,

                                    ]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                   
            </View>
        )
    }
}

export default MenuSlider;
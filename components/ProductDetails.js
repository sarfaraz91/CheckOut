import React, { Component } from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';

export default class ProductDetails extends Component{

    render(){
        return(
            <View>
                <Image source={this.props.imageSource}></Image>
        <Text>{this.props.title}</Text>
            </View>
        )
    }
}
import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import Styles from '../../utilities/style';
import Colors from '../../utilities/color';

const UploadPostScreen = props => {
    return(
        <View style={Styles.dashBoardContainer}>
            <View style={Styles.postUpBar}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={Styles.arrowBackContainer}>
                    <MaterialIcons
                        name='arrow-back'
                        size={30}
                    />
                </TouchableOpacity>
                <View style={Styles.commentsUpTextContainer}>
                     <Text style={Styles.dashBoardUpText}>New Post</Text>                     
                </View>
            </View>
        </View>
    )
}


export const screenOptions = props => {
    return {
        headerTitle:'Upload',
        headerShown: false,
        gestureEnabled:false 
    }
}


export default UploadPostScreen;
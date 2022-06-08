import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';




import { getAllDisccusionsAction } from '../../store/actions';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';


const MainScreen = props => {
    const dispatch = useDispatch();
    const[userName, setUserName] = useState('');
    const getAllDisccusions = useCallback(async() => {
        let action = getAllDisccusionsAction();
        try{
            await dispatch(action);
        } catch(error) {
            console.log(error);
        }
    },[getAllDisccusionsAction, dispatch])

    getAllDisccusions();

    const CheckToken = async() => {
        const jsonToken = await AsyncStorage.getItem('Token');
        const deviceToken = jsonToken != null ? JSON.parse(jsonToken) : null; 
        if(!deviceToken) {
            const token = makeItHase("A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF");
            console.log(token);
        
            await AsyncStorage.setItem('Token', token);
        }
    }

    const makeItHase = str => {
        hash = '';
        for(var i = 0; i < str.length ; i++) {
            hash+=str[i] + Math.round(Math.random())+1;
        }
        return hash;
    }
     
    CheckToken();

    
    return(
        <KeyboardAvoidingView behavior={Platform.OS == 'ios'? 'padding' : 'height'} style={Styles.homeContainer}>
            <View style={Styles.homeTitleContainer}>
                <Text style={Styles.homeTitleText}>Welcome To What's Hot</Text>
                <Text style={Styles.homeSubTitleText}>All the hot stuff in one place!</Text>
            </View>
            <View style={Styles.homeTitleContainer}>
                <Text style={Styles.homeExplainingText}>All You Need To Do Is Just</Text>
                <Text style={Styles.homeExplainingText}>Peek A Name And Join To</Text>
                <Text style={Styles.homeExplainingText}>Awer Conversions</Text>
            </View>
            
            <View style={Styles.userInputContainer}>
                <TextInput
                    value={userName}
                    onChangeText={text => setUserName(text)}
                    style={Styles.homeInput}
                    placeholder='Input your Name'
                />

                {
                    userName.length > 2?
                    (
                        <TouchableOpacity onPress={() => props.navigation.navigate('DashBoard', {userName: userName})} style={Styles.homeScreenButton}>
                            <Text style={Styles.homeButtonText}>
                                Continue To App
                            </Text>
                        </TouchableOpacity>
                    )
                    :
                    (
                        <View  style={Styles.homeScreenButtonBlock}>
                            <Text style={Styles.homeButtonText}>
                                Continue To App
                            </Text>
                        </View>
                    )
                }
                

            </View>
        </KeyboardAvoidingView>
    )
}



export const screenOptions = props => {
    return {
        headerTitle:'Home',
        headerShown: false,
        gestureEnabled:false 
    }
}


export default MainScreen;
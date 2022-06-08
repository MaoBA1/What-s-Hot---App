import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import Post from '../components/Post';
import {getAllDisccusionsAction} from '../../store/actions';


const DasheBoardScreen = props => {
    const dispatch = useDispatch();
    const postSelector = useSelector(state => state.AllDisccusionsReducer);
    let posts = postSelector? postSelector.AllDisccusionsReducer.Disccusions : null;
    const userName = props.route.params.userName;
    const formatted_userName = userName[0].toUpperCase() + userName.substring(1,userName.length);
    
    const blessing = () => {
        const currentTime = new Date().getHours();
        if(currentTime >= 5 && currentTime<12) {
            return "Good Morning";
        } else if(currentTime >= 12 && currentTime<18) {
            return "Good After Noon";
        } else if(currentTime >= 18 && currentTime<22) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    }
    
    const blessingText = blessing().split(' ');

    const getAllDisccusions = useCallback(async() => {
        let action = getAllDisccusionsAction();
        try{
            await dispatch(action);
        } catch(error) {
            console.log(error);
        }
    },[getAllDisccusionsAction, dispatch])

    getAllDisccusions();

    return(
        <View style={Styles.dashBoardContainer}>
            <View style={Styles.dashboardUpBar}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={Styles.arrowBackContainer}>
                    <MaterialIcons
                        name='arrow-back'
                        size={30}
                    />
                </TouchableOpacity>
                <View style={Styles.dashBoardUpTextContainer}>
                     <Text style={Styles.dashBoardUpText}>{blessingText[0]} {blessingText[1]} {blessingText.length==3? blessingText[2] : ''}{' ' + formatted_userName}</Text>                     
                </View>
            </View>
            <View style={{width: '100%', alignItems:'center', marginBottom:10}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Upload', {user:formatted_userName})} style={{padding:7 , borderWidth:2, borderRadius:20, borderColor: Colors.grey1, backgroundColor: Colors.white}}>
                    <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.orange2,}}>+ Add New Post</Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.postContainer}>
                {
                    !posts || posts.length == 0?
                    (
                        <View style={Styles.noPostContainer}>
                            <Text style={Styles.noPostText}>No Content To Show Right Now</Text>
                        </View>                        
                    )
                    :
                    (
                        <FlatList
                            data={posts.reverse()}
                            keyExtractor={item => item._id}
                            renderItem={
                                post => 
                                <TouchableOpacity onPress={() => props.navigation.navigate('Discussion', {post: post.item, user: formatted_userName})}>
                                    <Post 
                                        post={post.item}
                                    />
                                </TouchableOpacity>
                            }
                        />
                    )
                }
            </View>
        </View>
    )
}


export const screenOptions = props => {
    return{
        headerTitle:'DashBoard',
        headerShown: false,
        gestureEnabled:false 
    }
}

export default DasheBoardScreen;
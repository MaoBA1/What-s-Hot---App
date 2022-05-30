import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';



const CommentScreen = props => {
    const postId = props.route.params.postId;
    const userName = props.route.params.user;
    const [commentText, setCommentText] = useState('');
    let comments = [];
    const URL = 'https://whatshotapp.herokuapp.com/api/dis/';
    const getPostById = async() => {
        const response = await fetch(URL + 'getDisccusionById/' + postId, {
            method:'GET',
            headers:{
                'Content-type': 'application/json',
            }
        });

        const data = await response.json();
        if(data.status) {
            comments.push(...data.Disccusion.comments);
            console.log(comments);
        }
    }

    const sendComment = async() => {
        const response = await fetch(URL + 'comment/' + postId, {
            method:'PUT',
            headers:{
                'Content-type': 'application/json',
            },
            body:JSON.stringify({commentAuthor: userName, comment: commentText })
        })
        const data = await response.json();

    }

    useEffect(() => {getPostById(); console.log(comments);})

    return(
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={40} style={Styles.dashBoardContainer}>
            <View style={Styles.postUpBar}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={Styles.arrowBackContainer}>
                    <MaterialIcons
                        name='arrow-back'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={{width:'100%', height:'75%'}}>
                {
                    comments.length == 0?
                    (
                        <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent: 'center'}}>
                            <Text style={Styles.homeExplainingText}>There is no comment to this post</Text>
                        </View>
                    )
                    :
                    (
                        <FlatList
                            data={comments}
                            keyExtractor={item => item._id}
                            renderItem={
                                comment =>
                                <View>
                                    <Text>{comment.item.comment}</Text>
                                </View>
                            }
                        />
                    )
                }
            </View>
            <View style={{width:'100%', height:'12%', alignItems:'center', justifyContent: 'center', backgroundColor:Colors.orange1, flexDirection:'row'}}>
                <TextInput
                    style={{width:'75%', height: 40, backgroundColor:Colors.white, borderRadius:20, marginBottom:10, paddingHorizontal:15, fontFamily:'Baloo2-SemiBold', fontSize:12, justifyContent:'center', paddingTop:10}}
                    autoCorrect={false}
                    placeholder="Comment..."
                    multiline
                    value={commentText}
                    onChangeText={text => setCommentText(text)}
                />
                {
                    commentText.length < 4?
                    (
                        <View style={{padding:10, borderWidth:2, margin:5, borderRadius:20, marginBottom:15, backgroundColor: Colors.white, borderColor:Colors.grey1, opacity:0.5}}>
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:12, color:Colors.orange2,}}>Send</Text>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity onPress={sendComment} style={{padding:10, borderWidth:2, margin:5, borderRadius:20, marginBottom:15, backgroundColor: Colors.white, borderColor:Colors.grey1}}>
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:12, color:Colors.orange2,}}>Send</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>
        </KeyboardAvoidingView>
    )
}

export const screenOptions = props => {
    return {
        headerTitle:'Comment Screen',
        headerShown: false,
        gestureEnabled:false 
    }
}

export default CommentScreen;
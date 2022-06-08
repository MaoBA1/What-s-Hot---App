import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import Comment from '../components/Comment';
import ScrollViewContext from "react-native/Libraries/Components/ScrollView/ScrollViewContext";




const CommentScreen = props => {
    const flatListRef = React.useRef();
    const postId = props.route.params.postId;
    const userName = props.route.params.user;
    const [commentText, setCommentText] = useState('');
    const [commentsArray, setCommentArray] = useState([]);
    const postAuthor = props.route.params.post.author;
    const formatted_postAuthor = postAuthor[0].toUpperCase() + postAuthor.substring(1,postAuthor.length)
    const postDate = props.route.params.post.Date;
    const postAuthorAvatar = props.route.params.post.authorAvatar;
    const postTitle = props.route.params.post.title;
    const countOfComments = props.route.params.post.comments.length;
    const countOfLikes = props.route.params.post.likes.length;
    const formatted_postDate = new Date(postDate).toDateString();
    
    
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
            setCommentArray(data.Disccusion.comments);            
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
        setCommentText('');

    }

   

    getPostById();

    return(
        <KeyboardAvoidingView
          behavior="height"
          style={Styles.dashBoardContainer}
        
        >
            <View style={{height:'88%'}}>
            <View style={Styles.postUpBar}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={Styles.arrowBackContainer}>
                    <MaterialIcons
                        name='arrow-back'
                        size={30}
                    />
                </TouchableOpacity>
                <View style={Styles.commentsUpTextContainer}>
                     <Text style={Styles.dashBoardUpText}>Comments</Text>                     
                </View>
            </View>
            
                <View style={{padding: 5, flexDirection:'row', alignItems:'center'}}>
                    <Image
                        source={{uri:postAuthorAvatar}}
                        style={{width:80, height:87}}
                    />

                    <View style={{padding:5}}>
                        <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:20, color:Colors.orange2,}}>{formatted_postAuthor}</Text>
                        <Text style={{fontFamily:'Baloo2-Regular', fontSize:12, color:Colors.orange2}}>{formatted_postDate}</Text>
                        <View style={{width:'92%', paddingRight:10}}>
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:18, color:Colors.brown1}}>{postTitle}</Text>
                        </View>
                        
                    
                    </View>
                </View>
            <View style={{backgroundColor:Colors.grey1, height:3, width:'100%'}}></View>
            <View style={{width:'100%', height:485}}>
                {
                    commentsArray.length == 0?
                    (
                        <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent: 'center'}}>
                            <Text style={Styles.homeExplainingText}>There is no comment to this post</Text>
                        </View>
                    )
                    :
                    (
                        <KeyboardAwareFlatList
                            ref={flatListRef}
                            data={commentsArray}
                            keyExtractor={item => item._id}
                            renderItem={
                                comment =>
                                <Comment comment={comment.item} postId={postId}/>
                            }
                            style={{flex:1}}
                            onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
                            
                        />
                    )
                }
            </View>
            </View>
            
            <View style={{width:'100%', height:'12%', alignItems:'center', justifyContent: 'center', backgroundColor:Colors.orange1, flexDirection:'row'}}>
                <TextInput
                    style={{width:'75%', height: 40, backgroundColor:Colors.white, borderRadius:20, paddingHorizontal:15, fontFamily:'Baloo2-SemiBold', fontSize:12, justifyContent:'center', paddingTop:10}}
                    autoCorrect={false}
                    placeholder="Comment..."
                    multiline
                    value={commentText}
                    onChangeText={text => setCommentText(text)}
                    onFocus={commentsArray.length > 0?() => flatListRef.current.scrollToEnd({animated: true}): ()=>{}}
                />
                {
                    commentText.length < 4?
                    (
                        <View style={{padding:10, borderWidth:2, margin:5, borderRadius:20, marginBottom:5, backgroundColor: Colors.white, borderColor:Colors.grey1, opacity:0.5}}>
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:12, color:Colors.orange2,}}>Send</Text>
                        </View>
                    )
                    :
                    (
                        <TouchableOpacity onPress={sendComment} style={{padding:10, borderWidth:2, margin:5, borderRadius:20, marginBottom:5, backgroundColor: Colors.white, borderColor:Colors.grey1}}>
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
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import AsyncStorage from '@react-native-async-storage/async-storage';




const DisccusionScreen = props => {
    const postAuthor = props.route.params.post.author;
    const postId = props.route.params.post._id;
    const formatted_postAuthor = postAuthor[0].toUpperCase() + postAuthor.substring(1,postAuthor.length)
    const postDate = props.route.params.post.Date;
    const postAuthorAvatar = props.route.params.post.authorAvatar;
    const postTitle = props.route.params.post.title;
    const countOfComments = props.route.params.post.comments.length;
    const countOfLikes = props.route.params.post.likes.length;
    const postImage = props.route.params.post.postImage;
    const formatted_postTitle = postTitle.length > 15? postTitle.substring(0,20) + '....' : postTitle;
    const formatted_postDate = new Date(postDate).toDateString();
    const postContent = props.route.params.post.content;
    const noImageFound = 'https://qph.fs.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq';
    const userName = props.route.params.user;
    const likesArray = props.route.params.post.likes;
    const [likeStatus, setLikeStatus] = useState(false);
    const URL = 'https://whatshotapp.herokuapp.com/api/dis/';
    const [likeCount ,setLikeCount] = useState(countOfLikes);
    

    const amIlikeThisPost = async() => {
        try{
            const jsonToken = await AsyncStorage.getItem('Token');
            const deviceToken = jsonToken != null ? JSON.parse(jsonToken) : null;
            if(deviceToken) {
                console.log(deviceToken);
                likesArray.forEach(like => {                
                    if(like.userId == deviceToken) {
                        setLikeStatus(true);
                        return ;
                    }
                })
            }
        } catch(error) {
            console.log(error);
        }
        
        
    }

     amIlikeThisPost();

    const likePost = async() => {
        
        try {            
        const jsonToken = await AsyncStorage.getItem('Token');  
        const deviceToken = jsonToken != null ? jsonToken : null;        
        if(deviceToken) {
            const response = await fetch(URL + 'likePost/' + postId ,{
                method: 'PUT',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    likerName: userName,
                    likerId: deviceToken
                })
            
            })
            
            const data = await response.json();
            console.log(data);
            if(data.status) {
                setLikeStatus(true);
                setLikeCount(countOfLikes+1);
            }
            
        }
    }
    catch(error) {
        console.log(error);
    }
        
    }
    
    return(
        <View style={Styles.dashBoardContainer}>
            <View style={Styles.postUpBar}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)} style={Styles.arrowBackContainer}>
                    <MaterialIcons
                        name='arrow-back'
                        size={30}
                    />
                </TouchableOpacity>
                <View style={Styles.dashBoardUpTextContainer}>
                    <Text style={Styles.dashBoardUpText}>{formatted_postTitle}</Text>
                </View>
            </View>
            <View style={{width:'100%', height:200}}>
                <Image
                    source={{uri:postImage? postImage : noImageFound}}
                    style={{width:'100%', height:'100%', resizeMode:'stretch'}}
                />
            </View>

            <View style={{backgroundColor:Colors.grey1, height:3, width:'100%'}}></View>
                <View style={{padding: 10, flexDirection:'row', alignItems:'center'}}>
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
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <FontAwesome
                                name="comment"
                                color={Colors.grey1}
                            />
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.grey1, marginHorizontal:2, marginRight:10}}>{countOfComments} Comments</Text>
                            
                            <AntDesign
                                name="like1"
                                color={Colors.grey1}
                            />
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.grey1, marginHorizontal:2}}>{likeCount} likes</Text>
                            
                        </View>
                    
                    </View>
                </View>
            <View style={{backgroundColor:Colors.grey1, height:3, width:'100%'}}></View>
            <ScrollView style={{width:'100%', padding:20}}>
                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:18, color:Colors.white,}}>{postContent}</Text>
                <View style={{width:'100%', alignItems:'center', flexDirection:'row', marginVertical:40}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Comment', {postId: props.route.params.post._id, user:userName, post:props.route.params.post})} style={{marginLeft:40, margin:5, padding:10, borderWidth:2, borderRadius:30, backgroundColor: Colors.white, borderColor:Colors.grey1, flexDirection:'row'}}>
                            <FontAwesome
                                name="comment"
                                color={Colors.grey1}
                                size={18}
                                style={{marginHorizontal:5}}
                            />
                            <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:12, color:Colors.orange2,}}>Show Comments</Text>
                    </TouchableOpacity>
                    {
                        likeStatus?
                        (
                             <View style={{margin:5, padding:10, borderWidth:2, borderRadius:30, backgroundColor: Colors.white, borderColor:Colors.orange1, flexDirection:'row'}}>
                                 <AntDesign
                                   name="like1"
                                   color={Colors.orange1}
                                   size={18}
                                   style={{marginHorizontal:5}}
                                 />
                                 <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:12, color:Colors.orange2,}}>Like Post</Text>
                             </View>
                        )
                        :
                        (
                            <TouchableOpacity onPress={() => likePost()} style={{margin:5, padding:10, borderWidth:2, borderRadius:30, backgroundColor: Colors.white, borderColor:Colors.grey1, flexDirection:'row'}}>
                                 <AntDesign
                                    name="like1"
                                    color={Colors.grey1}
                                    size={18}
                                    style={{marginHorizontal:5}}
                                />
                                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:12, color:Colors.orange2,}}>Like Post</Text>
                           </TouchableOpacity>
                        )
                    }
                    
                </View>                
            </ScrollView>
        </View>
    )
}



export const screenOptions = props => {
    return {
        headerTitle:'Discussion Screen',
        headerShown: false,
        gestureEnabled:false 
    }
}

export default DisccusionScreen;
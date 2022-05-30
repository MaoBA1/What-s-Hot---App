import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';



const Post = props => {
    const postAuthor = props.post.author;
    const formatted_postAuthor = postAuthor[0].toUpperCase() + postAuthor.substring(1,postAuthor.length)
    const postDate = props.post.Date;
    const postAuthorAvatar = props.post.authorAvatar;
    const postImage = props.post.postImage;
    const postTitle = props.post.title;
    const formatted_postTitle = postTitle.length > 15? postTitle.substring(0,15) + '....' : postTitle;
    const countOfComments = props.post.comments.length;
    const countOfLikes = props.post.likes.length;
    const formatted_postDate = new Date(postDate).toDateString();
    
    
    return(
        <View style={{width: 350, padding:30, margin:10, borderRadius:20, padding:20, flexDirection:'row', backgroundColor: Colors.white}}>
            
            <View style={{height:120 ,justifyContent:'center'}}>
                <Image
                    source={{uri: postImage? postImage : postAuthorAvatar}}
                    style={{width:90, height:"80%", resizeMode:'cover', borderRadius:20}}
                />
            </View>
            <View style={{padding:10}}>
                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:20, color:Colors.orange2,}}>{formatted_postAuthor}</Text>
                <Text style={{fontFamily:'Baloo2-Regular', fontSize:12, color:Colors.orange2}}>{formatted_postDate}</Text>
                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:18, color:Colors.orange1,}}>{formatted_postTitle}</Text>
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
                    <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.grey1, marginHorizontal:2}}>{countOfLikes} likes</Text>
                    
                </View>
                
            </View>
        </View>
    )
}

export default Post;
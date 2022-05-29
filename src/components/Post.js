import React from "react";
import { View, Text, Image } from 'react-native';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



const Post = props => {
    const postAuthor = props.post.author;
    const formatted_postAuthor = postAuthor[0].toUpperCase() + postAuthor.substring(1,postAuthor.length)
    const postDate = props.post.Date;
    const postAuthorAvatar = props.post.authorAvatar;
    const postTitle = props.post.title;
    const countOfComments = props.post.comments.length;
    const formatted_postDate = new Date(postDate).toDateString();
    
    return(
        <View style={{width: 350, padding:30, margin:10, borderRadius:20, padding:20, flexDirection:'row', backgroundColor: Colors.white}}>
            <Image
                source={{uri: postAuthorAvatar}}
                style={{width:80, height:90, resizeMode:'cover'}}
            />
            <View style={{padding:10}}>
                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:20, color:Colors.orange2,}}>{formatted_postAuthor}</Text>
                <Text style={{fontFamily:'Baloo2-Regular', fontSize:12, color:Colors.orange2}}>{formatted_postDate}</Text>
                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:18, color:Colors.orange1,}}>{postTitle}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.grey1, marginRight:5}}>{countOfComments} Comments</Text>
                    <FontAwesome
                        name="comment"
                        color={Colors.grey1}
                    />
                </View>
                
            </View>
        </View>
    )
}

export default Post;
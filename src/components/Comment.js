import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Comment = props => {
    const commentAuthor = props.comment.commentAuthor;
    const comment = props.comment.comment; 
    const likesArray = props.comment.likes;
    const [likeStatus, setLikeStatus] = useState(false);
    const URL = 'https://whatshotapp.herokuapp.com/api/dis/likeComment';



    const likeComment = async() => {
        const jsonToken = await AsyncStorage.getItem('Token');  
        const deviceToken = jsonToken != null ? jsonToken : null;
        if(deviceToken) {
             try{
                const response = await fetch(URL + '/' + props.postId + '/' + props.comment._id, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({likerId: deviceToken})
                    
                });
        
                const data = await response.json();
                console.log(data); 
                if(data.status) {
                    setLikeStatus(true);
                }
             }
             catch(error) {
                 console.log(error);
             }
        }
               
    }

    
    const amIlikeThisComment = async() => {
        try{
            const jsonToken = await AsyncStorage.getItem('Token');
            const deviceToken = jsonToken != null ? jsonToken : null;
            if(deviceToken) {
                likesArray.forEach(like => { 
                    console.log(like.userId);               
                    if(like.userId == deviceToken) {
                        console.log(like.userId);
                        setLikeStatus(true);
                        return ;
                    }
                })
            }
        } catch(error) {
            console.log(error);
        }
        
        
    }

    amIlikeThisComment();

    return(
        <View>
            <View style={{width:150, margin:7, borderRadius: 20, backgroundColor: Colors.white}}>
                <View style={{width:'100%', paddingTop:5, paddingHorizontal:10}}>
                    <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.orange2}}>{commentAuthor}</Text>
                </View>

                <View style={{paddingHorizontal:10, marginBottom:5}}>
                    <Text style={{fontFamily:'Baloo2-Medium', fontSize:12, color:Colors.grey1}}>{comment}</Text>
                </View>
                <View style={{width:'100%', marginTop: -7, opacity: 0.6}}>
                    <Text style={{fontFamily:'Baloo2-Medium', fontSize:12, color:'#000', marginLeft:127}}>{props.comment.likes.length}</Text>
                </View>    
            </View>
            
            {
                !likeStatus?
                (
                    <TouchableOpacity onPress={likeComment} style={{padding:2, width:22, height:22, borderWidth:2, borderRadius:50, marginLeft:142, backgroundColor: '#595959', alignItems:'center', justifyContent: 'center', marginTop:-23}}>
                        <AntDesign
                            name='heart'
                            color={'#fc1100'}
                            size={10}
                        />
                    </TouchableOpacity>
                )
                :
                (
                    <View style={{padding:2, width:22, height:22, borderWidth:2, borderRadius:50, marginLeft:142, backgroundColor: Colors.white, alignItems:'center', justifyContent: 'center', marginTop:-23, opacity:0.8, borderColor: Colors.grey1}}>
                        <AntDesign
                            name='like1'
                            color={'#000'}
                            size={10}
                        />
                    </View>
                )
            }
            
        </View>
    )
}

export default Comment;
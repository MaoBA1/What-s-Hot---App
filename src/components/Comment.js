import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Comment = props => {
    const commentAuthor = props.comment.commentAuthor;
    const comment = props.comment.comment;
    return(
        <View style={{padding:7, width:150, margin:7, borderRadius: 20, backgroundColor: Colors.white}}>
            <View style={{width:'100%', paddingHorizontal:5}}>
                <Text style={{fontFamily:'Baloo2-SemiBold', fontSize:15, color:Colors.orange2}}>{commentAuthor}</Text>
            </View>

            <View>
                <Text style={{fontFamily:'Baloo2-Medium', fontSize:12, color:Colors.grey1}}>{comment}</Text>
            </View>

        </View>
    )
}

export default Comment;
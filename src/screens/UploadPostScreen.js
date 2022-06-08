import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

import Styles from '../../utilities/style';
import Colors from '../../utilities/color';
import { Button } from 'react-native-web';

const firebaseConfig = {
    apiKey: "AIzaSyC0RMV83SiAupO8fl8gISGWwUhRlNwGKnI",
    authDomain: "what-shotapp.firebaseapp.com",
    projectId: "what-shotapp",
    storageBucket: "what-shotapp.appspot.com",
    messagingSenderId: "742835961193",
    appId: "1:742835961193:web:1ebbb4f9898cfb343851f8"
  };

  if(firebase.apps.length == 0) {
    console.log('1');
    const app = firebase.initializeApp(firebaseConfig)
  }

const UploadPostScreen = props => {
    const URL = 'https://whatshotapp.herokuapp.com/api/dis/';
    const noImageFound = 'https://qph.fs.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq';
    const [localImageUrl, setLocalImageUrl] = useState('');
    const [copiedImageUrl, setCopiedImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState({uri:noImageFound, type:'noImage'})
    const [chosenImageType, setChosenImageType] = useState('local');  
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const user = props.route.params.user;
    
    
    
    const CheckImageUrl = url => {
       fetch(url)
       .then(result => {
           
         if(result.status == 200) {
             setSelectedImage({uri: url, type:'unlocal'})
         }
       })
       .catch(error => {
           console.log(error);
       })
    }

    const picImageFromMediaLibrary = async() => {
        try{
          const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if(granted){
              const Image = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              
            })
            if(!Image.cancelled) {
              setSelectedImage({uri: Image.uri, type: 'local'});
            }
          } else {
            Alert.alert('!', 'you have to permit access to media library to continue');
          }
        } catch (error) {
          console.log(error);
        }
      }

    const takePictuerFromCamera = async() => {
        try{
            const {granted} = await ImagePicker.requestCameraPermissionsAsync();
            if(granted) {
                const Image = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
               })
               if(!Image.cancelled) { 
                  setSelectedImage({uri: Image.uri, type: 'local'});
               }
            }  else {
                Alert.alert('!', 'you have to permit access to Camera to continue');
           }
        } catch(error) {
            console.log(error);
        }
        

    }
     
    const uploadPost = async() => {
        switch(selectedImage.type) {
            case 'noImage':
                try {
                    const response = await fetch(URL + 'uploadDisccusionSub', {
                        method: 'POST',
                        headers:{
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: postTitle,
                            content: postContent,
                            author: user,                      
                        })
                    })
    
                    const data = await response.json();
                    console.log(data);
                    if(data.status) {
                        Alert.alert('Post Upload Seccessfuly!');
                        props.navigation.goBack(null)
    
                    }
                } catch(error) {
                    console.log(error);
                }
                
                break;
            case 'local':
                handelUploadToFirebase();
                break;
            case 'unlocal':
                try {
                    const response = await fetch(URL + 'uploadDisccusionSub', {
                        method: 'POST',
                        headers:{
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: postTitle,
                            content: postContent,
                            author: user,  
                            postImage: selectedImage                    
                        })
                    })
    
                    const data = await response.json();
                    console.log(data);
                    if(data.status) {
                        Alert.alert('Post Upload Seccessfuly!');
                        props.navigation.goBack(null)
    
                    }
                } catch(error) {
                    console.log(error);
                }
                break;
            default:
                return;
        }
    }

    const uploadToFirebase = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        let ref = firebase.storage().ref().child("post/images/" + imageName)
        return ref.put(blob);
    }

    const handelUploadToFirebase = async () =>{
        uploadToFirebase(selectedImage.uri, localImageUrl)
        .then(async(result) => {
          Alert.alert('succsses!');
          result.type = 'image'
          console.log(result.downloadURL);
          try {
            const response = await fetch(URL + 'uploadDisccusionSub', {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postContent,
                    author: user,  
                    postImage: result.downloadURL                    
                })
            })

            const data = await response.json();
            console.log(data);
            if(data.status) {
                Alert.alert('Post Upload Seccessfuly!');
                props.navigation.goBack(null)

            }
        } catch(error) {
            console.log(error);
        }
          
          
        }).catch(error => {
          Alert.alert(error.message);
          console.log(error.message);
        })
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
                <View style={Styles.commentsUpTextContainer}>
                     <Text style={Styles.dashBoardUpText}>New Post</Text>                     
                </View>
                
                <View style={{width:'30%', alignItems:'center', justifyContent:'center'}}>
                   {
                       postContent.length < 10 || postTitle.length <10?
                       (
                          <View style={{ padding:10, borderWidth:2, borderColor: Colors.grey1, marginTop:30, borderRadius:20, backgroundColor: Colors.white, opacity:0.7, alignItems:'center', justifyContent:'center'}}>
                              <Text style={{fontFamily:'Baloo2-SemiBold', color: Colors.orange2}}>Upload Post</Text>
                          </View>
                       )
                       :
                       (
                          <TouchableOpacity onPress={uploadPost} style={{padding:10, borderWidth:2, borderColor: Colors.grey1, marginTop:30, borderRadius:20, backgroundColor: Colors.white}}>
                               <Text style={{fontFamily:'Baloo2-SemiBold', color: Colors.orange2}}>Upload Post</Text>
                          </TouchableOpacity>
                       )
                   }
                    
                </View>
            </View>
            
            <KeyboardAwareScrollView
               resetScrollToCoords={{ x: 0, y: 0 }}
               extraHeight={125}
               scrollEnabled={true}
               
            >
            <View style={{width:'100%', height:50, flexDirection:'row', justifyContent:'center'}}>
                {
                    chosenImageType == 'unlocal'?
                    (
                       <View  style={{width:'50%', backgroundColor: Colors.grey1, alignItems:'center', justifyContent:'center'}}>
                          <Text style={{fontFamily:'Baloo2-SemiBold'}}>Copy URL from Web</Text>
                       </View>
                    )
                    :
                    (
                       <TouchableOpacity onPress={() => setChosenImageType('unlocal')} style={{width:'50%', backgroundColor: Colors.grey1, alignItems:'center', justifyContent:'center', opacity: 0.5}}>
                          <Text style={{fontFamily:'Baloo2-SemiBold'}}>Copy URL from Web</Text>
                       </TouchableOpacity>
                    )
                }
                
                <View style={{backgroundColor:'#000', width:'0.2%', height:'100%'}}></View>
                
                {
                    chosenImageType == 'local'?
                    (
                       <View  style={{width:'50%', backgroundColor: Colors.grey1,alignItems:'center', justifyContent:'center'}}>
                          <Text style={{fontFamily:'Baloo2-SemiBold'}}>Pic/Take Picture</Text>
                       </View>
                    )
                    :
                    (
                        <TouchableOpacity onPress={() => setChosenImageType('local')} style={{width:'50%', backgroundColor: Colors.grey1,alignItems:'center', justifyContent:'center', opacity: 0.5}}>
                            <Text style={{fontFamily:'Baloo2-SemiBold'}}>Pic/Take Picture</Text>
                        </TouchableOpacity>
                    )
                }
                
                
            </View>
            <Image
                source={{uri:selectedImage.uri}}
                style={{width:'100%', height:200, resizeMode:'cover'}}
            />
            
            {
                chosenImageType == 'local'?
                (
                    <View style={{width:'100%', height:170, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                       <TouchableOpacity onPress={picImageFromMediaLibrary} style={{margin:10, borderWidth:2, padding:20, borderRadius:50, backgroundColor:Colors.white, borderColor:Colors.grey1}}>
                           <FontAwesome5
                              name='images'
                              size={30}
                              color={Colors.orange1}
                           />
                       </TouchableOpacity>
                       <TouchableOpacity onPress={takePictuerFromCamera} style={{margin:10, borderWidth:2, padding:20, borderRadius:50, backgroundColor:Colors.white, borderColor:Colors.grey1}}>
                           <FontAwesome5
                              name='camera'
                              size={30}
                              color={Colors.orange1}
                           />
                       </TouchableOpacity>
                    </View>
                )
                :
                (
                    <View style={{width:'100%', height:170, alignItems:'center', justifyContent:'center', flexDirection:'row', padding:20}}>
                        {
                            !copiedImageUrl.startsWith('https://')?
                            (
                                <View style={{padding:7, borderWidth:2, borderRadius:20, marginRight: 10, backgroundColor: Colors.white, borderColor: Colors.grey1, opacity:0.8}}>
                                    <Text style={{fontFamily: 'Baloo2-Medium', color:Colors.orange1}}>Check URL</Text>
                                </View>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => CheckImageUrl(copiedImageUrl)} style={{padding:7, borderWidth:2, borderRadius:20, marginRight: 10, backgroundColor: Colors.white, borderColor: Colors.grey1}}>
                                   <Text style={{fontFamily: 'Baloo2-Medium', color:Colors.orange1}}>Check URL</Text>
                                </TouchableOpacity>
                            )
                        }
                         <TextInput
                            style={{width:'80%', height:40, borderWidth:2, borderColor: Colors.grey1, backgroundColor: Colors.white, borderRadius:20, paddingHorizontal:15, fontFamily:'Baloo2-Medium'}}
                            placeholder='URL - example: https//image.jpeg....'
                            value={copiedImageUrl}
                            onChangeText={text => setCopiedImageUrl(text)}
                            
                         />
                    </View>
                )
            }            
            <View style={{backgroundColor:Colors.grey1, height:3, width:'100%'}}></View>
            <View style={{width:'100%'}}>
                
                <TextInput
                    style={{width:'100%', height:100, backgroundColor: Colors.orange1, paddingHorizontal:10, fontFamily:'Baloo2-SemiBold', paddingBottom:50, fontSize:20}}
                    placeholder="Post Title....."
                    multiline
                    value={postTitle}
                    onChangeText={text => setPostTitle(text)}

                />
                
                <View style={{backgroundColor:Colors.grey1, height:3, width:'100%'}}></View>
                <TextInput
                    style={{width:'100%', height:200, backgroundColor: Colors.orange3, paddingHorizontal:10, fontFamily:'Baloo2-Regular', paddingBottom:10, fontSize:18}}
                    placeholder="Post Content....."
                    multiline
                    value={postContent}
                    onChangeText={text => setPostContent(text)}

                />
                
            
            
            </View>            
        </KeyboardAwareScrollView>
       
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
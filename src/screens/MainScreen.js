import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';



const MainScreen = props => {
    return(
        <View>
            <Text>Home Page</Text>
        </View>
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
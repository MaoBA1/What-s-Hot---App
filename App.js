import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {NavigationContainer} from '@react-navigation/native';


import { AppStack } from './src/navigator';

const loadFontsFromAssets = async() => {
  return await Font.loadAsync({
    'Baloo2-Bold' : require('./assets/fonts/Baloo2-Bold.ttf'),
    'Baloo2-ExtraBold' : require('./assets/fonts/Baloo2-ExtraBold.ttf'),
    'Baloo2-Medium' : require('./assets/fonts/Baloo2-Medium.ttf'),
    'Baloo2-Regular' : require('./assets/fonts/Baloo2-Regular.ttf'),
    'Baloo2-SemiBold' : require('./assets/fonts/Baloo2-SemiBold.ttf'),
    'Baloo2-VariableFont_wght' : require('./assets/fonts/Baloo2-VariableFont_wght.ttf'),
  });
}

import AppReducer from './store/reducers';

const rootReducer = combineReducers({
  AllDisccusionsReducer: AppReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [isFontsLoading,setIsFontsLoading] = useState(false);
  if(!isFontsLoading){
    try{
      return(      
        <AppLoading 
          startAsync={loadFontsFromAssets}
          onFinish={() => setIsFontsLoading(true)}
          onError={console.log('Something is bad')} />
      )
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

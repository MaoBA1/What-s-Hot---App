import { createStackNavigator } from '@react-navigation/stack';

import MainScreen, { screenOptions as MainScreenOptions } from '../screens/MainScreen';


const appNavigationContainer = createStackNavigator();

export const AppStack = () => {
    return(
        <appNavigationContainer.Navigator>
            <appNavigationContainer.Screen
                name='Home'
                component={MainScreen}
                options={MainScreenOptions}
            />
        </appNavigationContainer.Navigator>
    )
}




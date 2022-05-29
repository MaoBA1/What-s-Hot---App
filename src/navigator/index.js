import { createStackNavigator } from '@react-navigation/stack';

import MainScreen, { screenOptions as MainScreenOptions } from '../screens/MainScreen';
import DasheBoardScreen, { screenOptions as DashBoardScreenOptions } from '../screens/DashBoardScreen';


const appNavigationContainer = createStackNavigator();

export const AppStack = () => {
    return(
        <appNavigationContainer.Navigator>
            <appNavigationContainer.Screen
                name='Home'
                component={MainScreen}
                options={MainScreenOptions}
            />

            <appNavigationContainer.Screen
                name='DashBoard'
                component={DasheBoardScreen}
                options={DashBoardScreenOptions}
            />
        </appNavigationContainer.Navigator>
    )
}




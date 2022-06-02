import { createStackNavigator } from '@react-navigation/stack';

import MainScreen, { screenOptions as MainScreenOptions } from '../screens/MainScreen';
import DasheBoardScreen, { screenOptions as DashBoardScreenOptions } from '../screens/DashBoardScreen';
import DisccusionScreen, { screenOptions as DisccusionScreenOptions } from '../screens/DisccusionScreen';
import CommentScreen, { screenOptions as CommentScreenOptions } from '../screens/CommentScreen';
import UploadPostScreen, { screenOptions as UploadPostScreenOptions } from '../screens/UploadPostScreen';


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

            <appNavigationContainer.Screen
                name='Discussion'
                component={DisccusionScreen}
                options={DisccusionScreenOptions}
            />

            <appNavigationContainer.Screen
                name='Comment'
                component={CommentScreen}
                options={CommentScreenOptions}
            />

            <appNavigationContainer.Screen
                name='Upload'
                component={UploadPostScreen}
                options={UploadPostScreenOptions}
            />
        </appNavigationContainer.Navigator>
    )
}




import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../Redux/store';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import BottomNavController from './BottomNavController';
import HeaderNavTile from '../Components/Navigation/HeaderNavTile';
import { darkGrey } from '../Constants/constants';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { NotificationListener } from '../Notification/NotificationListener';
import { ReginsterNotification } from '../Notification/NotificationHelper';

const StackController = () => {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();


  useEffect(() => {
    ReginsterNotification();
    NotificationListener();
    
  }, []);


  return (
      <NavigationContainer >

        <Stack.Navigator>

          <Stack.Screen
            name="authscreen"
            component={AuthScreen}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name='botnavcontroller'
            component={BottomNavController}
            options={{ headerTitle: (props) => <HeaderNavTile />, headerTintColor: darkGrey }}
          />

          <Stack.Screen
            name='profilescreen'
            component={ProfileScreen}
            options={{headerTitle:"Profile"}}
          />


        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default StackController;

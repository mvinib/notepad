import React, {useEffect, useState, useLayoutEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

import home from '../screens/home'
import register from '../screens/register'
import senhas from '../screens/senhas'
import passwordKey from '../screens/passwordKey'

function drawer() {
  
  return(
    <Drawer.Navigator initialRouteName="Home" drawerType='front' drawerContentOptions={{activeTintColor: '#CC1A70', inactiveTintColor:'white', activeBackgroundColor: '#121212'}} drawerStyle={{backgroundColor: '#121212', }}  >
    <Drawer.Screen name="Home" component={home}/>
    
    <Drawer.Screen name="Senhas" component={senhas} />
    
    
  </Drawer.Navigator>

  )
}

export default function routes() {
 
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home'}
          component={drawer}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={'Register'}
          component={register}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name={'PasswordKey'}
          component={passwordKey}
          options={{ headerShown: false }}
        />
     
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}


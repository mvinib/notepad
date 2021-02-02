import React, { useEffect, useState } from 'react'
import { ImageBackground, Modal, View } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication';
import { StatusBar } from 'expo-status-bar';

import stylesRegister from '../styles/register'


export default function register({ navigation }) {
    useEffect(() => {
        const options = {
            promptMessage: 'Autenticação por digital',
            

        }
        LocalAuthentication.authenticateAsync(options)
            .then(() => {
                navigation.navigate('Home')
            })
            .catch((error) => {
                

            })
    }, [])
    return (
        <View style={stylesRegister.container}>
            <StatusBar style="light" translucent={false} backgroundColor='#121212'/>

        </View>

    )
}

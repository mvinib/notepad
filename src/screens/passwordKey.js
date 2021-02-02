import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/senhas'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function passwordKey({ navigation }) {
    const [password, setPassword] = useState()
    const [key, setKey] = useState()
    const [message, setMessage] = useState()
    const [icon, setIcon] = useState('lock')
    const [passwordstate, setPasswordstate] = useState()

    useEffect(() => {
        AsyncStorage.getItem('@password').then((v) => setKey(v))
        AsyncStorage.getItem('@passwordstate').then((b) => b == 'true' || b == true ? setPasswordstate(b) : navigation.navigate('Home'))
    }, [])

     useEffect(() => {
        setMessage('')
     }, [password])

     
    function verification() {
        if (password == key) {
            setIcon('unlock-alt')
            setTimeout(() => {
                
                navigation.navigate('Home')
            }, 500);
            

        }
        else {
            setMessage('Senha Incorreta!')
        }

    }
    return (
        <View style={styles.containerModal}>
            <FontAwesome name={icon} size={24} color="white" />
            <View style={{marginVertical:15}}>
                <Text style={{ color: 'white' }}>{message}</Text>
            </View>
            <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={styles.input}>
            </TextInput>
            <View >
                <TouchableOpacity style={styles.buttonModal} onPress={() => verification()}>
                    <Text style={{ color: '#CC1A70' }}>
                        Entrar
                           </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

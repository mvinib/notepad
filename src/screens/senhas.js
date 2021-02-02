import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, TextInput, Switch } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons'
import styles from '../styles/senhas'
import stylesHome from '../styles/home'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';




export default function senhas({ navigation }) {
    const [fingerStatee, setfingerStatee] = useState()
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState()
    const [passwordState, setPasswordState] = useState()
    const [active, setActive] = useState()
    const [message, setMessage] = useState()
    

    useEffect(() => {

        buscarDados()
    }, [])

    async function buscarDados() {
        const check = await AsyncStorage.getItem('@check')
        setActive(check)

        const message = await AsyncStorage.getItem('@message')
        setMessage(message)

        const fingerState = await AsyncStorage.getItem('@finger')
        setfingerStatee(fingerState)

        const password = await AsyncStorage.getItem('@passwordstate')
        setPasswordState(password)




    }

    useFocusEffect(
        React.useCallback(() => {

            buscarDados()

        }, [fingerStatee])
    );

    async function savePassword() {
        const jsonValue = JSON.stringify(false)
        const trueJson = JSON.stringify(true)
        await AsyncStorage.setItem('@password', password)
        await AsyncStorage.setItem('@passwordstate', trueJson)
        await AsyncStorage.setItem('@finger', jsonValue)
        setfingerStatee(false)
        setPasswordState(true)



    }

    async function verificationdigital() {
        LocalAuthentication.hasHardwareAsync()
            .then((promise) => {
                LocalAuthentication.supportedAuthenticationTypesAsync()
                    .then((promise) => {
                        const type = promise
                        if (type == 1) {
                            LocalAuthentication.isEnrolledAsync()
                                .then((p) => {
                                    const boolean = p
                                    if (fingerStatee == 'false' || fingerStatee == undefined) {
                                        if (boolean == true) {
                                            const jsonValue = JSON.stringify(true)
                                            const falseJson = JSON.stringify(false)
                                            
                                            AsyncStorage.setItem('@finger', jsonValue)
                                            
                                            AsyncStorage.setItem('@passwordstate', falseJson)
                                            setfingerStatee(true)
                                            setPasswordState(false)






                                        } else {

                                            const jsonValue = JSON.stringify(false)
                                            const message = 'Seu dispositivo ainda não possui uma digital cadastrada!'
                                            AsyncStorage.setItem('@finger', jsonValue)
                                            AsyncStorage.setItem('@message', message)
                                            setfingerStatee(false)


                                        }
                                    } else {

                                        const jsonValue = JSON.stringify(false)
                                        AsyncStorage.setItem('@finger', jsonValue)
                                        setfingerStatee(false)





                                    }
                                })


                        } else {
                            const message = 'Seu dispositivo não possui autenticação por digital!'
                            const jsonValue = JSON.stringify(false)
                            AsyncStorage.setItem('@message', message)
                            AsyncStorage.setItem('@finger', jsonValue)
                            setfingerStatee(false)

                        }

                    })
            })




    }
    return (
        <View style={styles.container}>
            <Modal visible={visible} transparent={false} animationType={'fade'}>
                <View style={styles.containerModal}>
                    <TextInput onChangeText={(text) => setPassword(text)} style={styles.input}>
                    </TextInput>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity style={styles.buttonModal} onPress={() => { savePassword(), setVisible(false) }}>
                            <Text style={{ color: '#CC1A70' }}>
                                Salvar
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonModal} onPress={() => setVisible(false)}>
                            <Text style={{ color: '#40444b' }}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <StatusBar style="light" translucent={false} backgroundColor='#121212' />


            </Modal>
            <View style={stylesHome.header}>
                <Animatable.View animation='bounceInRight' useNativeDriverstyle={stylesHome.menu}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Entypo name='menu' color='white' size={30} ></Entypo>
                    </TouchableOpacity>

                </Animatable.View>
                <Animatable.View animation='bounceInLeft' useNativeDriver style={stylesHome.title}>
                    <Text style={stylesHome.headertext}>
                        Senhas
                    </Text>
                </Animatable.View>


            </View>
            <View style={styles.body}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>
                        Escolha um modo de senha para garantir a segunrança das suas anotações.
                    </Text>
                    <Text style={styles.modo}>
                        Modos:
                    </Text>
                </View>
                <Text style={{color: 'white'}}>{message}</Text>
                <View >
                    <View style={{ flexDirection: 'row' }}>
                        <Switch
                            trackColor={{ true: '#626364', false: '#EFBAD4' }}
                            thumbColor={fingerStatee == 'true' ? '#CC1A70' : '#40444b'}
                            value={fingerStatee == 'false'}
                            disabled={true}

                        ></Switch>
                        <TouchableOpacity style={styles.button} onPress={() => verificationdigital()}>
                            <Ionicons name="md-finger-print" size={24} color="white" />
                            <Text style={styles.textButton}>Digital</Text>
                        </TouchableOpacity >
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Switch
                            trackColor={{ true: '#626364', false: '#EFBAD4' }}
                            thumbColor={passwordState == 'true' ? '#CC1A70' : '#40444b'}
                            value={passwordState == 'false' || passwordState == false}
                            disabled={true}

                        ></Switch>
                        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>

                            <FontAwesome name="lock" size={24} color="white" />

                            <Text style={styles.textButton}>Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor='#121212' />

        </View>
    )
}

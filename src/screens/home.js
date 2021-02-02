import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, Alert, TouchableNativeFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable';
import stylesHome from '../styles/home'
import { Entypo, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import firebase from '../services/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function home({ navigation }) {
    const [nota, setNota] = useState()
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [data, setData] = useState()
    const [valuemodal, setValuemodal] = useState('')
    const [newnote, setNewnote] = useState()



    useEffect(() => {
        async function ver() {
            AsyncStorage.getItem('@finger').then((v) =>{
                
                if (v == 'true') {
                    console.log(' this is v of home '  + v)
                    navigation.navigate('Register')
                    
                }else{
                    AsyncStorage.getItem('@password').then((p)=>{
                        if(p){
                            navigation.navigate('PasswordKey')
                        }
                    })
                    return recuperar()
                }
            })
        }
        ver()
        recuperar()
        


    }, [])



    async function recuperar() {
        await firebase.collection('notas').get()
            .then((dat) => {
                const list = []
                dat.forEach(doc => {
                    list.push({ note: doc.data().note, id: doc.id })


                })
                setData(list)

            })
    }
    async function update() {
        if (newnote)
            return await firebase.collection('notas').doc(valuemodal.id).update({ note: newnote }).then(
                setVisible2(false),
                recuperar()
            )
        setVisible2(false)



    }


    async function deletar(item) {
        const { id } = item.item
        let deleteDoc = await firebase.collection('notas').doc(id).delete();
        recuperar()


    }

    async function add() {
        if (nota)
            return await firebase.collection('notas').add({
                note: nota
            }).then(
                setVisible(false),
                setVisible2(false),
                setNota(''),
                recuperar()
            )

        setVisible(false)

    }
    return (
        <View style={stylesHome.container}>
            <View style={stylesHome.header}>
                <Animatable.View animation='bounceInRight' useNativeDriverstyle={stylesHome.menu}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Entypo name='menu' color='white' size={30} ></Entypo>
                    </TouchableOpacity>

                </Animatable.View>
                <Animatable.View animation='bounceInLeft' useNativeDriver style={stylesHome.title}>
                    <Text style={stylesHome.headertext}>
                        Notas
                    </Text>
                </Animatable.View>


            </View>
            <View style={stylesHome.body}>
                <FlatList
                    marginHorizontal={10}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    /* keyExtractor={(item) => item.key} */

                    renderItem={(item) => {
                        const { note, id } = item.item
                        return (
                            <Animatable.View animation='bounceInUp' useNativeDriver style={stylesHome.containerFlatlist}>
                                <TouchableOpacity onPress={() => deletar(item)}>
                                    <MaterialCommunityIcons name="delete-outline" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableNativeFeedback onPress={() => { setValuemodal({ note: note, id: id }), setVisible2(true) }}>
                                    <Text style={stylesHome.textnote}>{note}</Text>
                                </TouchableNativeFeedback>
                            </Animatable.View>
                        )
                    }}

                />

                <Modal visible={visible} animationType='fade'>
                    <View style={stylesHome.modal}>
                        <TextInput placeholder='Insira sua nota' placeholderTextColor='rgba(125, 125, 125, 0.4)' style={stylesHome.inputModal} onChangeText={(text) => setNota(text)} multiline={true}>

                        </TextInput>
                        <View style={stylesHome.containerButtonModal}>
                            <TouchableOpacity style={stylesHome.buttonModal} onPress={() => add()}>
                                <AntDesign name="checkcircle" size={44} color="#CC1A70" />
                            </TouchableOpacity>
                            <TouchableOpacity style={stylesHome.buttonModal} onPress={() => setVisible(false)}>
                                <MaterialIcons name="cancel" size={50} color="#40444b" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <StatusBar style="light" translucent={false} backgroundColor='#121212' />
                </Modal>
                <Modal visible={visible2} animationType='fade'>
                    <View style={stylesHome.modal}>
                        <TextInput placeholder='Insira sua nota' defaultValue={valuemodal.note} placeholderTextColor='rgba(125, 125, 125, 0.4)' style={stylesHome.inputModal} onChangeText={(text) => setNewnote(text)} multiline={true}>

                        </TextInput>
                        <View style={stylesHome.containerButtonModal}>
                            <TouchableOpacity style={stylesHome.buttonModal} onPress={() => update()}>
                                <AntDesign name="checkcircle" size={44} color="#CC1A70" />
                            </TouchableOpacity>
                            <TouchableOpacity style={stylesHome.buttonModal} onPress={() => setVisible2(false)}>
                                <MaterialIcons name="cancel" size={50} color="#40444b" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <StatusBar style="light" translucent={false} backgroundColor='#121212' />
                </Modal>
                <Animatable.View animation='fadeIn' useNativeDriver style={stylesHome.formButton}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Entypo name="plus" size={40} color="white" />
                    </TouchableOpacity>
                </Animatable.View>

            </View>
            <StatusBar style="light" translucent={false} backgroundColor='#121212' />


        </View>
    )
}

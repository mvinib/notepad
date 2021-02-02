import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        


    },
    textButton: {
        color: 'white',

    },
    button: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20,
        flexDirection: 'row',
    },
    title: {
        color: 'white'
    },
    modo: {
        color: 'white',
        marginVertical: '30%', 
        alignSelf: 'flex-start'
    },
    containerTitle: {
        height: '30%',
        width: '80%',
        alignItems: 'center',
        

    },
    body:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons:{
        
    },
    containerModal:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        flex: 1
    },
    input:{
        
        height: 30,
        width: '70%',
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white',
        textAlign: 'center'
        
    },
    buttonModal:{
        paddingHorizontal: '10%',
        marginTop: 30,
        
        
    },
    containerModalQuestion:{
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default styles
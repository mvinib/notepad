import { StyleSheet } from 'react-native'
const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',

    },
    header: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    menu: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        width: '80%',
        justifyContent: 'center',
        paddingRight: 20,
        alignItems: 'center',



    },
    headertext: {
        color: 'white',
        fontSize: 20,

    }, body: {
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center'
    },
    formButton: {
        width: '16%',
        height: '8%',
        backgroundColor: '#CC1A70',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'absolute',
        bottom: '8%',
        elevation: 23,




    },
    modal: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',


    },
    inputModal: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        padding: 9,
        height: '75%',
        width: '90%',
        textAlignVertical: 'top',
        borderRadius: 5,
        color: 'white',

    },
    buttonModal: {

        marginHorizontal: 50,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 10
    },
    containerButtonModal: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '5%'


    }, containerFlatlist: {
        width: '92%',
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 7,
        elevation: 1.5,
        flexDirection:'row'
        
    },
    textnote:{
        color:"#fff",
        fontSize:15,
        paddingLeft:'5%',
        paddingRight: '10%',
    }
});

export default stylesHome

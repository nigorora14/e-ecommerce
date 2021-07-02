import { StyleSheet} from 'react-native'

const layoutStyle = StyleSheet.create({
    
    containerLogin:{
        flex: 1,
        justifyContent: "center", 
        padding: 20,
        marginTop:"40%"
    },
    containerRegister:{
        flex: 1,
        justifyContent: "center", 
        padding: 20,
        marginTop:"20%"
    },
    logo: {
        width: "100%",
        height: 50,
        resizeMode: "contain",
        marginBottom: 20
       }
})

export default layoutStyle
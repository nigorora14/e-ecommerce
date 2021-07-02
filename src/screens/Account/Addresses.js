import React, { useCallback, useState } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native"
import { IconButton } from "react-native-paper"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { getAddressesApi } from "../../api/address"
import useAuth from "../../hooks/useAuth"
import {size} from 'lodash'
import AddressList from "../../components/Address/AddressList"
import ScreenLoading from "../../components/ScreenLoading"

export default function Addresses() {
    const [addresses, setAddresses] = useState(null)
    const [reloadAddress, setReloadAddress] = useState(false)
    const { auth } = useAuth() 
    const navigation= useNavigation()       
    
    useFocusEffect(
        useCallback(() => {
          (async () => {
            setAddresses(null)
            const response = await getAddressesApi(auth);
            setAddresses(response)
            setReloadAddress(false)
          })();
        }, [reloadAddress])
      );

    return (
       <ScrollView style={styles.container}>
           <Text style= {styles.title}>Mis Direcciones</Text>
           {/* modificar con dos formularios parecidos */}
           <TouchableWithoutFeedback onPress={() => navigation.navigate("add-address")}> 
               <View style={styles.addAddress}>
                    <Text style= {styles.addAddressText}>Añadir una dirección</Text>
                    <IconButton 
                        icon="arrow-right" 
                        color="#000" 
                        size={25}/>
               </View>
           </TouchableWithoutFeedback>
           {
            !addresses ? 
            (// <ActivityIndicator size="large" style={styles.loading} />
                <ScreenLoading size="large" text="Cargando direcciones..."/>
            ) : 
            size(addresses) === 0 ?
            (
                <Text style={styles.noAddressText}>Crea tu primera direccion</Text>
            ) : (
                <AddressList addresses={addresses} setReloadAddress={setReloadAddress}/>
            )
           }
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    }, 
    title:{
        fontSize: 20
    },
    addAddress:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#0D47A1",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#E3F2FD"
    }, 
    addAddressText: {
        fontSize: 16
    },
    noAddressText:{
        fontSize: 16,
        marginTop: 10,
        textAlign: "center"
    }
})


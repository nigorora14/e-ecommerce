import React,{useState} from 'react'
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import {Button} from 'react-native-paper'
import {map} from 'lodash'
import colors from '../../styles/colors'
import { deleteAddressApi } from '../../api/address'
import useAuth from '../../hooks/useAuth'
import {useNavigation} from '@react-navigation/native'

export default function AddressList(props) {
    const {addresses, setReloadAddress} = props
    const {auth} = useAuth()
    const navigation= useNavigation()
    const deleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminando Direccion",
            `¿Estas seguro de eliminar la direccion ${address.title}?`,
            [
                {
                    text: "NO"
                },
                {
                    text: "SI",
                    onPress: () => deleteAddress(address._id)
                }
            ],
            {
                cancelable: false
            }
        )
    }
    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressApi(auth, idAddress)
            setReloadAddress(true)
        } catch (error) {
            console.log(error)
            return null
        }
    }
const goToUpdateAddress = (idAddress) => {
    navigation.navigate("edit-address", {idAddress})
}
    return (
        <>
        <View style= {styles.container}>
            {//va devolver una lista el map
                map(addresses, (address) => (
                    <View key={address._id} style={styles.address}>
                        <Text style={styles.title}>{address.title}</Text>
                        <Text>{address.name_lastname}</Text>
                        <Text>{address.address}</Text>
                        <View style={styles.blockLine}>
                            <Text>{address.country}, </Text>
                            <Text>{address.state}, </Text>
                            <Text>{address.city}, </Text>
                            <Text>{address.postal_code}</Text>
                        </View>
                        <Text>Numero de Telefono: {address.phone}</Text>
                        <Text>Referencia: {address.referencia}</Text>
                        <View style={styles.actions}>
                            <Button 
                                mode="contained" 
                                color={colors.amarillo}
                                onPress= {()=> goToUpdateAddress(address._id)}
                                icon="home-edit-outline"
                            >Editar
                            </Button>
                            <Button 
                                mode="contained" 
                                color={colors.rojo}
                                onPress= {()=> deleteAddressAlert(address)}
                                icon="map-marker-remove"
                            >Eliminar</Button>
                        </View>
                    </View>
                ))
            }
            
        </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    address : {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#0D47A1",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom:15,
        backgroundColor: "#E3F2FD"
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    blockLine: {
        flexDirection: "row"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    loading:{
        marginTop: 20
    }
})

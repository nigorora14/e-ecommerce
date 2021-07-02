import React,{useCallback, useState} from 'react'
import { StyleSheet, Text, View,ToastAndroid } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import useAuth from '../../hooks/useAuth'	   
import { getMeApi, updateUserApi } from '../../api/user'									 								 
import {formStyle} from '../../styles'

export default function ChangeEmail() {
    const {auth} = useAuth()
    const [loading, setLoading] = useState(false)
	const navigation=useNavigation()

    //para mostrar el dato en el TextInput
    useFocusEffect(
        useCallback(()=> {(
            async () => {
                const response = await getMeApi(auth.token)
                await formik.setFieldValue("email", response.email)                
            })()
			}, [])
    )

    //para enviar datos
    const formik = useFormik({
        initialValues: initialValues(),//inicia
        validationSchema: Yup.object(validationSchema()),//valida un correo valido
        onSubmit: async (formData)=> { //envia los datos al backend
            setLoading(true)
            try {
                const response = await updateUserApi(auth,formData)
                if (response.statusCode) {
                    throw "Error 400"
                }
                navigation.goBack() //para retroceder despues de actualizar.
            } catch (error) {
            {   
                Platform.OS==="ios" ? 
                (Toast.show("El email ya se encuentra registrado por otro usuario.", {
                    position: Toast.positions.CENTER
                })) : 
                (ToastAndroid.showWithGravityAndOffset("El email ya se encuentra registrado por otro usuario.",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  ))    
            }
             formik.setFieldError("email",true)
             
            }      
            setLoading(false)
        }
    })

    return (
        <View style= {styles.container}>
            <TextInput
                label="Email"
                style={formStyle.input}
                onChangeText= {(text) => formik.setFieldValue("email", text)}
                value = {formik.values.email}
                error = {formik.errors.email}
            />
            <Button
                mode="contained"
                style={formStyle.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Actualizar Email
            </Button>
        </View>
    )
}

function initialValues() {
    return {
    email: ""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true)
    }
}

const styles = StyleSheet.create({
    container:{
        padding:20
        // paddingVertical:"10%"
    }
})

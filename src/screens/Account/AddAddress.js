import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput, Button, HelperText} from 'react-native-paper'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {formStyle} from '../../styles'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { addAddressApi} from '../../api/address'
import { useNavigation } from '@react-navigation/native'

export default function AddAddress() {
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                await addAddressApi(auth, formData)
                navigation.goBack()
           } catch (error) {
            console.log(error)   
            setLoading(false)
           }
        }
    })

    const titleSmsError = () => {
        return !formik.values.title
    };
    const name_lastnameSmsError = () => {
        return !formik.values.name_lastname
    };
    const addressSmsError = () => {
        return !formik.values.address
    };
    const postal_codeSmsError = () => {
        return !formik.values.postal_code
    };
    const citySmsError = () => {
        return !formik.values.city
    };
    const stateSmsError = () => {
        return !formik.values.state
    };
    const countrySmsError = () => {
        return !formik.values.country
    };
    const phoneSmsError = () => {
        return !formik.values.phone
    };
    const referenciaSmsError = () => {
        return !formik.values.referencia
    };

    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
                    <Text style={styles.title}>Datos de la Direccion</Text>
                    <View>
                        <TextInput 
                            mode ='outlined' 
                            label="Titulo" 
                            onChangeText={(text) => formik.setFieldValue("title", text)} 
                            value={formik.values.title} 
                            error = {formik.errors.title}/>
                        {titleSmsError() && <HelperText type="error" visible={true} >Agregar un nombre a la direccion</HelperText>}
                    </View>
                    <View>
                        <TextInput mode ='outlined' label="Nombre y apellido" onChangeText={(text) => formik.setFieldValue("name_lastname", text)} value={formik.values.name_lastname} error = {formik.errors.name_lastname}/>
                        {name_lastnameSmsError() && <HelperText type="error" visible={true} >Agregar una nombre y apellido</HelperText>}
                    </View>
                    <View>
                        <TextInput mode ='outlined' label="Direccion" onChangeText={(text) => formik.setFieldValue("address", text)} value={formik.values.address} error = {formik.errors.address}/>
                        {addressSmsError() && <HelperText type="error" visible={true} >Agregar una direccion</HelperText>}
                    </View>
                    <View>
                        <TextInput mode ='outlined' label="Codigo Postal" onChangeText={(text) => formik.setFieldValue("postal_code", text)} value={formik.values.postal_code} error = {formik.errors.postal_code}/>
                        {postal_codeSmsError() && <HelperText type="error" visible={true} >Agregar una codigo postal</HelperText>}
                    </View>
                    <View>
                        <TextInput mode ='outlined' label="Poblacion" onChangeText={(text) => formik.setFieldValue("city", text)} value={formik.values.city} error = {formik.errors.city}/>
                        {citySmsError() && <HelperText type="error" visible={true} >Agregar una poblacion</HelperText>}
                    </View>
                    <View>
                        <TextInput mode ='outlined' label="Estado" onChangeText={(text) => formik.setFieldValue("state", text)} value={formik.values.state} error = {formik.errors.state}/>
                        {stateSmsError() && <HelperText type="error" visible={true} >Agregar un estado</HelperText>}
                    </View>
                    <View>
                        <TextInput mode ='outlined' label="Pais" onChangeText={(text) => formik.setFieldValue("country", text)} value={formik.values.country} error = {formik.errors.country}/>
                        {countrySmsError() && <HelperText type="error" visible={true} >Agregar un Pais</HelperText>}
                    </View>
                    <View> 
                        <TextInput mode ='outlined' label="Telefono" onChangeText={(text) => formik.setFieldValue("phone", text)} value={formik.values.phone} error = {formik.errors.phone}/>
                        {phoneSmsError() && <HelperText type="error" visible={true} >Agregar un telefono</HelperText>}
                    </View>
                    <View style={formStyle.input}>
                        <TextInput mode ='outlined' label="Referencia" onChangeText={(text) => formik.setFieldValue("referencia", text)} value={formik.values.referencia} error = {formik.errors.referencia} multiline maxLength={200}/>
                        {referenciaSmsError() && <HelperText type="error" visible={true} >Agregar una referencia</HelperText>}
                    </View>
                    
                    <Button 
                        mode="contained" 
                        style={[formStyle.btnSucces, styles.btnSucces]} 
                        onPress={formik.handleSubmit} 
                        loading={loading}
                        icon= "map-marker-plus-outline"
                    >Crear Dirección
                    </Button>  
            </View>
        </KeyboardAwareScrollView>
        )        
}
function initialValues() {
    return {
    title:"",
    name_lastname:"",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country:"",
    phone:"",
    referencia:""
    }
}
function validationSchema() {
    return {
    title: Yup.string().required(),
    name_lastname: Yup.string().required(),
    address: Yup.string().required(),
    postal_code: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country:Yup.string().required(),
    phone:Yup.string().required(),
    referencia: Yup.string().required(),
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        paddingVertical: 20
    },
    btnSucces: {
        marginBottom: 20
    }
})

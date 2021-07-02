import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {formStyle} from '../../styles'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { getAddressApi, updateAddressApi } from '../../api/address'
import { useNavigation } from '@react-navigation/native'
import ScreenLoading from '../../components/ScreenLoading'

export default function EditAddress(props) {
    const {
        route: {params}
    } = props
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    const navigation = useNavigation()
    const [newAddress, setNewAddress] = useState(true)
    const [cargando, setCargando] = useState(null)

    useEffect(() => {
        (async () => {
            if (params?.idAddress) { // la  ? pregunta si existe idAddress
                setNewAddress(false)
                navigation.setOptions({title: "Actualizar Direccion"})
                const response = await getAddressApi(auth, params.idAddress)
                setCargando(response)
                await formik.setFieldValue("_id",response._id)
                await formik.setFieldValue("title",response.title)
                await formik.setFieldValue("name_lastname",response.name_lastname)
                await formik.setFieldValue("address",response.address)
                await formik.setFieldValue("postal_code",response.postal_code)
                await formik.setFieldValue("city",response.city)
                await formik.setFieldValue("state",response.state)
                await formik.setFieldValue("country",response.country)
                await formik.setFieldValue("phone",response.phone)
                await formik.setFieldValue("referencia",response.referencia)
            }
        })()
    }, [params])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
           try {
              if(!newAddress){
                await updateAddressApi(auth, formData)
              }  
              navigation.goBack()
           } catch (error) {
            console.log(error)   
            setLoading(false)
           }
        }
    })
    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
            {
            !cargando ? 
            (
                <ScreenLoading size="large" text="Cargando datos de la direccion..."/>
            ) : (
               <>

                    <Text style={styles.title}>Datos de la Direccion</Text>
                    <TextInput label="Titulo" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("title", text)} value={formik.values.title} error = {formik.errors.title}/>
                    <TextInput label="Nombre y apellido" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("name_lastname", text)} value={formik.values.name_lastname} error = {formik.errors.name_lastname}/>
                    <TextInput label="Direccion" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("address", text)} value={formik.values.address} error = {formik.errors.address}/>
                    <TextInput label="Codigo Postal" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("postal_code", text)} value={formik.values.postal_code} error = {formik.errors.postal_code}/>
                    <TextInput label="Poblacion" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("city", text)} value={formik.values.city} error = {formik.errors.city}/>
                    <TextInput label="Estado" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("state", text)} value={formik.values.state} error = {formik.errors.state}/>
                    <TextInput label="Pais" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("country", text)} value={formik.values.country} error = {formik.errors.country}/>
                    <TextInput label="Telefono" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("phone", text)} value={formik.values.phone} error = {formik.errors.phone}/>
                    <TextInput label="Referencia" style={formStyle.input} onChangeText={(text) => formik.setFieldValue("referencia", text)} value={formik.values.referencia} error = {formik.errors.referencia} multiline maxLength={200} />
                    <Button 
                        mode="contained" 
                        style={[formStyle.btnSucces, styles.btnSucces]} 
                        onPress={formik.handleSubmit} 
                        loading={loading}
                        icon= "home-edit-outline"
                    >Actualizar Direccion
                    </Button>  
               </>
            )
           }

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

import React,{useState} from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'

export default function Quantity(props) {
    const {quantity, setQuantity} = props

    const formik = useFormik ({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit: async (formData) => {
        try {
            console.log("formData",formData)

        } catch (error) {
        {   
            Platform.OS==="ios" ? 
            (Toast.show("Ingresar solo numeros", {
                position: Toast.positions.CENTER
            })) : 
            (ToastAndroid.showWithGravityAndOffset(
                "Ingresar solo numeros",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ))    
            }
        }
        
   }
      
  })
  const cantidadSmsError = () => {
    return !formik.values.cantidad
};
    return (
    
      <View width="35%">
        <TextInput label="Cantidad" 
                   style= { !cantidadSmsError() ? {marginBottom:22} : ""} 
                   onChangeText= {(text) => formik.setFieldValue("cantidad", text)}
                   value= {formik.values.cantidad}
                   error={formik.errors.cantidad}
                   right={<TextInput.Icon icon="emoticon-kiss-outline"/>}
                   mode="outlined"
                   keyboardType="numeric"
                   maxLength={3}
                   defaultValue={"quantityX"}
                   onChange={(item) => setQuantity(item)}
        />
        {cantidadSmsError() && <HelperText type="error" visible={true} >Agregar una cantidad</HelperText>}
      </View>
    )
}
function initialValues() {
  return {
      cantidad: "",
  }
}
function validationSchema() {
  return {
      cantidad: Yup.string().required(true)
  }
}
const styles = StyleSheet.create({

  })

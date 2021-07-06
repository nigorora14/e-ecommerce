import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from "react-native-root-toast";

export default function Buy(props) {
    const {product} =props
    // const addProductCart = () => {
    //     console.log(product.title)
    // }
    const cantidadSmsError = () => {
        return !formik.values.cantidad
    };
    const formik = useFormik ({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
          try {
            console.log(formData.cantidad)
            console.log(product.title)
            
          } catch (error) {{   
            Platform.OS==="ios" ? 
            (Toast.show("Error: ingresar solo numeros.", {
                position: Toast.positions.CENTER
            })) : 
            (ToastAndroid.showWithGravityAndOffset("Error: ingresar solo numeros.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ))    
        }
          }
        },
        
    })
    return (
        <View style={{zIndex:1}}>
            {/* aqui poner el text */}
            <View width={"40%"} paddingVertical={10}>
            <TextInput 
                   label="Cantidad" 
                   style= { !cantidadSmsError() ? {marginBottom:1} : ""} 
                   onChangeText= {(text) => formik.setFieldValue("cantidad", text)}
                   value= {formik.values.cantidad}
                   error={formik.errors.cantidad}
                   right={<TextInput.Icon icon="emoticon-kiss-outline"/>}
                   mode="outlined"
                   keyboardType="numeric"
                   maxLength={3}
            />{cantidadSmsError() && <HelperText type="error" visible={true} >Agregar una cantidad</HelperText>}
            </View>
                <Button
                    mode="contained"
                    contentStyle={styles.btnBuyContent}
                    labelStyle={styles.btnLabel}
                    style={styles.btn}
                    onPress={formik.handleSubmit}
                    // onPress={addProductCart}
                >Añadir al carrito
                </Button>
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
    
    btnBuyContent:{
        backgroundColor: "#008fe9",
        paddingVertical: 5
    },
    btnLabel:{
        fontSize: 18
    },
    btn:{
        marginTop: 20
    }
})


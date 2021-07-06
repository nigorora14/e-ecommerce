import React,{useState} from 'react'
import { View, Text, ScrollView } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'

import {registerApi} from '../../api/user'
import { formStyle } from '../../styles'

export default function RegisterForm(props) {
    const {changeForm} = props
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik ({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                await registerApi(formData)
                changeForm()
            } catch (error) {
                setLoading(false)
                Toast.show("Error al registrar el usuario." , {
                    position: Toast.positions.CENTER,
                })
            }
        }
    })

    return (
        <View>
            <TextInput 
                label="Email" 
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)} 
                value= {formik.values.email}
                error= {formik.errors.email}   
                mode="outlined"
                right={<TextInput.Icon icon="at"/>}
            />
            <TextInput 
                label="Usuario"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value= {formik.values.username}
                error= {formik.errors.username} 
                mode="outlined"
                right={<TextInput.Icon icon="account-circle" />}
            />
            <TextInput 
                label="Contraseña" 
                style={formStyle.input} 
                secureTextEntry={!showPassword}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value= {formik.values.password}
                error= {formik.errors.password} 
                right={
                    <TextInput.Icon 
                    icon={ showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                    />}
                mode="outlined"
            />
            <TextInput 
                label="Confirmar Contraseña" 
                style={formStyle.input} 
                secureTextEntry={!showPassword}
                onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
                value= {formik.values.confirmPassword}
                error= {formik.errors.confirmPassword} 
                right={
                    <TextInput.Icon 
                    icon={ showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                    />}
                mode="outlined"
            />
            <Button 
                mode="contained" 
                style={formStyle.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
                icon="account-multiple-plus-outline"
            >Registrarse</Button>
            <Button 
                mode="text" 
                style={formStyle.btnText} 
                labelStyle={formStyle.btnTextLabel} 
                onPress={changeForm} 
                icon="login-variant"               
            >Iniciar sesión</Button>
        </View>
    )
}

function initialValues() {
    return {
        email:"",
        username: "",
        password: "",
        confirmPassword: ""
    }    
}
function validationSchema() {
    return {
        email:Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        confirmPassword: Yup.string()
                            .required(true)
                            .oneOf([Yup.ref("password")],true),
    }
}
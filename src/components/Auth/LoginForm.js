import React, {useState} from 'react'
import { Alert, ToastAndroid, View} from 'react-native'
import {TextInput, Button, Menu, Item} from 'react-native-paper'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'

import useAuth from '../../hooks/useAuth'
import {loginApi} from '../../api/user'
import {formStyle} from '../../styles'

export default function LoginForm(props) {
const {changeForm} = props
const [loading, setLoading] = useState(false)
const {login} = useAuth()
const [showPassword, setShowPassword] = useState(false)

const formik = useFormik ({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    
    onSubmit: async (formData) => {
        
        try {
            setLoading(true)
            const response= await loginApi(formData)
            if (response.statusCode) {
                throw "Error 400"
            }
            login(response)
        } catch (error) {
            //Alert.alert("Error","El usuario y/o contraseña no son validos")
        {   
            Platform.OS==="ios" ? 
            (Toast.show("El usuario y/o contraseña no son validos", {
                position: Toast.positions.CENTER
            })) : 
            (ToastAndroid.showWithGravityAndOffset(
                "El usuario y/o contraseña no son validos",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ))    
            }
            setLoading(false)
        }
        
   }
})

const referenciaSmsError = () => {
    return !formik.values.referencia
};

    return (
        <View>
            <TextInput label="Email o Usuario" 
                       style= {formStyle.input} 
                       onChangeText= {(text) => formik.setFieldValue("identifier", text)}
                       value= {formik.values.identifier}
                       error={formik.errors.identifier}
                       right={<TextInput.Icon icon="account-circle"/>}
                       mode="outlined"
            />
            <TextInput label="Contraseña" 
                       style={formStyle.input} 
                       secureTextEntry={!showPassword}
                       onChangeText= {(text) => formik.setFieldValue("password", text)}
                       value= {formik.values.password}
                       error={formik.errors.password}
                       right={
                            <TextInput.Icon 
                            icon={ showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}
                            />}
                       mode="outlined"
            />
           <Button mode="contained" 
                    style={formStyle.btnSucces}
                    onPress={formik.handleSubmit}
                    loading={loading}
                    icon="login-variant"
            >Entrar
            </Button>
            <Button mode="text" 
                    style={formStyle.btnText} 
                    labelStyle={formStyle.btnTextLabel}
                    onPress= {changeForm}
                    icon="account-multiple-plus-outline"
            >Registrarse
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        identifier: "",
        password: "",
    }
}
function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    }
}


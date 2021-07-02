import React, {useState} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import logo from '../../assets/logo.png'
import { layoutStyle } from '../styles'

export default function Auth() {

    const [showLogin, setShowLogin] = useState(true)
    const changeForm = () => {
        setShowLogin(!showLogin)
    }
    return (
        <>
        {
        showLogin ?  
        <View style={layoutStyle.containerLogin}>
            <Image style={layoutStyle.logo} source={logo}/> 
            <KeyboardAwareScrollView scrollEnabled
                // behavior={Platform.OS==="ios" ? "padding" : "height"}
            > 
            <LoginForm changeForm={changeForm}/>
            </KeyboardAwareScrollView>
        </View>
         : 
        <View style={layoutStyle.containerRegister}>
            <Image style={layoutStyle.logo} source={logo}/> 
            <KeyboardAwareScrollView scrollEnabled> 
            <RegisterForm changeForm={changeForm}/>
            </KeyboardAwareScrollView>
        </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    
  })
  
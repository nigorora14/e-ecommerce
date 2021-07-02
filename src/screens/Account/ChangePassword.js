import React, { useState } from "react";
import { StyleSheet, View,ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { updateUserApi } from "../../api/user";
import { formStyle } from "../../styles";
import StatusBar from "../../components/StatusBar";									 
import colors from "../../styles/colors";

export default function ChangePassword() {
  const { auth,logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData)
        if (response.statusCode) {
            throw "Error 400"
        }
        navigation.goBack();
        //logout()
      } catch (error) {
          {   
            Platform.OS==="ios" ? 
            (Toast.show("Error al actualizar contraseño.", {
                position: Toast.positions.CENTER
            })) : 
            (ToastAndroid.showWithGravityAndOffset("Error al actualizar la contraseña.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            ))    
        }
        formik.setFieldError("username",true)
        setLoading(false);
      }      
    },
  });

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          label="Password"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
          secureTextEntry
        />
        <TextInput
          label="Confirmar Password"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("confirmar", text)}
          value={formik.values.confirmar}
          error={formik.errors.confirmar}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar Contraseña
        </Button>
      </View>
    </>
  );
}

function initialValues() {
  return {
    password: "",
    confirmar:""
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(6,true).required(true),
    confirmar: Yup.string().min(6,true).oneOf([Yup.ref("password")],true).required(true)
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
  

import React, { useState, useCallback } from "react";
import { StyleSheet, View,ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { getMeApi, updateUserApi } from "../../api/user";
import { formStyle } from "../../styles";
import StatusBar from "../../components/StatusBar";									 
import colors from "../../styles/colors";

export default function ChangeUsername() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token); 
        await formik.setFieldValue("username", response.username);      
	  })();
    }, [])
  );

	 
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth,formData)
        if (response.statusCode) {
            throw "Error 400"
        }
        navigation.goBack();
      } catch (error) {
          {   
            Platform.OS==="ios" ? 
            (Toast.show("Error al actualizar el Username.", {
                position: Toast.positions.CENTER
            })) : 
            (ToastAndroid.showWithGravityAndOffset("Error al actualizar el Username.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            ))    
        }
        formik.setFieldError("username",true)
      }
      setLoading(false);
    },
  });

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          label="Username"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("username", text)}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar Username
        </Button>
      </View>
    </>
  );
}

function initialValues() {
  return {
    username: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().min(4,true).required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
  

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

export default function ChangeName() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
														 
        await formik.setFieldValue("name", response.name);
        await formik.setFieldValue("lastname", response.lastname);
      
	  })();
    }, [])
  );

	 
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await updateUserApi(auth, formData);
        navigation.goBack();
      } catch (error) {{   
        Platform.OS==="ios" ? 
        (Toast.show("Error al actualizar el Email.", {
            position: Toast.positions.CENTER
        })) : 
        (ToastAndroid.showWithGravityAndOffset("Error al actualizar el Email.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          ))    
    }
      }
      setLoading(false);
    },
  });

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("name", text)}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <TextInput
          label="Apellidos"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("lastname", text)}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar nombre y apellidos
        </Button>
      </View>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
  

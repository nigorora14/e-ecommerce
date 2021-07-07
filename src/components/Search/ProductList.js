import React from 'react'
import { StyleSheet, Text, View,ScrollView,Image,TouchableWithoutFeedback } from 'react-native'
import {map} from 'lodash'
import {Button} from 'react-native-paper'
import colors from '../../styles/colors'
import {API_URL} from '../../utils/constants'

export default function ProductList(props) {
    const {products} = props
    const getToProduct = (id) => {
        console.log(id)
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>RESULTADOS</Text>
            {
                map(products, (product) => (
                    <TouchableWithoutFeedback 
                        key={product._id} 
                        onPress={() => getToProduct(product._id)}
                    >
                        <Text>{product.title}</Text>
                    </TouchableWithoutFeedback>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        paddingHorizontal: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 5
    }
})

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import {map} from 'lodash'
import { API_URL } from '../../utils/constants'
import {useNavigation} from '@react-navigation/native'

export default function ListProducts(props) {
    const {products} = props
    const navigation = useNavigation()

    const goToProduct = (id) => {
        navigation.push("product", {idProducto: id})
    }

    return (
        <View style= {styles.container}>
            {
                map(products, (product) => (
                    <TouchableWithoutFeedback
                        key={product._id}
                        onPress={() => goToProduct(product._id)}
                    >
                        <View style={styles.containerProduct}>
                            <View style={styles.product}>
                                <Text style= { styles.marca} numberOfLines={1} ellipsizeMode="tail">{product.marca}</Text>
                                <Image
                                    style={styles.image}
                                    source= {{
                                        uri: `${API_URL}${product.main_image.url}`
                                    }}
                                />
                                <Text style= { styles.modelo} numberOfLines={1} ellipsizeMode="tail">{product.title}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap:"wrap",
        alignItems: "flex-start",
        margin: -2
    },
    containerProduct:{
        width: "50%",
        padding: 2    
    },
    product: {
        backgroundColor: "#f5f5f5",
        padding: 10
    },
    image:{
        height: 150,
        resizeMode:"contain"
    },
    modelo: {
        padding: 5,
        fontSize:12,
        alignSelf: "center"
    },
    marca: {
        padding: 5,
        fontSize:18,
        alignSelf: "center",
        fontWeight: "bold"
    }
})


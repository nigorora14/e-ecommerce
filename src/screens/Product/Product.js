import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {getProductsApi} from '../../api/product'
import Search from '../../components/Search'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import ScreenLoading from '../../components/ScreenLoading'
import CarouselImages from '../../components/Product/CarouselImages'
import { Button } from 'react-native-paper'

export default function Product(props) {
    const {route}=props
    const {params}=route
    const [product, setProduct] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getProductsApi(params.idProducto)
            setProduct(response)
        })()
    }, [params])
    
    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barstyle="light-content" />
        <Search />
        {
            !product ? (
            <ScreenLoading text="Cargando producto" size="large"/>
            ) : (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{product.marca}-{product.title}</Text>
                <CarouselImages imagenes= {product.imagenes}/>
                <View style= {styles.containerView}>
                    <Button>
                        Test
                    </Button>
                </View>
            </ScrollView>
            )
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 10, --> para los espacios entre fotos
        paddingBottom: 50
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 20,
        padding: 10
    },
    containerView: {
        padding: 10
    }
})

import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {getProductsApi} from '../../api/product'
import Search from '../../components/Search'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import ScreenLoading from '../../components/ScreenLoading'
import CarouselImages from '../../components/Product/CarouselImages'
import Price from '../../components/Product/Price'
import Buy from '../../components/Product/Buy'
import Favorite from '../../components/Product/Favorite'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Product(props) {
    const {route}=props
    const {params}=route
    const [product, setProduct] = useState(null)
    const [imagenes, setImagenes] = useState([])

    useEffect(() => {
        (async () => {
            const response = await getProductsApi(params.idProducto)
            setProduct(response)

            const arrayImagenes = [response.main_image]
            arrayImagenes.push(...response.imagenes)
            setImagenes(arrayImagenes)

        })()
    }, [params])
    
    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barstyle="light-content" />
        <Search />
        {
            !product ? (
            <ScreenLoading paddingVertical={100}  size="large" text="Cargando Producto..."/>
            ) : (
            <>
            <KeyboardAwareScrollView style={styles.container}>
                <Text style={styles.title}>{product.marca}-{product.title}</Text>
                <CarouselImages imagenes = {imagenes}/>
                <View style= {styles.containerView}>
                    <Price price={product.price} discount={product.discount}></Price>
                    {/* <Quantity quantity={quantity} setQuantity={setQuantity}/> */}
                    <Buy product={product} />
                    <Favorite product={product}/>
                </View>
            </KeyboardAwareScrollView>
            </>
            )
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 10, //--> para los espacios en los costados
        paddingBottom: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
        padding: 10
    },
    containerView: {
        padding: 10,
        paddingBottom: 20
    }
})

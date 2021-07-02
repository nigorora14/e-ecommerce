import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {getProductsApi} from '../../api/product'
import Search from '../../components/Search'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import ScreenLoading from '../../components/ScreenLoading'
import CarouselImages from '../../components/Product/CarouselImages'

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
            <ScrollView>
                <Text>{product.marca}-{product.title}</Text>
                <CarouselImages/>
            </ScrollView>
            )
        }
        </>
    )
}

const styles = StyleSheet.create({})

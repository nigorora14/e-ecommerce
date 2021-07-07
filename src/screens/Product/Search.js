import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {searchProductsApi} from '../../api/search'
import StatusBar from '../../components/StatusBar'
import {size} from 'lodash'
import colors from '../../styles/colors'
import Search from '../../components/Search'
import ScreenLoading from '../../components/ScreenLoading'
import ResultNotFound from '../../components/Search/ResultNotFound'
import ProductList from '../../components/Search/ProductList'

export default function SearchScreen(props) {
    const {route} = props
    const {params} = route
    const [products, setProducts] = useState(null)

    useEffect(() => { //peticion que optiene el producto buscado
        (async ()=>{
            setProducts(null)
            const response= await searchProductsApi(params.search)
            setProducts(response)
        })()
    }, [params.search])
    
    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content"/>
            <Search currentSearch={params.search}/>
            {
                !products ? (
                    <ScreenLoading text="Buscando Producto" paddingVertical="45%"/>
                ) : size(products)===0 ? (
                    <ResultNotFound search={params.search}/>
                ) : (
                    <ProductList products={products}/>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({})

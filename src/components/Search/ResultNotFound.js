import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ResultNotFound(props) {
    const { search}= props
    return (
        <View style={styles.container}>
            <Text style={styles.searchText}>No se encontraron productos relacionados a: "{search}".</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    searchText:{
        fontSize:18,
        fontWeight:"bold"
    }
})

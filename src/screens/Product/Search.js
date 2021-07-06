import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Search(props) {
    const {route} = props
    const {params} = route
    console.log(params.search)
    return (
        <View>
            <Text>Search...</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

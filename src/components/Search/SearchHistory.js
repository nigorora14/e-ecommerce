import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import {getSearchHistoryApi} from '../../api/search'

export default function SearchHistory(props) {
    const {showHistory, countainerHeight} = props
    const [history, setHistory] = useState(null)

    useEffect(() => {
       if (showHistory) {
           (async () => {
               const response = await getSearchHistoryApi()
               console.log(response)
           })()
       }
    }, [showHistory])
    return (
        <View style={[
            showHistory?styles.history : styles.hidden ,
            {top: countainerHeight}
        ]}>
            <Text>Historias</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    hidden:{
        display:"none"
    },
    history:{
        position:"absolute",
        backgroundColor: colors.bgLight,
        width:Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})

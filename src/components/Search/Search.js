import { useNavigation } from '@react-navigation/native'
import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Animated, Keyboard } from 'react-native'
import { Searchbar } from 'react-native-paper'
import colors from '../../styles/colors'
import SearchHistory from '../Search/SearchHistory'
import {updateSearchHistoryApi} from '../../api/search'
import {
    AnimatedIcon, 
    inputAnimationWidth, 
    inputAnimation, 
    animatedTransition, 
    animatedTransitionReset,
    arrowAnimation
} from './SearchAnimation'

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("")
    const [showHistory, setShowHistory] = useState(false)
    const [countainerHeight, setCountainerHeight] = useState(0)
    const navigation = useNavigation()

    const onChangeSearch = (query) => {
        setSearchQuery(query)
    }

    const openSearch = () => {
        animatedTransition.start()
        setShowHistory(!showHistory)
    }
    const closeSearch = () => {
        animatedTransitionReset.start()
        Keyboard.dismiss()
        setShowHistory(!showHistory)
    }
    const onSearch = async () => {
        closeSearch()
        await updateSearchHistoryApi(searchQuery)

        navigation.push("search",{
            search: searchQuery
        })
    }
   
    return (
        <View 
            style={styles.container}
            onLayout={(e) => setCountainerHeight(e.nativeEvent.layout.height)}
        >
            <View style = {styles.containerInput}>
                <AnimatedIcon
                    name="arrow-left"
                    size={20}
                    style={[styles.backArrow, arrowAnimation]}
                    onPress={closeSearch}
                />
                <Animated.View style={[inputAnimation,{width: inputAnimationWidth}]}>
                    <Searchbar 
                        placeholder="Buscar Producto..." 
                        onFocus={openSearch} 
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        onSubmitEditing={onSearch}
                    />
                </Animated.View>
            </View>
            <SearchHistory showHistory={showHistory} countainerHeight={countainerHeight}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput:{
        position: "relative",
        alignItems: "flex-end"
    },
    backArrow:{
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.fontLight
    }
})
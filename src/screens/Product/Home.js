import React from 'react'
import { ScrollView } from 'react-native'
import Search from '../../components/Search'
import StatusBar from '../../components/StatusBar'
import colors from '../../styles/colors'
import NewProducts from '../../components/Home/NewProducts'

export default function Home() {
    return (
        <>
            <StatusBar backgroundColor= {colors.bgDark} barStyle="light-content"/>
            <Search/>
            <ScrollView>
                <NewProducts/>
            </ScrollView>
        </>
    )
}


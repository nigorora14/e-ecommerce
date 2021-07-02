import React, { useCallback, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import StatusBar from '../../components/StatusBar'
import Search from '../../components/Search'
import { getMeApi } from '../../api/user'
import colors from '../../styles/colors'
import useAuth from '../../hooks/useAuth'
import ScreenLoading from '../../components/ScreenLoading'
import UserInfo from '../../components/Account/UserInfo'
import Menu from '../../components/Account/Menu'

export default function Account() {
    const [user, setUser] = useState(null)
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(
            () => {
                (
                    async () => {
                        //setUser(null)
                        const response = await getMeApi(auth.token)
                        setUser(response)
                    }
                )()
            }, []
        )
    )
    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            {
                !user ? (
                   <ScreenLoading size="large" text="Cargando..."/>
                ) : (
                    <>
                        <Search />
                        <ScrollView>
                            <UserInfo user={user}/>
                            <Menu/>
                        </ScrollView>
                    </>
                )
            }

        </>
    )
}

// const styles = StyleSheet.create({
//     container: {
        //         flex: 1,
        //         justifyContent: "center",
        //         alignItems: "center"
//     }
// })


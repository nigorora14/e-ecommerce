import { size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet,Dimensions ,Image } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { API_URL } from '../../utils/constants'

const width = Dimensions.get("window").width

export default function CarouselImages(props) {
    const { imagenes } = props
    const [imageActive, setImageActive] = useState(0)

    const renderItem = ({item}) => {
        return <Image 
                    style={styles.carousel} 
                    source={{ uri: `${API_URL}${item.url}`}}
                />
    }
    return (
        <>
            <Carousel
                layout={"default"}
                layoutCardOffset={20}
                data={imagenes}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => setImageActive(index)}
                // backgroundColor="#BBDEFB" //color de fondo del carrucel
            />
            <Pagination
                dotsLength={size(imagenes)}
                activeDotIndex={imageActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </>
    )
}

const styles = StyleSheet.create({
    carousel:{
        width,
        height: 300,
        resizeMode: "contain",
        // backgroundColor:"#304FFE" //color que completa el tamaño de la foto
    }
})

import React from 'react'
import { StyleSheet,Dimensions ,Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { API_URL } from '../../utils/constants'

const width = Dimensions.get("window").width
const height= 400

export default function CarouselImages(props) {
    const { imagenes } = props

    const renderItem = ({item}) => {
        return <Image 
                    style={styles.carousel} 
                    source={{ uri: `${API_URL}${item.url}`}} />
    }
    return (
        <>
            <Carousel
                layout={"default"}
                data={imagenes}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
            />
        </>
    )
}

const styles = StyleSheet.create({
    carousel:{
        width,
        height,
        resizeMode: "contain"
    }
})

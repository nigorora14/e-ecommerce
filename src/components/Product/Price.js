import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import colors from '../../styles/colors'

export default function Price(props) {
    const {price, discount}=props
    
    const calcPrice = (price, discount) => {
        if (!discount) {
            return price
        }
        const discountAmount = (price*discount)/100
        return (price-discountAmount).toFixed(2)
    }

    return (
        <View>
            {
                discount && (
                    <View style={styles.containerData}>
                        <Text style={styles.dataText}>Precio:</Text>
                        <Text style= {[styles.dataValue, styles.oldPrice]}>S/. {price.toFixed(2)}</Text>
                    </View>
                )
            }
            <View style={styles.containerData}>
                <Text style={styles.dataText}>Precio Actual:</Text>
                <View style={styles.containerData}>
                    <Text style= {[styles.dataValue, styles.currentPrice]}>S/. {calcPrice(price, discount)} </Text>
                    {
                        discount && (
                            <Button 
                                mode="contained"
                                icon="offer"
                                color={colors.rojo}
                            >- {discount}%
                            </Button>
                        )
                    }
                </View>
            </View>
            { discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Ahorras:</Text>
                    <Text style= {[styles.dataValue, styles.saving]}>S/. {
                            ((price*discount)/100).toFixed(2)
                        } 
                        {/* ({discount}%) */}
                    </Text>
                </View>
            )
                
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerData:{
        flexDirection:"row",
        alignItems: "center",
        paddingVertical: 2
    },
    dataText:{
        width: "35%",
        fontSize: 15,
        color: "#747474",
        textAlign: "right"
    },
    dataValue:{
        width: "55%",
        fontSize: 20,
        paddingLeft: 5
    },
    oldPrice:{
        textDecorationLine:"line-through"
    },
    currentPrice:{
        fontSize: 20,
        color: "#bc0e0d"
    },
    saving:{
        color: "#bc0e0d"
    }
})

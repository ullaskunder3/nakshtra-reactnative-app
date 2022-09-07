import React from 'react'
import { View, Text, StyleSheet, Linking, ImageBackground } from 'react-native'
const bg = require('../assets/space2.jpg')
export default function AsteroidInfo({ route }: any) {
    const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = route.params.asteroidInfo
    const astroidID = nasa_jpl_url.split('=')[1]

    const onPressLinkHandler = () => Linking.openURL(nasa_jpl_url)

    return (
        <View style={styles.asteroidContainer}>
            <ImageBackground source={bg} resizeMode='cover' style={styles.bgStyle} blurRadius={1}>
                <View style={styles.asteroidInfoWrapper}>
                    <View>
                        <Text style={styles.asteroidContainer__name}>{name}</Text>
                    </View>
                    <View>
                        <Text style={is_potentially_hazardous_asteroid ? styles.asteroidContainer__textR:styles.asteroidContainer__textG}>{is_potentially_hazardous_asteroid ? `${astroidID} is potentially hazardous asteroid` :  `${astroidID} is not potentially hazardous asteroid`}</Text>
                        <Text style={styles.asteroidContainer__url}>url: {nasa_jpl_url}</Text>

                        <View style={{ alignItems: 'baseline' }}>
                            <View style={styles.asteroidIDLink}>
                                <Text
                                    onPress={onPressLinkHandler}>Redirecting link Astroid ID {astroidID}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    asteroidContainer: {
        flex: 1,
    },
    asteroidInfoWrapper: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#6d6c6c71",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10
    },
    bgStyle: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    asteroidContainer__name: {
        fontSize: 25,
        color: '#ffffff',
        fontWeight: '800',
        paddingVertical: 20
    },
    asteroidContainer__icon: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    asteroidIDLink: {
        backgroundColor: '#d3d1d1c0',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    asteroidContainer__textG:{
        color: '#97eb53', 
        fontWeight: 'bold'
    },
    asteroidContainer__textR:{
        color: '#eb7153', 
        fontWeight: 'bold'
    },
    asteroidContainer__text: {
        fontSize: 15,
        color: '#cecbcb',
        fontWeight: 'bold',
    },
    asteroidContainer__url: {
        fontSize: 12,
        color: '#c2c2c2',
        paddingVertical: 20
    },
    containerShadow: {
        shadowColor: '#171717',
        shadowOpacity: 0.1,
        elevation: 8,
    }
})

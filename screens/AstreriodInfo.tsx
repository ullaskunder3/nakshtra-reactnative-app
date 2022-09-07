import React from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native'

export default function AsteroidInfo({ route }: any) {
    const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = route.params.asteroidInfo
    const astroidID = nasa_jpl_url.split('=')[1]

    const onPressLinkHandler = ()=>Linking.openURL(nasa_jpl_url)

    return (
        <View style={[styles.asteroidContainer, styles.containerShadow]}>
            <View>
                <Text style={styles.asteroidContainer__name}>Name: {name}</Text>
            </View>
            <View>
                <Text style={styles.asteroidContainer__url}>url: {nasa_jpl_url}</Text>
                <Text style={{ color: 'blue' }}
                    onPress={onPressLinkHandler}>Redirecting link {astroidID}
                </Text>
                <Text style={styles.asteroidContainer__url}>is_potentially_hazardous_asteroid: {is_potentially_hazardous_asteroid ? 'true' : 'false'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    asteroidContainer: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 50,
    },
    asteroidContainer__name: {
        fontSize: 20,
        color: '#555',
        fontWeight: 'bold',
        paddingVertical: 20
    },
    asteroidContainer__icon: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    asteroidContainer__url: {
        fontSize: 12,
        color: '#474747',
        fontWeight: 'bold',
        paddingVertical: 5
    },
    containerShadow: {
        shadowColor: '#171717',
        shadowOpacity: 0.1,
        elevation: 8,
    }
})

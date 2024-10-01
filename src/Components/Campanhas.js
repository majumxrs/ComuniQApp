import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'


export default function Campanhas({ setCampanhas }) {

    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <Text>teste052015</Text>
            </View>

            <TouchableOpacity style={css.btn} onPress={() => {setCampanhas(false) }}>
              <Text style={css.Texto}>Campanhas</Text>
            </TouchableOpacity>
        </View>
    )
}
const css = StyleSheet.create({
    container: {
        width: 350,
        height: 600,
        backgroundColor: "white",
        marginTop: 25,
    }
})
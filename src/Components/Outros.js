import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Outros({ setOutros }) {
    return (

        <View style={css.container}>
            <View style={css.boxTitle}>
                <Text>teste052015</Text>
            </View>


            <TouchableOpacity style={css.btn} onPress={() => {setOutros(false) }}>
              <Text style={css.Texto}>Voltar</Text>
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
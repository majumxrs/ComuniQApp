import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import SelectDropdown from 'react-native-select-dropdown';

export default function Select({ data, SetTipoNovaCampanha }) {

    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                SetTipoNovaCampanha( selectedItem );
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.tipoCampanhaNome) || 'Selecione o Tipo da Campanha'}
                        </Text>
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#B3B3B3' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.tipoCampanhaNome}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 350,
        height: 50,
        backgroundColor:"#fff",
        borderRadius: 12,
        borderColor:"#20343F",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
});
import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import SelectDropdown from 'react-native-select-dropdown';

export default function Select({ data, setBairro }) {

    return (
        <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
                setBairro( selectedItem );
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.bairroNome) || 'Selecione o bairro'}
                        </Text>
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.bairroNome}</Text>
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
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
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
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});
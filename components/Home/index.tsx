import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {

    return (
        <LinearGradient
            style={styles.container}
            colors={['#87CEEB', '#FFFFFF']}
        >
            <View style={styles.body}>
                <Text style={styles.title}>{'Bem vindo !'}</Text>
                <View style={styles.separator}></View>
                <Text style={styles.title}>{'EducaOnline'}</Text>
                <View style={styles.separator}></View>
                <Text style={styles.subTitle}>{'Informações para seus estudos'}</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
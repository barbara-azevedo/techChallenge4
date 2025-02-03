import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import Header from "@/components/Header/header";
import getToken, { findOneUser } from "./api";
import SessionStorage from 'react-native-session-storage';

export default function Login() {
    const [email, inputEmail] = useState('')
    const [senha, inputPass] = useState('')
    const [_, setText] = useState('')
    const navigation = useNavigation<any>();

    async function getTokenUser() {

        if (email === undefined || email === '' && senha === undefined || senha === '') {
            Alert.alert('Erro:', 'Digite suas credenciais !!!');
            return;
        }
        await getToken({ email, senha });
        const data = SessionStorage.getItem("@usuarioLogado")
        if (data) {

            Alert.alert(
                'Login',
                `Usuário autenticado com sucesso`,
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: true }
            );

            navigation.navigate('screens/Login/index')
        } else {
            Alert.alert('Erro:', 'Usuário não encontrato!!!');
        }
    }

    const logout = () => {
        SessionStorage.clear();
    }

    const handleButtonPress = () => {
        getTokenUser();
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#87CEEB', '#FFFFFF']}

        >
            <View style={styles.content}>
                <TextInput style={styles.input} placeholder="E-mail"
                    onChangeText={inputEmail}
                    value={email}
                />
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
                    onChangeText={inputPass}
                    value={senha}
                />

                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 25,
    },
    button: {
        backgroundColor: 'inherit',
        borderColor: 'grey',
        borderWidth: 1,
        width: '50%',
        alignItems: 'center',
        padding: 5,
    }
})
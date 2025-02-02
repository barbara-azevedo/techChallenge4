import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import Header from "@/components/Header/header";
import getToken, { findOneUser } from "./api";
import SessionStorage from 'react-native-session-storage';

export default function Login() {
    const [email, setUser] = useState('')
    const [senha, setPassword] = useState('')
    const [_, setText] = useState('')
    const navigation = useNavigation<any>();

    const handleInputChange = (inputText: any) => {
        setText(inputText)
    }

    async function getTokenUser() {
        const token = await getToken({ email, senha });
        return token;
    }

    const logout = () => {
        SessionStorage.clear();
    }

    const handleButtonPress = () => {
        if (email === undefined || email === '' && senha === undefined || senha === '') {
            Alert.alert('Erro:', 'Digite suas credenciais !!!');
            return;
        }
        getTokenUser();
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

            navigation.navigate('screens/PostList/index')
        } else {
            Alert.alert('Erro:', 'Usuário não encontrato!!!');
        }
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#87CEEB', '#FFFFFF']}

        >
            <Header title={'Login'} />
            <View style={styles.content}>
                <TextInput style={styles.input} placeholder="E-mail"
                    onChangeText={(inputText) => { setUser(inputText) }}
                    value={email}
                />
                <TextInput />
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
                    onChangeText={(inputText) => { setPassword(inputText) }}
                    value={senha}
                />
                <StatusBar style="auto" />
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
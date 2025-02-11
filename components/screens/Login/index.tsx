import { Image, Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import SessionStorage from 'react-native-session-storage';
import getToken from "./api";

export default function Login() {
    const [email, inputEmail] = useState('')
    const [senha, inputPass] = useState('')
    const navigation = useNavigation<any>();

    async function getTokenUser() {
        if (email === undefined || email === '' && senha === undefined || senha === '') {
            toasMsg('error', 'Informe suas credenciais !')
            return;
        } else {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

            if (email.length === 0) {
                toasMsg('error', 'E-mail não informado!')
                return;
            } else if (reg.test(email) === false) {
                toasMsg('error', 'E-mail invalido!')
                return;
            }
            await getToken({ email, senha });
     
            const data = SessionStorage.getItem("@usuarioLogado")
            if (data) {
                navigation.navigate('Home/index')
                toasMsg('success', 'Usuário autenticado')
            } else {
                toasMsg('error', 'Usuário não encontrado!!!');
            }
        }
    }

    const toasMsg = (type: any, mensagem: any) => {
        Toast.show({
            type: type,
            text1: mensagem
        });
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
                <Image source={require("@/assets/images/educaonline-logo.png")} style={styles.image} />
                <TextInput style={styles.input} placeholder="E-mail"
                    onChangeText={inputEmail}
                    value={email}
                />
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
                    onChangeText={inputPass}
                    value={senha}
                />

                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text>Logar</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
        padding: 5,
        borderRadius: 25,
    },
    button: {
        backgroundColor: 'inherit',
        borderColor: 'grey',
        borderWidth: 1,
        width: '50%',
        alignItems: 'center',
        padding: 5,
        borderRadius: 25,
    },
    image: {
        width: 200,
        height: 200,
        margin: 'auto'
    }
})
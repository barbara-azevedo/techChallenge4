
import React from 'react';

import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import Header from "@/components/Header/header";
import { LinearGradient } from "expo-linear-gradient";
import { postUserCreate } from '../api';

export default function AdicinarUsuario() {
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [tipoAcesso, setTipoAcesso] = useState('')
  const [_, setText] = useState('')
  const navigation = useNavigation<any>();

  async function save() {

    const response = await postUserCreate({ email, senha, nome, tipoAcesso });
    if (response === 201) {
 
      Alert.alert(
        'Adicionar Usuário',
        `Usuário salvo com sucesso`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('screens/Usuario/index'),
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
      setNome('')
      setEmail('')
      setSenha('')
      setTipoAcesso('')
    } else {
      Alert.alert('Error: ' + response)
    }
  }


  const handleButtonPress = () => {
    save();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['#87CEEB', '#FFFFFF']}

    >
      <View style={styles.content}>
        <TextInput style={styles.input} placeholder="Nome"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput style={styles.input} placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput style={styles.input} placeholder="Acesso"
          onChangeText={setTipoAcesso}
          value={tipoAcesso}
        />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
          onChangeText={setSenha}
          value={senha}
        />

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text>Salvar</Text>
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
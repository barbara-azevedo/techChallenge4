
import React from 'react';

import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SectionList } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import Header from "@/components/Header/header";
import { LinearGradient } from "expo-linear-gradient";
import { postUserCreate } from '../api';

import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

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

  const data = [
    { label: 'Aluno', value: 'ALUNO' },
    { label: 'Professor', value: 'PROFESSOR' },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };
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

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Acesso' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setTipoAcesso(item.value)
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />

        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
          onChangeText={setSenha}
          value={senha}
        />

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient >
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
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 25,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
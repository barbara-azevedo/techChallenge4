
import React, { useEffect } from 'react';

import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SectionList } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import SessionStorage from 'react-native-session-storage';
import { LinearGradient } from "expo-linear-gradient";
import { postUserCreate, postUserUpdate } from '../api';

import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AdicinarUsuario({ route }: { route: any }) {
  const navigation = useNavigation<any>();

  const Separator = () => <View style={styles.separator} />;
  const [_id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [tipoAcesso, setTipoAcesso] = useState('')

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isAdmin, setAdmin] = useState('')
  const [labelAcesso, setLabelAcesso] = useState('')
  const [isEditable, setEditable] = useState(false)

  const [fetch, setFetch] = useState([
    { label: 'Aluno', value: 'ALUNO' },
    { label: 'Professor', value: 'PROFESSOR' },
  ])
  const usuarioLogado = SessionStorage.getItem('@usuarioLogado');

  useEffect(() => {
    if (route && route.params) {
      const rota = route.params;
      setNome(rota.nome)
      setEmail(rota.email)
      setId(rota._id)
      setTipoAcesso(rota.tipoAcesso)
      setValue(rota.tipoAcesso)
      if (usuarioLogado && usuarioLogado.email === rota.email) {
        setEditable(false)
      } else {
        setEditable(true)
      }
    }


    if (usuarioLogado && usuarioLogado.tipoAcesso === 'ADMIN') {
      setAdmin('TRUE')
    } else {
      setAdmin('FALSE')
    }

    if (usuarioLogado && usuarioLogado.tipoAcesso === 'ALUNO') {
      setLabelAcesso('ALUNO')
    } else if (usuarioLogado && usuarioLogado.tipoAcesso === 'PROFESSOR') {
      setLabelAcesso('PROFESSOR')
    } else {
      setFetch([
        { label: 'Aluno', value: 'ALUNO' },
        { label: 'Professor', value: 'PROFESSOR' },
      ])
    }
  }, []);

  async function save() {
    const response = await postUserCreate({ email, senha, nome, tipoAcesso });
    if (response === 201) {
      alerta({ titulo: 'Salvar', msg: 'Usuário salvo com sucesso', nav: 'screens/Usuario/index' })
      limpar()
    } else {
      Alert.alert('Error: ' + response)
    }
  }

  async function update() {
    const response = await postUserUpdate({ email, senha, nome, tipoAcesso });
    if (response === 200) {
      alerta({ titulo: 'Atualizar', msg: 'Usuário atualizado com sucesso', nav: 'screens/Usuario/index' })
      limpar()
    } else {
      Alert.alert('Error: ' + response)
    }
  }

  const alerta = ({ titulo, msg, nav }: { titulo: any, msg: any, nav: any }) => {
    Alert.alert(titulo, msg,
      [{
        text: 'OK',
        onPress: () => navigation.navigate(nav),
        style: 'cancel',
      },],
      { cancelable: true }
    );
  }

  const handleButtonPress = () => {
    save();
  }

  const handleUpdateButtonPress = () => {
    update();
  }

  const limpar = () => {
    setId('')
    setNome('')
    setEmail('')
    setSenha('')
    setTipoAcesso('')
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['#87CEEB', '#FFFFFF']}
    >
      <View style={styles.content}>

        <Text style={styles.text}>{'Adicionar/Editar Usuário'}</Text>

        <Separator />
        <TextInput style={styles.input} placeholder="Nome"
          onChangeText={setNome}
          value={nome}
        />

        <TextInput style={styles.input} placeholder="E-mail" editable={isEditable}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true}
          onChangeText={setSenha}
          value={senha}
        />

        {!isAdmin ?
          <View>
            <Text>
              <Text style={styles.text}>Tipo Acesso: </Text> {labelAcesso}
            </Text>
            <Separator />
          </View>
          :
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={fetch}
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
        }
        <View style={styles.btnGroup}>
          {!_id ?
            <TouchableOpacity style={[styles.button, styles.buttonSpace]} onPress={handleButtonPress}>
              <Text>Salvar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.button, styles.buttonSpace]} onPress={handleUpdateButtonPress}>
              <Text>Atualizar</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={[styles.button, styles.buttonSpace]} onPress={limpar}>
            <Text>Limpar</Text>
          </TouchableOpacity>
        </View>
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
    width: '40%',
    alignItems: 'center',
    padding: 5,
  },
  btnGroup: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6B7280'
  },
  buttonSpace: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5
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
  text: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

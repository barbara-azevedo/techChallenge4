import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Autor } from './common.entity';
import { useNavigation } from '@react-navigation/native'
import SessionStorage from 'react-native-session-storage';

const Item = ({ titulo, conteudo, autor }: { titulo: any, conteudo: any, autor: any }) => {

  const navigation = useNavigation<any>();
  const Separator = () => <View style={styles.separator} />;
  const aut: Autor[] = autor;
  const [isModify, setModify] = useState(false)

  useEffect(() => {
    const usuarioLogado = SessionStorage.getItem('@usuarioLogado');

    if (usuarioLogado && (usuarioLogado.tipoAcesso === 'ADMIN' || usuarioLogado.tipoAcesso === 'PROFESSOR')) {
      setModify(true)
    } else {
      setModify(false)
    }
  }, []);


  const onBack = () => {
    navigation.navigate('screens/Login/index')
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.conteudo}>{conteudo?.substring(0, 100)}...leia mais</Text>
      <Text style={styles.marginTop}>
        <Text style={styles.autorContent}>Autor:  </Text><Text>{aut[0].nome}</Text>
      </Text>
      <Text>
        <Text style={styles.autorContent}>Data:  </Text><Text>{formatDate(aut[0].dtCriacao)}</Text>
      </Text>
      {!isModify ? '' :
        <View>
          <Separator />
          <View style={styles.content}>
            <TouchableOpacity style={[styles.button]}
              onPress={() => { }}>
              <Text style={styles.text}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export function formatDate(date: any) {
  return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopColor: '#ddd',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'inherit',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 25,
    width: '50%',
    alignItems: 'center',
    padding: 5,
  },
  conteudo: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'justify'
  },
  autorContent: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
  marginTop: {
    marginTop: 15,
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
});

export default Item;
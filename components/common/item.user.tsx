import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Usuario } from './common.entity';
import { useNavigation } from '@react-navigation/native'
import SessionStorage from 'react-native-session-storage';


const ItemUser = ({ user }: { user: any }) => {
  const navigation = useNavigation<any>();

  const Separator = () => <View style={styles.separator} />;

  let usuario: Usuario = user;
  return (
    < View style={[styles.item, styles.marginTop]}>
      <Text style={styles.title}><Text style={styles.title}>Nome:    </Text>{usuario.nome}</Text>
      <Text style={styles.subTitle}><Text style={styles.title}>E-mail:   </Text>{usuario.email}</Text>
      <Text style={styles.conteudo}><Text style={styles.title}>Acesso:  </Text>{usuario.tipoAcesso}</Text>
      <Text style={styles.marginTop}>
        <Text style={styles.autorContent}>Data:       </Text><Text>{formatDate(usuario.dtCriacao)}</Text>
      </Text>
      <Separator />
      <View style={styles.content}>
        <TouchableOpacity style={[styles.button]}
          onPress={() => navigation.navigate('screens/Usuario/Editar/index',
            { _id: usuario._id, nome: usuario.nome, email: usuario.email, tipoAcesso: usuario.tipoAcesso })}>
          <Text style={styles.text}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export function formatDate(date: any) {
  return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  conteudo: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'justify'
  },
  autorContent: {
    fontSize: 14,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
  marginTop: {
    marginTop: 15,
  },
  subTitle: {
    fontSize: 14,
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

export default ItemUser;
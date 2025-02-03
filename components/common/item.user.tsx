import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Usuario } from './common.entity';

const ItemUser = ({ user }: { user:any }) => {
  let u: Usuario = user;
  return (
    <View style={[styles.item,styles.marginTop]}>
      <Text style={styles.title}><Text style={styles.title}>Nome:    </Text>{u.nome}</Text>
      <Text style={styles.subTitle}><Text style={styles.title}>E-mail:   </Text>{u.email}</Text>
      <Text style={styles.conteudo}><Text style={styles.title}>Acesso:  </Text>{u.tipoAcesso}</Text>
      <Text style={styles.marginTop}>
        <Text style={styles.autorContent}>Data:       </Text><Text>{formatDate(u.dtCriacao)}</Text>
      </Text>
    </View>
  );
};

export function formatDate(date: any) {
  return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
}

const styles = StyleSheet.create({
  item: {
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderTopColor: '#ddd'
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
  separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default ItemUser;
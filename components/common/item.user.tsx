import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Autor, Usuario } from './common.entity';

const ItemUser = ({ user }: { user:any }) => {
  let u: Usuario = user;
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{u.email}</Text>
      <Text style={styles.conteudo}>{u.tipoAcesso}</Text>
      <Text>
        <Text style={styles.autorContent}>Data:  </Text><Text>{formatDate(u.dtCriacao)}</Text>
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
  }
});

export default ItemUser;
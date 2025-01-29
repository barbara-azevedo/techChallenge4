import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Autor } from './common.entity';
import Moment from 'moment';

Moment.locale('pt');
const ItemSingle = ({ titulo, conteudo, autor }: { titulo: any, conteudo: any, autor: any }) => {
  const aut: Autor[] = autor;
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.conteudo}>{conteudo}</Text>
      <Text style={styles.marginTop}>
        <Text style={styles.autorContent}>Autor:  </Text><Text>{aut[0].nome}</Text>
      </Text>
      <Text>
        <Text style={styles.autorContent}>Data:  </Text><Text>{formatDate(aut[0].dtCriacao)}</Text>
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

export default ItemSingle;
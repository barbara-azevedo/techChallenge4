import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }: { title: any }) => {

  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Header;
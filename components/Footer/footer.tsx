import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
 return (
   <View style={styles.footer}>
     <Text style={styles.text}>© 2025 EducaOnline. All rights reserved.</Text>
   </View>
 );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  text: {
    fontSize: 14
  }
 });

export default Footer;
import { Stack } from "expo-router";
import { Routes } from "@/routes";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Header title="EducaOnline" />
      <View style={styles.title}>
        <Text style={styles.fontBold}>Informações para seu estudo</Text>
      </View>
      <Routes></Routes>
      <Footer />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 0.9
  },
  header: {
    height: 60,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAlign: {
    marginLeft: 10
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBold: {
    fontWeight: 'bold'
  },
  subTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12
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
import { Stack } from "expo-router";
import { Routes } from "@/routes";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/index";
import { useNavigation } from '@react-navigation/native'
import SessionStorage from "react-native-session-storage";
import { useEffect, useState } from "react";
import { Usuario } from "@/components/common/common.entity";
import { Platform } from 'react-native';

export default function RootLayout() {

  const [usuarioLogado, setUsuario] = useState<Usuario>()

  const navigation = useNavigation<any>();


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data: Usuario = SessionStorage.getItem("@usuarioLogado")
    setUsuario(data)
  }

  if (Platform.OS === 'ios') {
    // do something for ios
    console.log("IOS")
  } else if (Platform.OS === 'android') {
    // other thing for android
    console.log("android")
  } else if (Platform.OS === 'web') {
    // it's on web!
    console.log("web")
  } else {
    // you probably won't end up here unless you support another platform!
    console.log("sei la")
  }

  return (
    <View style={styles.container} >
      <Header title={'EducaOnline'} />
      <Routes></Routes>
      <Footer></Footer>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#ddd',
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
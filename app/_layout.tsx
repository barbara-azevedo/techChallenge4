import { Stack } from "expo-router";
import { Routes } from "@/routes";
import { StyleSheet, Text, View } from "react-native";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
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
    flex: 1
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
  fontBold:{
    fontWeight: 'bold'
  },
  subTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12
  }
})
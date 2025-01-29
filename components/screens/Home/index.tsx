import ListScreen from "@/components/PostsList/fastlist";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Item from "@/components/common/item";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

export default function Home() {

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <View>
        <Text style={styles.title}>EducaOnline</Text>
      </View>
      <View style={styles.textAlign}>
        <Text style={styles.subTitle}>Informações para seu estudo</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <ListScreen />
      </SafeAreaView>

      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 14,
    fontWeight: "bold"
  },
  subTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12
  }
})

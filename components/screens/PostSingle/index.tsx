import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ItemSingle from '@/components/common/item.sigle';

export default function PostSingle({ route }: { route: any }) {

  const navigation = useNavigation<any>();
  const { _id } = route.params
  const { title } = route.params
  const { content } = route.params
  const { autor } = route.params

  const Separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ItemSingle titulo={title} conteudo={content} autor={autor} />
        <Separator />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});
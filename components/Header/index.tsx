import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import SessionStorage from 'react-native-session-storage';

const Header = ({ title }: { title: any }) => {

  const navigation = useNavigation<any>();
  const [isLogado, setLogado] = useState(false)

  const data = [
    { label: 'Home', value: '0' },
    { label: 'Usuários', value: '1' },
    { label: 'Posts', value: '2' },
    { label: 'Logout', value: '3' },
  ];

  useEffect(() => {
    console.log('Header aqui')
  }, []);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const onNavigate = ({ item }: { item: any }) => {
    let data = SessionStorage.getItem('@usuarioLogado');

    if (data && data.tipoAcesso) {
      if (item.value === '1') {
        navigation.navigate('screens/Usuario/index')
      }  else if (item.value === '2') {
        navigation.navigate('screens/PostList/index')
      } else if (item.value === '3') {
        SessionStorage.clear();
        navigation.navigate('screens/Login/index')
      } else {
        navigation.navigate('Home/index')
      }
    } else {
      SessionStorage.clear();
      setValue(null)
      navigation.navigate('screens/Login/index')
    }
  }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Menu' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onNavigate({ item })
        }}

        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />

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
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 25,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Header;
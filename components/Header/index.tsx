import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import SessionStorage from 'react-native-session-storage';

const Header = ({ title }: { title: any }) => {

  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);

  const data = [
    { label: 'Home', value: '0' },
    { label: 'Usuários', value: '1' },
    { label: 'Posts', value: '2' },
    { label: 'Logout', value: '3' },
  ];

  useEffect(() => {
      setValue(null)
  }, []);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const onNavigate = (item: any) => {
    let data = SessionStorage.getItem('@usuarioLogado');

    if (data && data.tipoAcesso) {
      if (item.value === '1') {
        navigation.navigate('screens/Usuario/index');
      } else if (item.value === '2') {
        navigation.navigate('screens/PostList/index');
      } else if (item.value === '3') {
        SessionStorage.clear();
        navigation.navigate('screens/Login/index');
      } else {
        navigation.navigate('Home/index');
      }
    } else {
      SessionStorage.clear();
      navigation.navigate('screens/Login/index');
    }
    setMenuVisible(false);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            {data.map((item) => (
              <TouchableOpacity key={item.value} style={styles.menuItem} onPress={() => onNavigate(item)}>
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Header;

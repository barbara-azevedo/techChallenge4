import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import SessionStorage from 'react-native-session-storage';
import { useWindowDimensions } from "react-native";

const Header = ({ title }: { title: any }) => {

  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);
  const { width } = useWindowDimensions();

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
      justifyContent: 'flex-start',
    },
    menu: {
      marginLeft: width > 768 ? '80%' : '50%',
      maxWidth: width > 768 ? '20%' : '50%',
      backgroundColor: 'white',
      padding: 15,
    },
    menuItem: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    menuItemText: {
      alignSelf: width > 768 ? 'center': 'auto',
      fontSize: 18,
    },
    closeButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textMenuText: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });

  const data = [
    { label: 'Home', value: '0' },
    { label: 'Posts', value: '2' },
    { label: 'Usuários', value: '1' },
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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkLoginStatus = async () => {
    const data = await SessionStorage.getItem('@usuarioLogado');
    setIsLoggedIn(!!data);
  };


  useEffect(() => {
    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 500);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        {menuVisible ? '' : 
        <Ionicons name="menu" size={30} color="black" />
        }
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.menu}>
                <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
                  <Text style={styles.textMenuText}>Menu</Text>
                  <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
                {data.map((item) => (
                  <TouchableOpacity key={item.value} style={styles.menuItem} onPress={() => onNavigate(item)}>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Header;

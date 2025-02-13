import { useEffect, useState } from "react";
import getUsersAll from "./api";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import ItemUser from "@/components/common/item.user";
import SessionStorage from "react-native-session-storage";
import Toast from "react-native-toast-message";
import { useWindowDimensions } from "react-native";

export default function Usuarios() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation<any>();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 20,
        },
        contentWrapper: {
            width: width > 768 ? '50%' : '90%',
            alignSelf: 'center',
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: 'inherit',
            width: '100%',
            borderRadius: 25,
            alignSelf: 'center',
        },
        buttonContainer: {
            alignItems: 'center',
            marginBottom: 10,
        },
        button: {
            backgroundColor: 'inherit',
            borderColor: 'grey',
            borderWidth: 1,
            width: '50%',
            alignItems: 'center',
            padding: 5,
            borderRadius: 25,
        },
        text: {
            fontSize: 14,
            fontWeight: 'bold'
        },
        colorGreen: {
            color: 'green'
        },
        separator: {
            marginVertical: 8,
            borderBottomColor: '#737373',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        listContainer: {
            width: width > 768 ? '50%' : '100%',
            paddingHorizontal: 10,
            alignSelf: 'center',
        },
    });

    const Separator = () => <View style={styles.separator} />;
    const [data, setData] = useState<any[]>([])
    const [searchPost, setUser] = useState('')
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };

    async function fetchData() {
        try {
            const usuarioLogado = SessionStorage.getItem('@usuarioLogado');
            const p = await getUsersAll({ tipoAcesso: usuarioLogado.tipoAcesso });
            if (!p || p === 401) {
                SessionStorage.clear();
                toasMsg('error', 'Usuário não está autenticado', 'screens/Login/index')
            } else if (usuarioLogado) {
                const list = p.sort((a: any, b: any) => {
                    let x = (a.dtCriacao ? a.dtCriacao : new Date());
                    let y = (b.dtCriacao ? b.dtCriacao : new Date());
                    return x >= y
                        ? -1
                        : 1
                });
                setData(list)
            }
        } catch (error) {
            console.log('Error fetching weather data: ', error)
        }
    }

    const loadMoreData = () => {
        setData(data);
    };

    const toasMsg = (type: any, mensagem: any, nav: any) => {
        Toast.show({
            type: type,
            text1: mensagem,
            onHide() {
                navigation.navigate(nav)
            },
            onPress() {
                navigation.navigate(nav)
            },
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar Nome"
                    onChangeText={(inputText) => setUser(inputText)}
                    value={searchPost}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('screens/Usuario/Editar/index')}>
                        <Text style={[styles.text, styles.colorGreen]}>Novo Usuário</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                contentContainerStyle={styles.listContainer}
                data={data}
                renderItem={({ item }) => (
                    <View>
                        <ItemUser user={item} />
                        <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
                    </View>
                )}
                keyExtractor={item => item._id}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
            <Toast />
        </SafeAreaView>
    );
}
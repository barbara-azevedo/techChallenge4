import { useEffect, useState } from "react";
import getUsersAll from "./api";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import ItemUser from "@/components/common/item.user";
import { Usuario } from "@/components/common/common.entity";
import SessionStorage from "react-native-session-storage";

export default function Usuarios() {
    const navigation = useNavigation<any>();

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
                navigation.navigate('screens/Login/index')
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

    const onChange = () => {
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Pesquisar Nome"
                onChangeText={(inputText) => { setUser(inputText) }}
                onChange={() => onChange()}
                value={searchPost}
            />
            <Separator />
            <View style={styles.content}>
                <TouchableOpacity style={[styles.button]}
                    onPress={() => navigation.navigate('screens/Usuario/Editar/index')}>
                    <Text style={styles.text}>Novo Usuário</Text>
                </TouchableOpacity>
            </View>
            <Separator />
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity >
                                <ItemUser
                                    user={item} />
                                <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={item => item._id}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    button: {
        backgroundColor: 'inherit',
        borderColor: 'grey',
        borderWidth: 1,
        width: '50%',
        alignItems: 'center',
        padding: 5,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
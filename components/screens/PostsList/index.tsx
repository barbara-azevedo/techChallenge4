import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, View, TextInput, Text } from 'react-native';
import Item from '../../common/item';
import getFastList, { getFastListSearch } from './api';
import { useNavigation } from '@react-navigation/native'
import SessionStorage from 'react-native-session-storage';

const ListScreen = () => {
    const [data, setData] = useState<any[]>([])
    const [searchPost, setUser] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [isModify, setModify] = useState(false)

    const Separator = () => <View style={styles.separator} />;
    const navigation = useNavigation<any>();
    const linkRoute = 'screens/PostSingle/index'

    const handleButtonPress = ({ item }: { item: any }) => {
        navigation.navigate(linkRoute,
            { _id: item._id, title: item.titulo, content: item.conteudo, autor: item.autor })
    }

    useEffect(() => {
        fetchData();
        const usuarioLogado = SessionStorage.getItem('@usuarioLogado');

        if (usuarioLogado && (usuarioLogado.tipoAcesso === 'ADMIN' || usuarioLogado.tipoAcesso === 'PROFESSOR')) {
            setModify(true)
        } else {
            setModify(false)
        }
    }, []);

    async function fetchData() {
        try {
            const p = await getFastList();
            if (p) {
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

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };

    const loadMoreData = () => {
        setData(data);
    };

    const onChange = () => {
        if (searchPost !== undefined || searchPost !== '') {
            searchSinglePost()
        } else {
            fetchData();
        }
    }

    async function searchSinglePost() {
        const postSingle = await getFastListSearch({ searchPost });
        setData(postSingle)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Pesquisar"
                onChangeText={(inputText) => { setUser(inputText) }}
                onChange={() => onChange()}
                value={searchPost}
            />
            <View style={styles.content}>
                {!isModify ? '' :

                    <TouchableOpacity style={[styles.button]}
                        onPress={() => navigation.navigate('screens/PostList/Editar/index')}>
                        <Text style={[styles.text, styles.colorGreen]}>Novo Post</Text>
                    </TouchableOpacity>
                }
            </View>
            <Separator />
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => handleButtonPress({ item })}>
                                <Item
                                    _id={item._id}
                                    titulo={item.titulo}
                                    conteudo={item.conteudo}
                                    dtCriacao={item.dtCriacao}
                                    autor={item.autor} />
                                <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
};

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
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 25,
        marginStart: '10%',
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
});

export default ListScreen;
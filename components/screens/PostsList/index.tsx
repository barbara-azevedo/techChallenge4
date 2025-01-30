import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native';
import Item from '../../common/item';
import getFastList, { getFastListSearch } from './api';
import { useNavigation } from '@react-navigation/native'
import { Post } from '@/components/common/common.entity';


const ListScreen = () => {
    const [data, setData] = useState<any[]>([])
    const [searchPost, setUser] = useState('')
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation<any>();
    const linkRoute = 'screens/PostSingle/index'

    const handleButtonPress = ({ item }: { item: any }) => {
        navigation.navigate(linkRoute,
            { title: item.titulo, content: item.conteudo, autor: item.autor })
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const p = await getFastList();
            const list = p.sort((a: any, b: any) => {
                let x = (a.dtCriacao ? a.dtCriacao : new Date());
                let y = (b.dtCriacao ? b.dtCriacao : new Date());
                return x >= y
                    ? -1
                    : 1
            });
            setData(list)
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
        const postSingle = await getFastListSearch({searchPost});
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
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => handleButtonPress({ item })}>
                                <Item
                                    titulo={item.titulo}
                                    conteudo={item.conteudo}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 25,
    },
});

export default ListScreen;
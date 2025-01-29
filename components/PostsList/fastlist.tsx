import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, TouchableOpacity, View, Alert } from 'react-native';
import Item from '../common/item';
import getFastList from './faslist.api';
import { useNavigation } from '@react-navigation/native'


const ListScreen = () => {
    const [data, setData] = useState<any[]>([])
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<any>();

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
    const linkRoute = 'screens/PostSingle/index'
    const handleButtonPress = ({ item }: { item: any }) => {
        navigation.navigate(linkRoute,
            { title: item.titulo, content: item.conteudo, autor: item.autor })
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => handleButtonPress({ item })}>
                            <Item
                                titulo={item.titulo}
                                conteudo={item.conteudo}
                                autor={item.autor} />
                            <View style={{ width: "100%", height: 1, backgroundColor: "gray" }} />
                        </TouchableOpacity>
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
    }
});

export default ListScreen;
import { useEffect, useState } from "react";
import getUsersAll from "./api";
import { FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "react-native";
import { useNavigation } from '@react-navigation/native'
import ItemUser from "@/components/common/item.user";

export default function Usuarios() {

    const [data, setData] = useState<any[]>([])
    const [searchPost, setUser] = useState('')
    const [refreshing, setRefreshing] = useState(false);


    const Separator = () => <View style={styles.separator} />;
    const navigation = useNavigation<any>();

    const linkRoute = 'screens/PostSingle/index'

    useEffect(() => {
        fetchData();
    }, []);

    const handleButtonPress = ({ item }: { item: any }) => {
        navigation.navigate(linkRoute,
            { title: item.titulo, content: item.conteudo, autor: item.autor })
    }

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };

    async function fetchData() {
        try {
            const p = await getUsersAll();
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

    const loadMoreData = () => {
        setData(data);
    };

    const onChange = () => {
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
            <Separator />
            <Button
                title="Voltar"
                onPress={() => { }}
            />
        </SafeAreaView>
    );
}

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
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
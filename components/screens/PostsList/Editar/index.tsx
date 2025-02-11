import React, { useEffect } from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SectionList, ScrollView } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native'
import SessionStorage from 'react-native-session-storage';
import { LinearGradient } from "expo-linear-gradient";
import { Textarea } from 'react-native-ficus-ui';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getFastListAutor, postRemove, postSave, postUpdate } from '../api';
import Toast from 'react-native-toast-message';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

export default function EditPost({ route }: { route: any }) {
    const navigation = useNavigation<any>();

    const Separator = () => <View style={styles.separator} />;
    const [_id, setId] = useState('')
    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [_idAutor, setIdAutor] = useState('')
    const [nomeAutor, setNomeAutor] = useState('')

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [fetch, setFetch] = useState([{ label: '', value: '' }])

    const usuarioLogado = SessionStorage.getItem('@usuarioLogado');

    useEffect(() => {
        fetchData();
        if (route && route.params) {
            const rota = route.params;
            setTitulo(rota.titulo)
            setConteudo(rota.conteudo)
            setId(rota._id)
            setIdAutor(rota.idAutor)
            setNomeAutor(rota.nomeAutor)
            setValue(rota._idAutor)
        }

    }, []);

    async function fetchData() {
        try {
            const p = await getFastListAutor();
            let li = { label: '', value: '' };
            let retorno = []
            if (p) {
                const list = p.sort((a: any, b: any) => {
                    let x = (a.dtCriacao ? a.dtCriacao : new Date());
                    let y = (b.dtCriacao ? b.dtCriacao : new Date());
                    return x >= y
                        ? -1
                        : 1
                });
                for (let autor of list) {
                    li = { label: '', value: '' };
                    li.label = autor.nome;
                    li.value = autor._id;
                    retorno.push(li)
                }
                setFetch(retorno)
            }
        } catch (error) {
            console.log('Error fetching weather data: ', error)
        }
    }

    async function save() {
        const response = await postSave({ titulo: titulo, conteudo: conteudo, relationAutorId: _idAutor })
        if (response === 201) {
            toasMsg('success', 'Post salvo com sucesso', 'screens/PostList/index')
            limpar()
        } else if (response === 401) {
            SessionStorage.clear()
            toasMsg('error', 'Usuário não está autenticado', 'screens/Login/index')
        } else {
            Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro...',
            });
        }
    }

    async function update() {
        const response = await postUpdate({ _id: _id, titulo: titulo, conteudo: conteudo, relationAutorId: _idAutor })
        if (response === 200) {
            toasMsg('success', 'Post atualizado com sucesso', 'screens/PostList/index')
            limpar()
        } else if (response === 401) {
            SessionStorage.clear()
            toasMsg('error', 'Usuário não está autenticado', 'screens/Login/index')
        } else {
            Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro...',
            });
        }
    }

    async function remove() {
        const response = await postRemove({ _id: _id })
        if (response === 200) {
            toasMsg('success', 'Post removido com sucesso', 'screens/PostList/index')
            limpar()
        } else if (response === 401) {
            SessionStorage.clear()
            toasMsg('error', 'Usuário não está autenticado', 'screens/Login/index')
        } else {
            Toast.show({
                type: 'error',
                text1: 'Ocorreu um erro...',
            });
        }
    }

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

    const handleButtonPress = () => {
        save();
    }

    const handleUpdateButtonPress = () => {
        update();
    }

    const handleRemoveeButtonPress = () => {
        remove();
    }

    const limpar = () => {
        setId('')
        setTitulo('')
        setConteudo('')
        setIdAutor('')
        setNomeAutor('')
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#87CEEB', '#FFFFFF']}
        >
            <View style={styles.content}>
                <Text style={styles.text}>{'Adicionar/Editar Post'}</Text>
                <Separator />

                <TextInput style={styles.input} placeholder="Titulo"
                    onChangeText={setTitulo}
                    multiline={true}
                    numberOfLines={4}
                    value={titulo}
                />
                <TextInput style={styles.inputArea} placeholder="Conteúdo"
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={setConteudo}
                    value={conteudo}
                />

                {!nomeAutor ? '' :
                    <View>
                        <Text style={styles.text}>Autor atual: <Text>{nomeAutor}</Text></Text>
                        <Separator />
                    </View>
                }
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={fetch}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Autor' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setNomeAutor(item.label)
                        setIdAutor(item.value)
                        setIsFocus(false);
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

                <View style={styles.btnGroup}>
                    {!_id ?
                        <TouchableOpacity style={[styles.button, styles.buttonSpace]} onPress={handleButtonPress}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSpace]}
                            onPress={handleUpdateButtonPress}>
                            <Text style={[styles.colorGreen, styles.text]}>Atualizar</Text>
                        </TouchableOpacity>
                    }
                    {_id ?
                        <TouchableOpacity style={[styles.button, styles.buttonSpace]} onPress={handleRemoveeButtonPress}>
                            <Text style={[styles.colorRed, styles.text]}>Excluir</Text>
                        </TouchableOpacity>
                        :
                        ''
                    }
                </View>
                <TouchableOpacity style={[styles.button, styles.buttonSpace]} onPress={limpar}>
                    <Text style={[styles.text]}>Limpar</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </LinearGradient >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 25,
    },
    inputArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 25,
    },
    button: {
        backgroundColor: 'inherit',
        borderColor: 'grey',
        borderWidth: 1,
        width: '40%',
        alignItems: 'center',
        padding: 5,
    },
    btnGroup: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSpace: {
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 5
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '90%',
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
    text: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',
        height: '100%',
        width: '100%',
        fontSize: 14,
    },
    widthHeight: {
        width: '90%',
    },
    colorGreen: {
        color: 'green'
    },
    colorRed: {
        color: 'red'
    },
    separator: {
        marginVertical: 8,
        width: '100%',
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

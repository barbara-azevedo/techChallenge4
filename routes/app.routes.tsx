import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ListScreen from '@/components/screens/PostsList'
import { StyleSheet, Text, View } from 'react-native'
import PostSingle from '@/components/screens/PostSingle'
import Login from '@/components/screens/Login'
import Usuarios from '@/components/screens/Usuario'
import AdicinarUsuario from '@/components/screens/Usuario/Editar'
import Home from '@/components/Home'
import EditPost from '@/components/screens/PostsList/Editar'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{}}>
            <Screen name="screens/Login/index" options={{ title: 'Login', headerShown: false }}
                component={Login} />
            <Screen name="Home/index" options={{ title: 'Home', headerShown: false }}
                component={Home} />
            <Screen name="screens/PostList/index" options={{ title: 'Lista de Posts', headerShown: false }}
                component={ListScreen} />
            <Screen name="screens/PostSingle/index" options={{ title: 'Post', headerShown: true }}
                component={PostSingle} />
            <Screen name="screens/Usuario/index" options={{ title: 'Usuários', headerShown: false }}
                component={Usuarios} />
            <Screen name="screens/Usuario/Editar/index" options={{ title: 'Usuários', headerShown: true }}
                component={AdicinarUsuario} />
            <Screen name="screens/PostList/Editar/index" options={{ title: 'PostEdit', headerShown: true }}
                component={EditPost} />
        </Navigator >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textAlign: {
        marginLeft: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    subTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12
    }
})
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ListScreen from '@/components/screens/PostsList'
import Header from '@/components/Header/header'
import { StyleSheet, Text, View } from 'react-native'
import PostSingle from '@/components/screens/PostSingle'
import Login from '@/components/screens/Login'


const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{}}>
            <Screen name="screens/Login/index" options={{title: 'Login', headerShown: false}} 
                component={Login} />
            <Screen name="screens/PostList/index" options={{ title: 'Lista de Posts', headerShown: false }}
                component={ListScreen} />
            <Screen name="screens/PostSingle/index" options={{ title: 'Post', headerShown: true }}
                component={PostSingle} />
        </Navigator >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 60,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
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
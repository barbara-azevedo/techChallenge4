import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ListScreen from '@/components/PostsList/fastlist'
import Header from '@/components/Header/header'
import { StyleSheet, Text, View } from 'react-native'
import PostSingle from '@/components/screens/PostSingle'


const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: true }}>
            <Screen name="components/PostList/fastlist" options={{ title: 'Lista de Posts' }}
                component={ListScreen} />
            <Screen name="screens/PostSingle/index" options={{ title: 'Post' }}
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
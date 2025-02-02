import { View, Text, StyleSheet } from "react-native";

export default function Home({ route }: { route: any }) {
    return (
        <View style={styles.homeContainer}></View>
    )

}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1
    },
})
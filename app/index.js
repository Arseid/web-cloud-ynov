import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import { Link } from 'expo-router';

export default function App() {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Link href={"/login" }>Login</Link>
            <Link href={"/signup" }>Signup</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

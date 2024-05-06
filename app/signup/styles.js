import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginVertical: 12,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 12,
    }
});

export default styles;
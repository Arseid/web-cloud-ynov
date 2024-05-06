import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    profileSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    modifySection: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 20,
        alignItems: 'center',
    },
    profileText: {
        fontSize: 16,
        marginBottom: 10,
    },
    modifyText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        backgroundColor: "#fff",
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
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
        fontWeight: 700
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 10,
    },
});

export default styles;
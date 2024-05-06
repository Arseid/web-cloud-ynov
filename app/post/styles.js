import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 80,
        width: '20%',
        backgroundColor: "#fff",
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        paddingTop: 10,
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
        fontWeight: "700",
    },
    commentsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    comment: {
        width: '20%',
        backgroundColor: "#e1e1e1",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    commentText: {
        fontSize: 14,
    },
    commentDetails: {
        fontSize: 12,
        color: "#666",
    },
});

export default styles;
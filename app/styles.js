import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontSize: 26,
        fontWeight: "bold",
        marginVertical: 10,
    },
    createPostLink: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: 10,
        textAlign: 'center',
        borderRadius: 8,
        marginVertical: 10,
    },
    postsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    item: {
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        width: '100%',
        maxWidth: 600,
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 5,
    },
});

export default styles;
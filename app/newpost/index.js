import React, {useState, useEffect} from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { createPost } from "../../firebase/add_post_data";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Error403 from "../../components/error403";
import styles from "./styles";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [user, setUser] = useState(null)
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, [])

    if(user) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                />
                <Text style={styles.label}>Text</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    multiline={true}
                    numberOfLines={4}
                />
                <Pressable onPress={() => createPost(title, text, user.uid)} style={styles.button}>
                    <Text style={styles.buttonLabel}>Create New Post</Text>
                </Pressable>
            </View>
        );
    } else {
        return (
            <Error403/>
        )
    }
}

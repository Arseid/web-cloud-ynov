import React, {useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable } from "react-native";
import { signup } from "../../firebase/auth_signup_password";
import * as ImagePicker from "expo-image-picker";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {router} from "expo-router";

export default function Signup() {
    const auth = getAuth();
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [image, setImage] = React.useState(null);
    let fileName = "";

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("profile");
            }
        });
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            const { uri } = result.assets[0];
            fileName = uri.split("/").pop();
        }
    }

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(username);
    }

    const validateForm = (email, password) => {
        return validateEmail(email) && validatePassword(password) && validateUsername(username);
    }

    const handleSignup = async () => {
        if (validateForm(email, password)) {
            signup(email, password);
//            const uploadResp = await uploadToFirebase(image, fileName);
//            await updateProfile(uploadResp, username)
//            await updateProfileInfo(uploadResp, username);
            alert("User created successfully")
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
            />
            <Text>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <Text>Profile picture (optional)</Text>
            <Pressable onPress={pickImage} style={styles.button}>
                <Text>Choose Image</Text>
            </Pressable>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Pressable onPress={handleSignup} style = {styles.button}>
                <Text>Sign Up!</Text>
            </Pressable>
        </View>
    );
}

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
        padding: 10
    },
    button: {
        backgroundColor: 'blue',
        minWidth: 100,
        minHeight: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 700
    }
});
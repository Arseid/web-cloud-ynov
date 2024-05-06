import React from "react";
import { Text, View, TextInput, Image, Pressable } from "react-native";
import { signup } from "../../firebase/auth_signup_password";
import * as ImagePicker from "expo-image-picker";
import {router} from "expo-router";
import {uploadToFirebase} from "../../firebase/storage_upload_file";
import {updateProfileInfo} from "../../firebase/auth_update_profile_info";
import styles from "./styles";

export default function Signup() {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [fileName, setFileName] = React.useState("");

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
            setFileName(uri.split("/").pop());
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
            await signup(email, password);
            const uploadResp = await uploadToFirebase(image, fileName);
            await updateProfileInfo(uploadResp, username);
            alert("User created successfully")
            router.push("profile");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <Text style={styles.label}>Profile picture (optional)</Text>
            <Pressable onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonLabel}>Choose Image</Text>
            </Pressable>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Pressable onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign Up!</Text>
            </Pressable>
        </View>
    );
}

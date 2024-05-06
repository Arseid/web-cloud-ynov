import React, {useEffect, useState} from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { signin } from "../../firebase/auth_signin_password";
import { signinWithGithub } from "../../firebase/auth_github_signin_popup";
import { loginWithPhoneNumber } from "../../firebase/auth_phone_signin";
import { verifyCode } from "../../firebase/auth_phone_verify_code";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {router} from "expo-router";
import styles from "./styles";

export default function Signin() {
    const auth = getAuth();
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [phoneNumber, onChangePhoneNumber] = useState("+");
    const [code, onChangeCode] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("profile");
            }
        });
    }, [])

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\+[1-9]\d{1,14}$/;
        return regex.test(phoneNumber);
    }

    const validateForm = (email, password) => {
        return validateEmail(email) && validatePassword(password);
    }

    const handleSignin = async () => {
        if (validateForm(email, password)) {
            signin(email, password);
            alert("User signed in successfully")
        } else {
            alert("Invalid email or password");
        }
    }

    const handleSigninPhone = async () => {
        if (validatePhoneNumber(phoneNumber)) {
            await loginWithPhoneNumber(phoneNumber);
        } else {
            alert("Invalid phone number");
        }
    }

    const handlePhoneCode = async () => {
        await verifyCode(code);
    }

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
            <Pressable onPress={handleSignin} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign In</Text>
            </Pressable>
            <Text style={styles.sectionDivider}>____Github_____</Text>
            <Pressable onPress={() => signinWithGithub()} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign In with Github</Text>
            </Pressable>
            <Text style={styles.sectionDivider}>____Phone_____</Text>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}
            />
            <Pressable onPress={handleSigninPhone} style={styles.button}>
                <Text style={styles.buttonLabel}>Sign In with Phone</Text>
            </Pressable>
            <Text style={styles.label}>Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCode}
                value={code}
            />
            <Pressable onPress={handlePhoneCode} style={styles.button}>
                <Text style={styles.buttonLabel}>Verify Code</Text>
            </Pressable>
        </View>
    );
}

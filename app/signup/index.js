import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { signup } from "../../firebase/auth_signup_password";
import {Link, router} from 'expo-router';
import {getAuth, onAuthStateChanged} from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.navigate('/profile');
            }
        });
        return () => unsubscribe();
    }, []);

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateForm = (email, password) => {
        return validateEmail(email) && validatePassword(password);
    }

    const handleSignup = () => {
        if (validateForm(email, password)) {
            signup(email, password);
            alert("User created successfully");
        } else {
            alert("Invalid email or password");
        }
    }

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <Button onPress={handleSignup} title="Sign Up!"/>
            <Link href={".."}>Return</Link>
        </View>
    );
};

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

export default Signup;

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { signin } from "../../firebase/auth_signin_password";
import { loginWithPhoneNumber } from "../../firebase/auth_phone_signin";
import { verifyCode } from "../../firebase/auth_phone_verify_code";
import { signinWithGithub } from "../../firebase/auth_github_signin_popup";
import { Link } from 'expo-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateForm = (email, password) => {
        return validateEmail(email) && validatePassword(password);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\+[1-9]\d{1,14}$/;
        return regex.test(phoneNumber);
    };

    const handleSignin = () => {
        if (validateForm(email, password)) {
            signin(email, password);
            alert("User signed in successfully");
        } else {
            alert("Invalid email or password");
        }
    };

    const handleSigninWithPhoneNumber = () => {
        if (validatePhoneNumber(phoneNumber)) {
            loginWithPhoneNumber(phoneNumber);
        } else {
            alert("Invalid phone number");
        }
    };

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
            <Button onPress={handleSignin} title="Sign In!"/>

            <Text>Telephone</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
            />
            <Button title="Sign In with Phone Number" onPress={handleSigninWithPhoneNumber}/>
            <Text>Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
            />
            <Button onPress={() => verifyCode(code)} title="Check Code!"/>
            <Button title="Sign In with Github" onPress={signinWithGithub}/>
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

export default Login;

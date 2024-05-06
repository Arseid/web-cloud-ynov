import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { signin } from "../../firebase/auth_signin_password";
import { signinWithGithub } from "../../firebase/auth_github_signin_popup";
import { loginWithPhoneNumber } from "../../firebase/auth_phone_signin";
import { verifyCode } from "../../firebase/auth_phone_verify_code";

export default function Signin() {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [phoneNumber, onChangePhoneNumber] = React.useState("");
    const [code, onChangeCode] = React.useState("");

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
            ></TextInput>
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
            ></TextInput>
            <Pressable onPress={() => signin(email, password)} style = {styles.button}>
                <Text>Sign In!"</Text>
            </Pressable>
            <Text>____Github_____</Text>
            <Pressable onPress={() => signinWithGithub()} style = {styles.button}>
                <Text>Sign In with Github</Text>
            </Pressable>
            <Text>____Phone_____</Text>
            <Text>Phone number</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangePhoneNumber}
                value={phoneNumber}
            ></TextInput>
            <Pressable id="sign-in-button-phone" onPress={() => loginWithPhoneNumber(phoneNumber)} style = {styles.button}>
                <Text>Sign In with Phone</Text>
            </Pressable>
            <div id="recaptcha-container"></div>
            <Text>Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeCode}
                value={code}
            ></TextInput>
            <Pressable onPress={() => verifyCode(code)} style = {styles.button}>
                <Text>Check Code !</Text>
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
import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {signup} from "./firebase/auth_signup_password";
import {signin} from "./firebase/auth_signin_password";
import {loginWithPhoneNumber} from "./firebase/auth_phone_signin";
import {signinWithGithub} from "./firebase/auth_github_signin_popup";
import {useState} from "react";
import {verifyCode} from "./firebase/auth_phone_verify_code";

export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, onChangeCode] = useState("");

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

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\+[1-9]\d{1,14}$/;
        return regex.test(phoneNumber);
    }

    const handleSignup = () => {
        if (validateForm(email, password)) {
            signup(email, password);
            alert("User created successfully")
        } else {
            alert("Invalid email or password");
        }
    }

  const handleSignin = () => {
        if (validateForm(email, password)) {
            signin(email, password);
            alert("User signed in successfully")
        } else {
            alert("Invalid email or password");
        }
  }

  const handleSigninWithPhoneNumber = () => {
        if (validatePhoneNumber(phoneNumber)) {
            loginWithPhoneNumber(phoneNumber);
            alert("User signed in successfully")
        } else {
            alert("Invalid phone number");
        }
  }

  return (
    <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text>Password</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
        />
        <Button onPress={handleSignup} title="Sign Up!"/>
        <Button onPress={handleSignin} title="Sign In!"/>

        <Text>Telephone</Text>
        <TextInput
            style={styles.input}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
        />
        <Button title="Sign In with Phone Number" onPress={handleSigninWithPhoneNumber}/>
        <div id="recaptcha-container"></div>
        <Text>Code</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeCode}
            value={code}
        ></TextInput>
        <Button onPress={() => verifyCode(code)} style = {styles.button} title="Check Code!"/>
        <Button title="Sign In with Github" onPress={signinWithGithub}/>
      <StatusBar style="auto" />
    </View>
  );
}

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

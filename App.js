import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {signup} from "./firebase/auth_signup_password";
import {signin} from "./firebase/auth_signin_password";
import {useState} from "react";

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    } else {
      alert("Invalid email or password");
    }
  }

  const handleSignin = () => {
    if (validateForm(email, password)) {
      signin(email, password);
    } else {
      alert("Invalid email or password");
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
        <Button onClick={handleSignup} title="Sign Up!"/>
        <Button onClick={handleSignin} title="Sign In!"/>
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

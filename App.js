import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {signup} from "./firebase/auth_signup_password";
import {signin} from "./firebase/auth_signin_password";
import {useState} from "react";

export default function App() {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        <Button onClick={() => signup(email, password)} title="Sign Up!"/>
        <Button onClick={() => signin(email, password)} title="Sign In!"/>
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

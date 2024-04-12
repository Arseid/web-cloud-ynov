import { getAuth } from "firebase/auth";
import {View, Text} from "react-native";


const Profile = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    return (
        <View>
            {user ? (
                <View>
                    <Text>Welcome, {user.email}</Text>
                    <Text>Email: {email}</Text>
                    <Text>Display Name: {displayName}</Text>
                    <Text>Photo URL: {photoURL}</Text>
                    <Text>Email Verified: {emailVerified}</Text>
                    <Text>UID: {uid}</Text>
                </View>
            ) : (
                <Text>No user logged in</Text>
            )}
        </View>
    );
}

export default Profile;
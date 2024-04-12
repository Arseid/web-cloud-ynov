import { getAuth } from "firebase/auth";
import {View, Text} from "react-native";


const Profile = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <View>
            {user ? (
                <Text>Welcome, {user.email}</Text>
            ) : (
                <Text>No user logged in</Text>
            )}
        </View>
    );
}

export default Profile;
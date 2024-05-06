import React, {useEffect} from "react";
import { Text, View, Image, Pressable, TextInput} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from "../../firebase/storage_upload_file";
import { updateProfileInfo } from "../../firebase/auth_update_profile_info";
import styles from "./styles";

export default function Profile() {
    const auth = getAuth();
    const [user, setUser] = React.useState(null)
    const [image, setImage] = React.useState(null);
    const [username, onChangeUsername] = React.useState("");
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
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const handleUpdateProfile = async () => {
        const uploadResp = await uploadToFirebase(image, fileName);
        await updateProfileInfo(uploadResp, username);
        setUser({...user, displayName: username, photoURL: uploadResp});
    }

    return (
        <>
            {user ?
                <View style={styles.container}>
                    <View style={styles.profileSection}>
                        <Text style={styles.profileText}>Display name: {user.displayName}</Text>
                        <Text style={styles.profileText}>Email: {user.email}</Text>
                        <Text style={styles.profileText}>Phone number: {user.phoneNumber}</Text>
                        <Text style={styles.profileText}>Profile picture:</Text>
                        <Image
                            style={styles.image}
                            source={{ uri: user.photoURL }}
                        />
                    </View>

                    <View style={styles.modifySection}>
                        <Text style={styles.modifyText}>Modify display name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeUsername}
                            value={username}
                        />
                        <Text style={styles.modifyText}>Update profile picture:</Text>
                        <Pressable onPress={pickImage} style={styles.button}>
                            <Text style={styles.buttonLabel}>Pick an image from camera roll</Text>
                        </Pressable>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                        <Pressable onPress={handleUpdateProfile} style={styles.button}>
                            <Text style={styles.buttonLabel}>Update profile</Text>
                        </Pressable>
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <Text>User not logged ... </Text>
                </View>}
        </>

    );
}

import app from "../firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth(app);

export const updateProfileInfo = async (downloardUrl, displayName) => {
    try {
        await updateProfile(auth.currentUser, {
            photoURL: downloardUrl,
            displayName: displayName
        });
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
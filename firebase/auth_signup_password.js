import "../firebaseConfig";
import { getAuth, createWithEmailAndPassword } from "firebase/app";

const auth = getAuth();
export const signup = (email, password) => {
    createWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            console.log("User created successfully");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}
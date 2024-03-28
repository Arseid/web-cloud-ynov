import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const appVerifier = window.recaptchaVerifier;

const auth = getAuth();
export const signinWithPhoneNumber = (phoneNumber) => {
    signInWithPhoneNumber(auth, phoneNumber)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
        }).catch((error) => {
            console.log(error);
    });
}



import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const db = getFirestore();

export const getCommentsPost = async (postId) => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("postRef", "==", postId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
}
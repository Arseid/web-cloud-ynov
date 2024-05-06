import React, { useState, useEffect } from "react";
import "../../firebaseConfig"
import { Text, View, TextInput, Pressable } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { getOnePostData } from "../../firebase/get_one_post_data";
import { getCommentsPost} from "../../firebase/get_comments_post";
import { createComment } from "../../firebase/add_comment_data";
import {getAuth} from "firebase/auth";
import styles from "./styles";

export default function Post() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const local = useLocalSearchParams();

    useEffect(() => {
        const fetchPostAndComments = async () => {
            let postData = await getOnePostData(local.postId);
            setPost(postData);
            let commentsData = await getCommentsPost(local.postId);
            setComments(commentsData);
        }
        fetchPostAndComments();
    }, [local.postId])

    const handleCreateComment = async () => {
        await createComment(newComment, user.displayName || "Anonymous", local.postId);
        let commentsData = await getCommentsPost(local.postId);
        setComments(commentsData);
    }

    return (
        <View style={styles.container}>
            {post && (
                <>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.text}>{post.text}</Text>
                    {user && (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newComment}
                                onChangeText={setNewComment}
                                placeholder="Add a comment"
                                multiline
                            />
                            <Pressable onPress={handleCreateComment} style={styles.button}>
                                <Text style={styles.buttonLabel}>Post Comment</Text>
                            </Pressable>
                        </>
                    )}
                    <Text style={styles.commentsHeader}>Comments:</Text>
                    {comments.map((comment, index) => (
                        <View key={index} style={styles.comment}>
                            <Text style={styles.commentText}>{comment.text}</Text>
                            <Text style={styles.commentDetails}>By: {comment.createdBy}</Text>
                            <Text style={styles.commentDetails}>Date: {comment.date.toDate().toLocaleString()}</Text>
                        </View>
                    ))}
                </>
            )}
        </View>
    );

}


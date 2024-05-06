import React, { useState, useEffect } from "react";
import "../../firebaseConfig"
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { getOnePostData } from "../../firebase/get_one_post_data";
import { getCommentsPost} from "../../firebase/get_comments_post";
import { createComment } from "../../firebase/add_comment_data";
import {getAuth} from "firebase/auth";

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
                    <Text>Title : {post.title}</Text>
                    <Text>Text : {post.text}</Text>
                    {user && (
                        <>
                            <TextInput
                                style={styles.input}
                                value={newComment}
                                onChangeText={setNewComment}
                                placeholder="Add a comment"
                            />
                            <Pressable onPress={handleCreateComment} style={styles.button}>
                                <Text style={{color: 'white'}}>Post Comment</Text>
                            </Pressable>
                        </>
                    )}
                    <Text>Comments:</Text>
                    {comments.map((comment, index) => (
                        <View key={index} style={styles.comment}>
                            <Text>{comment.text}</Text>
                            <Text>By: {comment.createdBy}</Text>
                            <Text>Date: {comment.date.toDate().toLocaleString()}</Text>
                        </View>
                    ))}

                </>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    button: {
        backgroundColor: 'blue',
        minWidth: 100,
        minHeight: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 700
    }
});
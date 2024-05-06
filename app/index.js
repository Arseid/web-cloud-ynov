import React, {useState, useEffect} from "react";
import {Pressable, Text, View} from "react-native";
import { Link } from 'expo-router';
import { getPostData } from "../firebase/get_post_data";
import {router} from "expo-router";
import styles from "./styles";

export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(async () => {
        const fetchData = async () => {
            const data = await getPostData();
            console.log(data);
            setPosts(data);
        }
        await fetchData();
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bienvenue</Text>
            <Link style={styles.createPostLink} href="newpost">Créer un nouveau post</Link>
            <Text style={styles.postsTitle}>Available Posts:</Text>
            {posts.map((p) => {
                return (
                    <Pressable key={p.id} style={styles.item} onPress={()=>router.push(`post/${p.id}`)}>
                        <Text style={styles.itemTitle}>{p.title}</Text>
                        <Text>{p.text}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet.tsx";
import { Unsubscribe } from "firebase/auth";


export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    /* overflow-y: scroll; */
`;

function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([])

    useEffect(()=>{
        let unsubscribe : Unsubscribe | null = null;
        const fetchTweets = async() => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createAt", "desc"),
                limit(25)
            );
            // const spanshot = await getDocs(tweetsQuery)
            // const tweets = spanshot.docs.map(doc => {
            //     const {tweet, createAt, userId, username, photo} = doc.data();
            //     return {
            //         tweet, createAt, userId, username, photo,
            //         id: doc.id,
            //     }
            // });
            const unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map(doc => {
                    const {tweet, createAt, userId, username, photo} = doc.data();
                    return {
                        tweet, 
                        createAt, 
                        userId, 
                        username, 
                        photo,
                        id: doc.id,
                    }
                })
                setTweet(tweets);
            })
        }
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();// 유저가 로그아웃했거나, 다른 화면에 있을 때 굳이 이벤트를 들을 필요가 없기 때문에 이렇게 작성
        }
    },[])
    return(
        <Wrapper>
            {tweets.map(tweet => (
            <Tweet key={tweet.id} {...tweet}/>
            ))}
        </Wrapper>
    )
}

export default Timeline

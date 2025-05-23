"use client";

import styles from './page.module.css'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect} from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { useRouter } from 'next/navigation'

export default function Home() {
    const searchParams = useSearchParams()
    const [messages, setMessages] = useState([]);
    const router = useRouter();

    // Extract search term; default is empty string
    const nameToFind = searchParams.get("name") ?? "";

    const filterMessages = async () => {
        const matchingMessages = await fetch(`/api/filter_messages?name=${nameToFind}`)
            .then((res) => res.json());
    
        setMessages(matchingMessages);
    };

    // This hook executes on page rendered. When the page loads,
    // the tasks matching the searched term need to be identified
    useEffect(() => {
        filterMessages();
    }, []);

    const redirectToHome = async (event) => {
        event.preventDefault();
        router.push(`/home`);
      }

    return (
        <main>
            <div className={styles["search-header"]}>
                <div className={styles["search-header-item"]}><button onClick={redirectToHome}><AiOutlineHome size={25}/></button></div>
                <div className={styles["search-header-item"]}>Here are all the messages posted by "{nameToFind}"</div>
            </div>
            
            <br></br>
            
            {<ul className={styles["messages"]}>
                {messages?.map(( message ) => {
                    return <li className={styles["li"]} key="msg">
                        <table><tbody>
                            <tr>
                                <td>Message: {message}</td>
                            </tr>
                        </tbody></table>
                    </li>
                })}
            </ul>}
        </main>
    )
}
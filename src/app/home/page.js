//Next JS/React version of the guestbook

"use client";

import styles from './page.module.css'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlineHome } from 'react-icons/ai';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const filterRef = useRef(null);
  const addressRef = useRef(null);

  const getMessages = async () => {
    const messagesFromApi = await fetch("/api/get_all_messages")
      .then((res) => res.json());

    setMessages(messagesFromApi);
  }

  const postMessage = async(event) => {
    event.preventDefault();
    // 0 = name, 1 = city, 2 = state code, 3 = message, 4 = display
    const queryParams = `name=${event.target[0].value}&message=${event.target[3].value}&display=${event.target[4].checked ^ 0}&city=${event.target[1].value}&state=${event.target[2].value}`;
    console.log(queryParams);
    fetch(`/api/create_message?${queryParams}`)
      .then((res) => res.json()) // after fetch returns res blob
      .then((res) => { // after response json is extracted
                // Check what the res status code
        if (!res.ok) {
          // do something to alert user
          alert(res);
        }
        getMessages();
        clearRefs();
      })
  }

  const redirectToFilter = async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    router.push(`/filter?name=${name}`);
  }

  const clearRefs = () => {
    nameRef.current.value = "";
    messageRef.current.value = "";
    filterRef.current.value = "";
    addressRef.current.value = "";
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles["input-block"]}>
        <form className={styles["input-section"]} onSubmit={redirectToFilter}>
          <input type="text" ref={filterRef} placeholder='Enter the name of a person whose messages you want to see...' />
          <input type="submit" value="Filter" className={styles["input-block-submit"]} />
        </form>
      </div>
      <div>
        <form onSubmit={postMessage}>
          <table>
            <tbody>
              <tr>
                <td width="4cm">Your name:</td>
                <td><input type="text" id="name" ref={nameRef} placeholder="Your  name..." /></td>
              </tr>
              <tr>
                <td width="4cm">Your city:</td>
                <td><input type="text" id="address" ref={addressRef} placeholder="Your city..." /></td>
                <td>State:
                  <select id="statecode">
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </td>
              </tr>
              <tr>
              <td width="4cm">Your message:</td>
                <td><textarea id="message" rows="5" cols="60" ref={messageRef} placeholder="Your message..." /></td>
              </tr>
              <tr>
                <td width="4cm">Show?</td>
                <td><input type="checkbox" id="display" name="display"/></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" value="Post" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <div>
        <span>Here are messages guests have left so far</span>

        <ul className={styles["messages"]}>
          {console.log(messages)}
          {messages?.map(({ name, address, message}) => {
            return <li className={styles["li"]}>
              <table><tbody>
                <tr>
                  <td>From: {name}</td>
                </tr>
                <tr>
                  <td>Address: {address}</td>
                </tr>
                <tr>
                  <td>Message: {message}</td>
                </tr>  
              </tbody></table>
            </li>
          })}
        </ul>
      </div>
    </main>
  )
}
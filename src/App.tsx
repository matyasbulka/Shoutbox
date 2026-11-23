import { useEffect, useState } from 'react'
import { LoadChatData } from './LoadChatData'
import './App.css'

export type ChatMessage = {
  name: string,
  message: string,
  color: string
}

export type Chat = ChatMessage[]

function App() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("#000000")
  const [chat, setChat] = useState<Chat>([])

  async function SendMessage() {
    const MsgToSend: ChatMessage = {
      name: name,
      message: message,
      color: color
    }

    console.log(JSON.stringify(MsgToSend));

    const response = await fetch("https://bulkama23.sps-prosek.cz/React/Shoutbox/Backend/SendMessage.php", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(MsgToSend)
    })

    if (!response.ok)
    {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    setChat(result);

    setName("");
    setMessage("");
    setColor("#000000");

  }

  async function LoadChat()
  {
    const newChat = await LoadChatData();
    setChat(newChat);
  }


  useEffect(function () {
    LoadChat();

    const interval = setInterval(LoadChat, 5000);
    return () => clearInterval(interval);

  }, []);

  return (
    <>
      <input type="text" placeholder='jmeno' value={name} onChange={e => setName(e.target.value)}/>
      <input type="text" placeholder='msg' value={message} onChange={e => setMessage(e.target.value)}/>
      <input type="color" placeholder='barva' value={color} maxLength={9} onChange={e => setColor(e.target.value)}/>
      <button type='submit' onClick={SendMessage}>Odeslat zpravu</button>

      <div className='msg-preview'>
        <h3>Message Preview</h3>
        <p>Name: {name}</p>
        <p>Message: <span style={{color: color}}>{message}</span></p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Jmeno</th>
            <th>Zprava</th>
          </tr>
        </thead>
        <tbody>
          {chat.toReversed().map(m => {
            return <tr>
              <td>{m.name}</td>
              <td style={{ color: m.color }}>{m.message}</td>
              <td style={{ color: m.color }}>{m.color}</td>
            </tr>
          })}
        </tbody>
      </table>
    </>
  )
}

export default App

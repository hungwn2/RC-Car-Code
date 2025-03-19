import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [messages, setMessages]=useState([]);
  const [newMessage, setNewMessage]=useState('');
  
  useEffect(()=>{
    socket.onmessage=(event)=>{
      setMessages((prevMessages)=>[...prevMessages, event.data]);
    };
    return ()=>{socket.close();
  };
  }, []);

  const sendMessage=()=>{
    if(newMessage){
      socket.send(newMessage);
      setNewMessage('');
    }
  };
  return (
    
      <div>
      <h1>Messaging App</h1>
      <div className="messages">
        {messages.map((message, index)=>(
          <div key={index}>{message}</div>
        ))}
      </div>
      <input 
      type="text"
      value={newMessage}
      onChange={(e)=>setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      </div>
  );
}

export default App

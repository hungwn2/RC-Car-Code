import React, {useEffect, useState} from 'react';
import axios from "axios";

const MessagesList=()=>{
    const[messages, setMessages]=useState([]);
    const [loading, setLoading]=useState(true);
    cons [error, setError]=useState(null);
    useEffect(()=>{
        fetchMessages();
}, []);
const fetchMessages= async()=>{
    try{
        setLoading(true);
        setError(null);
        const response=await axios.get("http://localhost:5000/messages");
        setMessages(response.data);
    }
    catch(error){
        setError("Failed u n*gga")
        console.error("Error getting messages", error); 
    }
    finally{
        setLoading(false);
    }
};
if (loading) return <p>Loading...</p>;
if (error) return <p style={{color:"red"}}>{error}</p>;
return(
    <div>
        <h2>Messages</h2>
        <ul>
            {
            messages.length>0?(
            messages.map((message)=>(
                <li key={message.id}>{message.content}</li>
            ))
        ):(
            <li>No messages</li>
        )}
        </ul>
        </div>
);
};

export default MessagesList;
import React, {useState} from "react";
import axios from "axios";

const MessageForm=()=>{
    const[sender, setSender]=useState("");
    const[contet, setContent]=useState("");
    const [loading, setLoading]=useState(false);    
    const [error, setError]=useState(null);

    const handlesubmit=async(e)=>{
        e.preventDefault();
        if (!sender || !content){
            alert("Please fill in all fields");
            return;
        }
        try{
            setLoading(true);
            setError(null);
            await axios.post("http://localhost:5000/messages", {sender, content});
            onMessagesent();
            setSender("");
            setContent("");

        }
        catch(error){
            setError("Failed to send message");
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter name"
            value={sender}
            onChange={(e)=>setSender(e.target.value)}
            required
            />
            <input
            type="text"
            placeholder="Enter message"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            required/>
            <button type="submit"disabled={loading}>
                {loading ? "Sending..." : "Send"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};
export default MessageForm;
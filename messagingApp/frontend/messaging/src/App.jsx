import React from "react";
import MessageList from "./compoennts/MessagesList";
import MessageForm from "./components/MessageForm";

const App=()=>{
  const [refresh, setRefresh]=React.useState(false);

  const handleNewMessage=()=>{
    setRefresh(!refresh);
};


  return (
    <div>
    <h1>Messaging App</h1>
    <MessageForm onMessageSent={handleNewMessage} />
    <MessageList key={refresh} />
  </div>
  );
};

export default App;

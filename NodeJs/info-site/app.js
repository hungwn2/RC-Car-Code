//   using express 

const express = require("express")
const path = require("path");
const app = express();
const port = 8080;

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})

app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,"about.html"));
})


app.get('/contact-me',(req,res)=>{
    res.sendFile(path.join(__dirname,"contact-me.html"));
})

app.get('/404', (req,res)=>{  // Changed app.gte to app.get
    res.sendFile(path.join(__dirname,"404.html"));
})

app.listen(port, () => {  // Changed server.listen to app.listen
    console.log(`Server is running on http://localhost:${port}`);
});
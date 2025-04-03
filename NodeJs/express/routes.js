const express=require('express');
const app=express();
const router=express.Router();
const PORT=3000;

const userRoute=require('./routes/user');
const commentsRoute=require('./routes/comments');   
app.use('/users', userRoute);
app.use('/comments', commentsRoute);
//no need for user/
app.listen(PORT, ()=>[
    console.log(`My first app ${PORT}`);

]);


app.get("/:username/messages", (req, res)=>{
    console.log(req.params);
    res.end();
});


app.get("/:username/messages/:messageId", (req, res)=>{
    console.log(req.params);
    res.end();
}
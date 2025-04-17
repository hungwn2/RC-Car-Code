const express=require("express");
const session=require("express-session");
const initializePassport=require("./passport-config");
const pool=require("./db/pool");

const app=express();
const PORT=3000;
initializePassport(passport);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes=require("./routes/auth");
const messageRoutes=require("./routes/messages");

app.use(authRoutes);
app.use("/messages", messageRoutes);

app.get("/", async(req, res)=>{
    const {rows:messages}=await pool.query(
        "SELECT messages.*, users.username FROM messages JOIN users ON messagers.user_id=users.id ORDER By timestamp DESC"
    );
    res.render("index", {user:req.user, messages});
});
app.listen(PORT, ()=>{
    console.log(`Server running on ${port}`)
})
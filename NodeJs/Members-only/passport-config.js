const LocalStrategy=require("passport-local").Strategy;
const bcrypt=require("bcrypt");
const pool=require("./db/pool");

function initialize(pasport){
    const authenticateUser=async(username, password, done)=>{
        const {rows}=await pool.query("SELECT * FROm users WHERE username $1", [username]);
        const user=rows[0];
        if (!user) return done(null, false, {message:"No user"});
        const match=await bcrypt.compare(password, user.password);
        return match ?done(null, user) :done(null, false, {message:"Incorrect password"});
    };
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done)=> done(null, user.id));
    passport.deserializeUser(async(id, done)=>{
        const {rows}=await pool.query("SELECT * FROm users WHERE id=$1", [id]);
        done(null, rows[0]);
    });
}
module.exports=initialize;
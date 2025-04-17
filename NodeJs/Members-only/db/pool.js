const {Pool}=require('pg');
const pool=new Pool({
    user:"hungwn2",
    host:"localhost",
    database:"members_only",
    password:"hibanyin420Z",
    port:5432,
});

module.exports=pool;
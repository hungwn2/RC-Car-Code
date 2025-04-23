const asyncHandler=require('express-async-handler');
const {body, validationResult}=require("express-validator");
const {PrismaClient}=require("@prisa.client")
const passport=require("passport");
const LocalSteatgey=require("pasport-local").strategy;
const bcrypt=require("bcryptjs");
const prisma=require("../prisma/client")
passport.use(
    new LocalStrategy(
        {
            usernameField:"email",
            passwordField:"password",
        },
        async (email, password, done)=>{
            try{
                const user=await prisma.user.findUnique({
                    email:email,
                });
                if(!user){
                    return done(null, false, {message:"Incorrect username"});
                }
                const match=await bcrypt.compare(password, user.password);
                if (!match) return done(null, false, {message:"Wrong user/password"});
                return done(null, user);
            }catch(err){
                return done(err);
            }

        }
    )
);

passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser(async(id, done)=>{
    try{
        const user=await prisma.user.findUniquee({
            where:{
                id:id,
            },
        });
        done(null, user);
    }catch(err){
        done(err);
    }
});

const signupGet=(req, res, next)=>{
    res.render("signup", {title:"Sign Up"});
}

const signupPost=[
    body("firstName", "First name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
body("lastName", "Last name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
body("email", "Must include a valid email (example: example@email.com).")
    .trim()
    .isEmail()
    .custom(async (value) => {
        const user = await prisma.user.findUnique({
            where: {
                email: value,
            },
        });
        if (user && user.length > 0) {
            throw new Error(
                "Email is already in use, please use a different one."
            );
        }
    })
    .escape(),
body("password", "Password must be a minimum of 5 characters.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
body("passwordConfirm", "Passwords must match").custom((value, { req }) => {
    return value === req.body.password;
}),
asyncHandler(async(req, res, next)=>{
    const errors=validationResult(req);
    bcrypt.hash(req.body.password, 10, async(err, hp)=>{
        if(err){
            return next(err);
        }
        else{
            if (!errors.isEmpty()){
                res.render("signUp", {
                    title:"Sign-up",
                    user:{
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                    },
                    errors:errors.array(),
                });
                }else{
                    try{
                        const user=await prisma.user.create({
                        data:{
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            email:req.body.email,
                            password:hp,
                            createdAt:new Date(),
                        },
                    });
                    res.redirect('/');
                }catch(error){
                    return next(err);
                }
            }
            
            }
        });
    }),
];
const logoutGet= async (req, res, next)=>{
    req.logout((err)=>{
      if(err) return next(err);
      res.redirect('/');
    });
  };

  const loginPost=(req, res)=>{
    passport.authenticate('local', (err, user, options)=>{
        if(user){
            req.login(user, (err)=>{
                if(err) res.send(err);
                else{
                    console.log("Successfully authenticated");
                    res.redirect("/");
                }
            });
        }else{
            console.log(options.message);
            res.render("index", {
                title:"Login",
                errors:[{msg:options.message}],
            });
        }
    })(req, res);
  }
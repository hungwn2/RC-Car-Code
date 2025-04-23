const asyncHandler=require('express-async-handler');
const {body, validationResult}=require("express-validator");
const {PrismaClient}=require("@prisa.client")
const passport=require("passport");
const LocalSteatgey=require("pasport-local").strategy;
const bcrypt=require("bcryptjs");
const prisma=require("../prisma/client")

const getFolders=asyncHandler(async(req, res, next)=>{
    if(req.user){
        const folder=await prisma.folder.findMany({
            where:{
                userId:req.iser.id,
            },
        });
        res.render("index", {
            title:"Folders",
            folders:"folders",
        });
    }else{
        res.render("index", {
            title:"Login",
            folders:[],
        });
    }
});

const makeFolder=[
    body("folderName")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Folder Name must be between 1 and 30 characters long.")
    .escape(),
asyncHandler(async (req, res, next) => {
    if(req.user){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            const folder=await prisma.folder.findMany({
                where:{
                    userId:req.user.id,
                },
            });
            res.render("index", {
                title:"Folders",
                folders:folders,
                errors:errors.array(),
            });
        }else{
            await prisma.folder.create({
                data:{
                    folderName:req.body.folderName,
                    userId:req.user.id,
                },
            });
            res.redirect("/folders");
            }
        }else{
            res.redirect("/");
        }
        }),
];

const getFolder=asyncHandler(async(req, res, next)=>{
    if(req.user) res.redirect(`/folders/${req.params.folderID}/files`);
    else res.redirect("/");
})

const deleteFolder=asyncHandler(async(req, res, next)=>{
    try{
        if (req.user && !res.isauthenticated()){
            await prisma.folder.delete({
                where:{
                    id:Number(req.params.folderId),
                },
            });
            res.redirect("/folders");
        }
        else{
            const folder=prisma.folder.findUnqieu({
                where:{
                    id:Number(req.params.folderId),
                },
                includes:{
                    files:true,
                },
            });
            if (!folder){
                res.render("error",{
                    title:"Error",
                    errors:[{msg:"Could not locate"}],
                });
            }else if (folder.files.length!=0){
                res.render("folder", {
                    title:`${folder.folderName}`,
                    folder:folder,
                    files:folder.files,
                    errors:[
                        {
                            msg:"Cant delete folder, has existing files bruv",
                        }
                    ]
                })
            }
        }
    }catch(err){
        next(err);
    }
});
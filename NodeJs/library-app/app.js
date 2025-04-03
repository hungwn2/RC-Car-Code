const express=require('express');
const app=express();
const authorRouter=require("./routes/authorRouter");

app.use("/authors", authorRouter);

const assetsPath=path.join(__dirname, "public");
app.use(express.static(assetsPath));


const express=require('express');
const app=express();
app.use('/api/notificaiton',require('./notifications'));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('server started'));
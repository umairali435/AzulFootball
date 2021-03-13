const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use('/api/notificaiton',require('./notifications'));
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('server started'));
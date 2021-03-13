const express=require('express');
const fetch=require('node-fetch');
const router=express.Router();
router.post('/send/All',(req,res)=>{
    var notification={
        'title':req.body.title,
        'text':req.body.subtitle,
    }
    var fcm_token=[req.body.token];
    var notification_body={
        'notification':notification,
        'registration_ids':fcm_token,
    }
    if(req.body.title!=undefined||req.body.title!=null){
    fetch('https://fcm.googleapis.com/fcm/send',{
        'method':'POST',
        'headers':{
            'Authorization':'key='+'AAAAS-5kXmc:APA91bFOScPRSmryQWvmJ_z_87LOPV_-1D0sJTJhkrYHeQ8RqdojewZNlGbTrt5V2H88Q2UlAKcV1dap3B-fHs7ERMJ1RQe4K2YeidbfrQkcL8ew9zQjqHAOQtrZPnMcCRHFn4Vhenap',
            'Content-Type':'application/json'
        },
        'body':JSON.stringify(notification_body),
    }).then(()=>{
        res.status(200).send("Notification Send Successfully")
    }).catch((err)=>{
        res.status(500).send(err);
    });
}else{
    res.status(200).json({
        "message":"title is empty",
    })
}
});
module.exports=router
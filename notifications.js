const express=require('express');
const fetch=require('node-fetch');
const router=express.Router();
router.post('/send/All',(req,res)=>{
    var notification={
        'title':req.body.title,
        'text':'subtitle',
    }
    var fcm_token=['eL2xZtJr2n46Cf_PUJIAX2:APA91bGNGVNoCsCsa3iwEeK3tLq-e8l1WgdNy4yXZXS3Pd4zXr7KOD2eXLVXnpXOw_O5bTxuk4QQte5-fdNjVq4VswhUHBeIweP0KcjqhmdNdmMSFWGNaODlxqV7DLnJpgEtIwGamJ2D'];
    var notification_body={
        'notification':notification,
        'registration_ids':fcm_token,
    }
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
});
module.exports=router
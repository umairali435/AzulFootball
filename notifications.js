const express=require('express');
const cron = require('node-cron');
const functions=require('firebase-functions');
const serviceAccount=require('./football-live-scores-c8d16-firebase-adminsdk-krkd7-f22bff935b.json');
const admin=require('firebase-admin');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});
const fetch=require('node-fetch');
const router=express.Router();
//three hour   0 0 */3 * * *
cron.schedule('* * * * *', function() {
    console.log('running a task every minute');
    fetch('https://azulfootball.herokuapp.com/api/notificaiton/firebase',{
        'method':'POST',
        'headers':{
            'Authorization':'key='+'AAAAS-5kXmc:APA91bFOScPRSmryQWvmJ_z_87LOPV_-1D0sJTJhkrYHeQ8RqdojewZNlGbTrt5V2H88Q2UlAKcV1dap3B-fHs7ERMJ1RQe4K2YeidbfrQkcL8ew9zQjqHAOQtrZPnMcCRHFn4Vhenap',
            'Content-Type':'application/json'
        },
    })
  });
router.post('/firebase',async(req,res)=>{
    const user=req.body;
    const timeElapsed = Date.now();
const today = new Date(timeElapsed);
  var tokens=await admin.firestore().collection('MobileToken').get();
  admin.firestore().collection('Lueges').doc('laliga_149').collection('Date').doc(today.toISOString().substring(0,10).replace(/(^|-)0+/g, "$1")).collection('Matches').get().then(function(doc){    

    // for(i=2;i<10;i++){
    // (function(i) {    // <--- the catch
    //     res.status(200).json(({
    //         'data':doc.docs[i].id,
    //     }));
    // })(i); 
    // }
    doc.docs.forEach(element => {
        let payload = {
            notification: {
                title: "Today's Match",
                body: element.id,
                click_action : 'FLUTTER_NOTIFICATION_CLICK'
            },
            data : {
                'status' : '/notifications',
                click_action : 'FLUTTER_NOTIFICATION_CLICK'
            }
        };
        tokens.docs.forEach(tokensdata=>{  
        admin.messaging().sendToDevice(tokensdata.data()['token'], payload).then(function (response) {
            console.log('success');
        }).catch(function (error) {
            console.log(error);
        })
        });
      });
    //   res.status(200).json({
//     'date':today.toISOString().substring(0,10).replace(/(^|-)0+/g, "$1"),
//     'data':doc.docs.map(datas=>datas.id),
// })

  });
});
router.post('/send/All',(req,res)=>{
    var notification={
        'title':req.body.title,
        'text':req.body.subtitle,
    }
    var fcm_token=[req.body.token];
    var notification_body={
        'notification':notification,
        'registration_ids':"eL2xZtJr2n46Cf_PUJIAX2:APA91bGNGVNoCsCsa3iwEeK3tLq-e8l1WgdNy4yXZXS3Pd4zXr7KOD2eXLVXnpXOw_O5bTxuk4QQte5-fdNjVq4VswhUHBeIweP0KcjqhmdNdmMSFWGNaODlxqV7DLnJpgEtIwGamJ2D",
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
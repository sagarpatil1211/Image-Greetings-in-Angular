let express = require("express");
let SubGreeting = require("../model/SubGreeting");
const { json } = require("body-parser");
let router = express.Router();

router.post("/", (req,res)=>{
    let body = req.body ;
    let object = SubGreeting();
    object.greetingid = body.greetingid;
    object.name = body.name;

    object.save().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

// router.put("/:id", (req,res)=>{
//     let id = req.params.id
//     let body = req.body;
//     SubGreeting.findByIdAndUpdate(id,body).then((result)=>{
//         res.end(JSON.stringify({status : "success", data : result}))
//     }).catch((error)=>{
//         res.end(JSON.stringify({status : "failed", data : error}))

//     })
// })

router.get("/:greetingid", (req,res)=>{
    let id = req.params.greetingid;
    
    SubGreeting.find({greetingid : id}).sort({name : 1}).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})


module.exports = router;
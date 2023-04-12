let express = require("express");
let Greeting = require("../model/Greeting");
const { json } = require("body-parser");
let router = express.Router();

router.post("/", (req,res)=>{
    let body = req.body ;
    console.log(body);
    let object = Greeting();
    object.name = body.name;

    object.save().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.put("/:id", (req,res)=>{
    let id = req.params.id
    let body = req.body;
    Greeting.findByIdAndUpdate(id,body).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.get("/", (req,res)=>{
    Greeting.find().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.delete("/:id", (req,res)=>{
    let id = req.params.id;
    Greeting.findByIdAndDelete(id).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})


module.exports = router;
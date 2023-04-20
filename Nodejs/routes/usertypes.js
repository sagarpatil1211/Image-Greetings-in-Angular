let express = require("express");
let Usertype = require("../model/Usertype");
const { json } = require("body-parser");
let router = express.Router();

router.post("/", (req,res)=>{
    let body = req.body ;
    console.log(body);
    let object = Usertype();
    object.usertype = body.usertype;

    object.save().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.put("/:id", (req,res)=>{
    let id = req.params.id
    let body = req.body;
    Usertype.findByIdAndUpdate(id,body).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.get("/", (req,res)=>{
    Usertype.find().sort({usertype:1}).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.get("/:id", (req,res)=>{
    let id = req.params.id
    Usertype.findById(id).then((result)=>{
        
        if( Object.keys(result).length >0)
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : "Record Not Found"}))

    })
})

router.delete("/:id", (req,res)=>{
    let id = req.params.id;
    Usertype.findByIdAndDelete(id).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})


module.exports = router;
let express = require("express");
let DownloadTemplate = require("../model/DownloadTemp");
const { json } = require("body-parser");
let router = express.Router();

router.post("/", (req,res)=>{
    let body = req.body ;
    let object = DownloadTemplate();
    object.usertype = body.usertype;
    object.from = body.from;
    object.to = body.to;
    object.previewpath = body.previewpath;
    object.imagepath = body.imagepath;
    object.save().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.put("/:id", (req,res)=>{
    let id = req.params.id
    let body = req.body;
    DownloadTemplate.findByIdAndUpdate(id,body).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.get("/", (req,res)=>{
    DownloadTemplate.find().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})
router.get("/:id", (req,res)=>{
    let id = req.params.id
    DownloadTemplate.findById(id).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.delete("/:id", (req,res)=>{
    let id = req.params.id;
    DownloadTemplate.findByIdAndDelete(id).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})


module.exports = router;
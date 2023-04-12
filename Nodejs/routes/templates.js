let express = require("express");
let Template = require("../model/Template");
let fs = require("fs")
let router = express.Router();

router.post("/", (req,res)=>{
    let body = req.body ;
    // console.log(body);
    let object = Template();
    object.subgreetingid = body.subgreetingid;
    let image = body.image;
    if(image !=""){
        let filename = (Math.random() + 1).toString(36).substring(7);
        image = image.split(",").pop();
        fs.writeFileSync("public/uploads/"+ filename + ".jpg", image, "base64")
        object.imagepath = "uploads/" + filename + ".jpg"; 

    }
    
    object.save().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})



router.get("/", (req,res)=>{
    Template.find().then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})

router.delete("/:id", (req,res)=>{
    let id = req.params.id;
    Template.findByIdAndDelete(id).then((result)=>{
        res.end(JSON.stringify({status : "success", data : result}))
    }).catch((error)=>{
        res.end(JSON.stringify({status : "failed", data : error}))

    })
})


module.exports = router;
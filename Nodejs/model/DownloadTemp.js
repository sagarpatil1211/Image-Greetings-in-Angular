let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        usertype : { type : Schema.Types.ObjectId, ref :"usertypes" },
        from : { type : String , required : true},
        to : { type : String , required : true},
        previewpath : { type : String },
        imagepath : { type : String },
    }
)
let DownloadTemplate = mongoose.model("downloadtemplates", schema);

module.exports = DownloadTemplate;
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        from : { type : String },
        to : { type : String },
        previewpath : { type : String },
        imagepath : { type : String },
    }
)
let DownloadTemplate = mongoose.model("downloadtemplates", schema);

module.exports = DownloadTemplate;
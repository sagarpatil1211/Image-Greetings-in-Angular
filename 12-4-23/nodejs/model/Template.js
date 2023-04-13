let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        subgreetingid : { type : Schema.Types.ObjectId, ref:"subgreeting" },
        imagepath : { type : String }
    }
)
let Template = mongoose.model("templates", schema);

module.exports = Template;
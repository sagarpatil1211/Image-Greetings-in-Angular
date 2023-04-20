let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let schema = new Schema(
    {
        usertype : { type : String, required : true}
    }
)

let Usertype = mongoose.model("usertypes", schema);

module.exports = Usertype;
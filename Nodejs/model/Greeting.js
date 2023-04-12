let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let schema = new Schema(
    {
        name : { type : String, required : true}
    }
)

let Greeting = mongoose.model("greetings", schema);

module.exports = Greeting;
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        greetingid : { type : Schema.Types.ObjectId , ref : "greetings"  },
        name : {type : String , required : true}
    }
)

let SubGreeting = mongoose.model("subgreeting",schema);

module.exports = SubGreeting;
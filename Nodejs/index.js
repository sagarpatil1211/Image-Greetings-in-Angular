let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose")

let app = express();

app.use(bodyparser.json({limit : "50mb"}));
app.use(bodyparser.urlencoded({ limit : '50mb', extended : true}));
app.use(express.static("public"));

// make cros policy in nodejs
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE,PATCH");
        return res.status(200).json({});
    }
    next();
});

// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//       next();
//     });


mongoose.connect("mongodb://127.0.0.1:27017/greetings");

let db = mongoose.connection;
db.on("error", (error)=>{console.log("Connection Failed", error);});
db.on("open", ()=>{console.log("Connection success");});

app.get("/", (req,res)=>{
    req.end("nodejs Work")
})

app.use("/greetings", require("./routes/greetings"));
app.use("/subgreeting", require("./routes/subgreetings"));
app.use("/templates", require("./routes/templates"));
app.use("/downloadtemplates", require("./routes/downloadtemps"));
app.use("/usertypes", require("./routes/usertypes"));

app.listen(8081,()=>{
    console.log("Website running on http://localhost:8081");
})




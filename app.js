const request = require("request");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/1dbf47891b";

const options = {
    method: "POST",
    auth:"Avneet:537d28ddb1c4ffa20e7d6d6157f16c5a-us8"
}

const request = https.request(url, options, function(response) {

if(response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
} else {
    res.sendFile(__dirname + "/failure.html");
    
}

response.on("data", function(data) {
    console.log(JSON.parse(data));
});
});

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(5000, function(){
    console.log("Server started on port 5000");

});





//api key
//          537d28ddb1c4ffa20e7d6d6157f16c5a-us8
//list_id   1dbf47891b

const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
hotel = require("./UserDatabase.json");

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
let users = []; 
let flag = 1;

function readData() {
    const filename = "UserDatabase.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    users = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "UserDatabase.json";
    const jsonData = JSON.stringify(users);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/users", (req, res) => {
    readData();
    res.send(JSON.stringify(users));
})
// //get by product id
// app.get("/users/:id", (req, res)=>
// {
//     keyword = req.query.sType;
//     searchType = [];
//     hotel.forEach(element =>
//     {
//         if(keyword == element.type)
//         {
//             searchType.push(element.name); // this will only send name of the hotel, for full detail use push(element)
//         }
//     });
//     res.send(searchType);
// })

app.get("/users/:id", (req, res) => {
    const userid = req.params.id;
    if (users.length == 0) {
        readData();
    }
    let foundRec = users.find((e) => e.userId == userid);
    if (foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/users", (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body;
    
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userId == body.userId) { 
            element.userName = body.userName;
            element.userCity = body.userCity;
            element.userEmail = body.userEmail;
            element.userPhone = body.userPhone;
            saveData();
            res.send("Product updated successfully");
        }
    }
    
})
//search by id
// app.get("/users/:id", function(req, res)
// {
//     keyword = req.query.uId;
//     searchId = [];
//     hotel.forEach(element =>
//     {
//         if(keyword == element.userId)
//         {
//             searchId.push(element.userName); 
//         }
//     });
//     res.send(searchId);
// })



app.post('/users', (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body; 
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userName == body.userName) {

            res.send("Product name already exists");
            flag = 0;
        }

    }
    if (flag >= 1) {
        users.push(body);
        saveData(); 
        res.send("Product added successfully");
    }

})
app.delete("/users/:id", (req, res) => {
    if (users.length == 0)
        readData(); 
    //let body = req.body; 
    var flag=1;
    const userid = req.params.id;
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userId == userid) { 
            users.splice(index,1);
            res.send("Product Deleted Successfully");
            saveData();
            readData();
            flag = 0;
        }
     }
     if (flag >= 1) {
        res.send("Error in Deleting");
    }

})

app.listen(1234, () => {
    console.log("Server available at 1234");
})
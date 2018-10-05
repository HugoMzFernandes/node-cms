var mongoose = require("mongoose"),
    User = require("../models/user");

var connStr = "mongodb://localhost:27017/biologixcms";

mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log("Successfully connected to MongoDB");
});

var users = [];

// create a user a new user
users.push(new User({
    username: "dev@biologix",
    password: "biologix@",
    name: "Dev biologix",
    status: true,
    role: "dev"
}));

users.push(new User({
    username: "admin@biologix",
    password: "biologix@",
    name: "Admin biologix",
    status: true,
    role: "admin"
}));

users.push(new User({
    username: "editor@biologix",
    password: "biologix@",
    name: "Editor biologix",
    status: true,
    role: "editor"
}));



users.map(a => {
  a.save(function(err) {
    if( err ) throw err;
    console.log("saved", a.username);
  })
});

const fs = require('fs')
const express = require('express')

const app = express()

app.get('/',function(req,resp){
    fs.readFile("src/html/index.html", function(err, data){
        resp.send(data.toString())
    })
});

app.get('/api/todos', function(req,resp) {
    fs.readFile("src/todos.json", function(err, data) {
        resp.send(data.toString())
    });
});

app.get('/api/todos/add', function(req,resp){
    console.log(req.query);
    // if there is a query param called todoname, add its value to our list
    if(typeof(req.query.todoname) != undefined && req.query.todoname != "") {
        var todoName = req.query.todoname;
        console.log("There is a valid new todo data")
        console.log(todoName);

        fs.readFile("src/todos.json", function(err,todosData) {
            // Open our todos.json and read its content
            // parse its json data and store in a variable
            var todoListData = JSON.parse(todosData);
            console.log(todoListData);

            // push the new todo at its end
            todoListData.data.push({"title":todoName,"checked":false});

            // Stringify this new json and replace existing file data with new data
            fs.writeFile("src/todos.json",JSON.stringify(todoListData), function(err,data) {
                resp.send("Saved new todo data "+todoName) 
            })
        });


    } else {
        resp.send("No valid new todo data")
    }

    // Read from the query params, todo data
    // Then see if that data is valid
    // if it is valid then add to our database
    // then send a success response
    //resp.send(req.query)
})

app.listen(process.env.PORT||3000, function(){
    console.log("Server started");
});
const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let todo = require("./todo/js/script");
app.use(express.static(path.join(__dirname, "static")));

app.get("/gettodo", async (req, res) => {
    let data = await todo.gettodo();
    res.send(data);
})
app.post("/addtodo", async (req, res) => {
    let { taskitem } = req.body;
    console.log(taskitem);
    let mssg = await todo.addtodo(taskitem);
    res.redirect("/");
})

app.post("/edittodo", async (req, res) => {
    const { index, newTask } = req.body;
    let mssg = await todo.edittodo(index, newTask);
    res.send(mssg);
});

app.post("/deletetodo", async (req, res) => {
    const { index } = req.body;
    let mssg = await todo.deletetodo(index);
    res.send(mssg);
});


app.listen(4300, () => {
    console.log("server started");
})



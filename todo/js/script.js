let fs = require("fs");
let path = require("path");
let filepath = path.join(__dirname, "..", "data", "todo.js");
class todo {
    static gettodo() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    resolve(JSON.parse(data));
                }
            )
        })
    }
    static addtodo(value) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length == 0) {
                        data = []
                    } else {
                        data = JSON.parse(data);
                    }

                    data.push(value);
                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("task added");
                        }
                    )
                }
            )
        })
    }
    static edittodo(index, newTask) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                { encoding: "utf-8" },
                (err, data) => {
                    if (err) return reject(err.message);
                    const tasks = JSON.parse(data);
                    tasks[index] = newTask;
                    fs.writeFile(
                        filepath,
                        JSON.stringify(tasks),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("Task edited");
                        }
                    );
                }
            );
        });
    }

    static deletetodo(index) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                { encoding: "utf-8" },
                (err, data) => {
                    if (err) return reject(err.message);
                    const tasks = JSON.parse(data);
                    tasks.splice(index, 1);
                    fs.writeFile(
                        filepath,
                        JSON.stringify(tasks),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("Task deleted");
                        }
                    );
                }
            );
        });
    }
}



module.exports = todo;
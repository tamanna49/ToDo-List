let tasklist=document.querySelector(".tasklist");
let form = document.querySelector(".myform");
let input = document.querySelector("#taskitem");

form.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    let taskitem = input.value;
    axios.post("/addtodo",{
        taskitem:taskitem
    }).then((data)=>{
        console.log(data);
        input.value="";
        let div =document.createElement("div");
        div.innerText=`${taskitem}`;
        tasklist.append(div);
    })
})

function showData(data){
    console.log(data);
    console.log(tasklist);
    tasklist.innerHTML = "";
    data.forEach((task, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<span>${task}</span>
                         <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                         <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>`;
        tasklist.append(div);
    });
}

async function getdata(Api){
    let data = await fetch(Api);
   let responsedata=await data.json()
   console.log(responsedata);
   showData(responsedata);
}

async function editTask(index) {
    const newTask = prompt("Edit task:", tasklist.children[index].innerText);
    if (newTask !== null) {
        await axios.post("/edittodo", { index, newTask });
        getdata("/gettodo");
    }
}

async function deleteTask(index) {
    await axios.post("/deletetodo", { index });
    getdata("/gettodo");
}
getdata("/gettodo");

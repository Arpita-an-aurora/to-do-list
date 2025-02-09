// let theme=document.querySelector("#toggle");
// let currColor=getComputedStyle(theme).backgroundColor;
// let list=document.querySelector("#task-list");
// let body=document.querySelector("body");
// let input=document.querySelector("input");
// let form=document.querySelector("form");

// form.addEventListener("submit",(event)=>{
//     event.preventDefault();
//     let val=input.value.trim();
//     let newTask=document.createElement("li");

//     let textPart=document.createElement("span");
//     textPart.textContent=val;

//     let check=document.createElement("input");
//     check.type="checkbox";
//     check.classList.add("checkbox");
//     check.classList.add("checkbox");
//     let rem=document.createElement("button");
//     rem.classList.add("remove");
//     rem.textContent="x";
//     rem.style.color="white";
//     rem.style.border="none";

//     check.addEventListener("change",()=>{
//         if(check.checked){
//             newTask.classList.add("completed");
//             list.appendChild(newTask);
//             newTask.style.opacity="80%";
//             newTask.style.fontSize="medium";
//             textPart.style.textDecoration="line-through";
//         }else{
//             newTask.classList.remove("completed");
//             list.prepend(newTask);
//             newTask.style.opacity="100%";
//             newTask.style.fontSize="large";
//             textPart.style.textDecoration="none";

//         }
//     })
    
//     rem.addEventListener("click",()=>{
//         newTask.remove();
//     })

//     newTask.addEventListener("dblclick",()=>{
//         let edit=prompt("EDIT YOUR TASK : ", val);
//         if (edit!==null){
//             val=edit;
//             textPart.textContent=edit;
//         }
//     })

//     if (val){
//         newTask.style.fontSize="large";
//         newTask.appendChild(check);
//         newTask.appendChild(textPart);
//         newTask.appendChild(rem);
//         list.appendChild(newTask);
//     }

//     input.value='';
// })

// theme.addEventListener("click",(e)=>{
//     e.preventDefault();
//     if (currColor==="rgb(177, 190, 219)"){
//         theme.style.backgroundColor="#16213e";
//         theme.style.color="#B1BEDB";
//         body.style.backgroundColor="#B1BEDB";
//         theme.textContent="Dark Mode";
//         document.querySelector("h1").style.color="#16213e";
//         document.querySelector("ul").style.color="#16213e";
//         currColor=getComputedStyle(theme).backgroundColor;
//         document.querySelector(".checkbox").style.backgroundColor="#B1BEDB";
//         // document.querySelector(".checkbox").style.color="#B1BEDB";
//     }else{
//         theme.style.backgroundColor="#B1BEDB";
//         theme.style.color="#16213e";
//         body.style.backgroundColor="#16213e";
//         theme.textContent="Light Mode";
//         document.querySelector("ul").style.color="#B1BEDB";
//         document.querySelector("h1").style.color="#B1BEDB";
//         currColor=getComputedStyle(theme).backgroundColor;
//         document.querySelector(".checkbox").style.backgroundColor="#16213e";
//         // document.querySelector(".checkbox").style.color="#4A929E";

//     }
// })


let theme = document.querySelector("#toggle");
let currColor = getComputedStyle(theme).backgroundColor;
let list = document.querySelector("#task-list");
let body = document.querySelector("body");
let input = document.querySelector("input");
let form = document.querySelector("form");

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed, false); // Don't move tasks again while loading
    });
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector(".checkbox").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(val, completed = false, isNew = true) {
    let newTask = document.createElement("li");
    let textPart = document.createElement("span");
    textPart.textContent = val;

    let check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("checkbox");
    check.checked = completed;

    let rem = document.createElement("button");
    rem.classList.add("remove");
    rem.textContent = "x";
    rem.style.color = "white";
    rem.style.border = "none";

    check.addEventListener("change", () => {
        if (check.checked) {
            newTask.classList.add("completed");
            textPart.style.textDecoration = "line-through";
            newTask.style.opacity = "80%";
            newTask.style.fontSize = "medium";
            list.appendChild(newTask); // Move to bottom
        } else {
            newTask.classList.remove("completed");
            textPart.style.textDecoration = "none";
            newTask.style.opacity = "100%";
            newTask.style.fontSize = "large";
            list.prepend(newTask); // Move back to the top
        }
        saveTasks();
    });

    rem.addEventListener("click", () => {
        newTask.remove();
        saveTasks();
    });

    newTask.addEventListener("dblclick", () => {
        let edit = prompt("EDIT YOUR TASK:", textPart.textContent);
        if (edit !== null && edit.trim() !== "") {
            textPart.textContent = edit.trim();
            saveTasks();
        }
    });

    // Apply styles before adding to list
    newTask.style.fontSize = completed ? "medium" : "large";
    newTask.appendChild(check);
    newTask.appendChild(textPart);
    newTask.appendChild(rem);

    if (completed) {
        list.appendChild(newTask); // Completed tasks go at the bottom
    } else {
        list.prepend(newTask); // Uncompleted tasks go at the top
    }

    if (isNew) {
        saveTasks();
    }
}

loadTasks();

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let val = input.value.trim();
    if (!val) return;
    addTaskToDOM(val, false, true); 
    input.value = "";
});

theme.addEventListener("click", (e) => {
    e.preventDefault();
    let isLightMode = currColor === "rgb(177, 190, 219)";
    theme.style.backgroundColor = isLightMode ? "#16213e" : "#B1BEDB";
    theme.style.color = isLightMode ? "#B1BEDB" : "#16213e";
    body.style.backgroundColor = isLightMode ? "#B1BEDB" : "#16213e";
    theme.textContent = isLightMode ? "Dark Mode" : "Light Mode";
    document.querySelector("h1").style.color = isLightMode ? "#16213e" : "#B1BEDB";
    document.querySelector("ul").style.color = isLightMode ? "#16213e" : "#B1BEDB";
    currColor = getComputedStyle(theme).backgroundColor;

    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.style.backgroundColor = isLightMode ? "#B1BEDB" : "#16213e";
    });
});

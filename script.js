const   list = document.querySelector('.list'),
        addBtn = document.querySelector('.addBtn');
        
//Icons
const   editIcon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>`,
        removeIcon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>`;

let     inputTodo = document.querySelector('.inputTodo'),
        done = document.querySelector('.doneTask');

//Date and Time
function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var day = date.getDay();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("date").innerText = `${months[date.getMonth()]} ${day}, ${year} - ${hour} : ${min} : ${sec} WIB`;
    var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
}
  currentTime(); /* calling currentTime() function to initiate the process */

//Saved List in Local Storage
if(window.localStorage.getItem("todos") == undefined){
     let todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

let todosEX = window.localStorage.getItem("todos");
let todos = JSON.parse(todosEX);
//Json.parse: mengembalikan ke tipe awal

//New Todo List
class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        //Create Input Text
    	let input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
        input.classList.add('item_input');

        //Create Completed Button
        let complete = document.createElement('input');
        complete.type = "checkbox";
    	complete.classList.add('doneTask');
        complete.innerHTML = done;
        complete.addEventListener('click', () => this.completeTask(name));
    
        //Create Edit Button
    	let edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = editIcon;
        edit.addEventListener('click', () => this.edit(input, name));
        
        //Create Remove Button
    	let remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = removeIcon;
        remove.addEventListener('click', () => this.remove(itemBox, name));

    	list.appendChild(itemBox);

        itemBox.appendChild(complete);
        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);
    }
    //Function: edit task
    edit(input, name){
        if(input.disabled == true){
            input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
            //JSON.stringify: dibikin jadi string
        }
    }
    //Function: delete task
    remove(itemBox, name){
        const r = confirm("Do you really want to delete this task?")
        if(r == true) {
            itemBox.parentNode.removeChild(itemBox);
            let index = todos.indexOf(name);
            todos.splice(index, 1);
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    //Function: complete task
    completeTask(name) {
        // let indexof = todos.indexOf(name);
        if(done == false) {
            done = document.querySelector("input").checked = true;
        } else {
            done = document.querySelector("input").checked = false;
        }
    }
}


//Event Listener
addBtn.addEventListener('click', check);


window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

//Check if input not empty
function check(){
	if(inputTodo.value != ""){
		new item(inputTodo.value);
        todos.push(inputTodo.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputTodo.value = "";
    }
}

for (let i = 0 ; i < todos.length ; i++){
    new item(todos[i]);
}
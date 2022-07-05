function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) console.log(`Yippee! We can use localStorage awesomeness`)
else console.log(`Too bad, no localStorage for us`)


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let date = new Date()
document.querySelector(".date").innerHTML = ` ${days[date.getDay()]}  ${months[date.getMonth()]} ${date.getDate()}`

let addButton = document.querySelector(".add-button")
addButton.addEventListener("click", add);


let todos = [];
let completed = [];



function add() {
    let todoName = document.querySelector(".add-input").value;
    //create todo
    if (todoName !== " ") {
        let todo = {
            id: Date.now(),
            name: todoName
        }
        todos.push(todo);
        renderTodos(todos);
        addToLocalStorage(todos);
        todoName = "";
    }
}

function renderTodos(todos) {
    console.log(localStorage)
    document.querySelector(".pending-container").innerHTML = "";
    todos.forEach(todo => {
        let newTodo = document.createElement("div");
        newTodo.innerHTML = `<div class="task">
        <div class="task-title">${todo.name}</div>
        <div class="buttons-container">
            <button id="${todo.id}" onclick="deletetodo(this.id)" class="delete-button">X</button>
            <button id="${todo.id}" onclick="complete(this.id) class="complete-button">O</button>
        </div>
    </div>`
        document.querySelector(".pending-container").appendChild(newTodo);
    })

}

// localStorage.clear();

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    let localTodoslist = localStorage.getItem('todos');
    if (localTodoslist) {
        todos = JSON.parse(localTodoslist);
        renderTodos(todos);
    }

}

getFromLocalStorage();

function deletetodo(id) {
    for (let index in todos) {
        if (todos[index].id == id) {
            todos.splice(index, 1);
            renderTodos(todos);
            addToLocalStorage(todos);
        }
    }
}

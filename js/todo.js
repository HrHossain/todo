import { TodoErr } from "./error.js";

class Todo{
    constructor(id,text){
        this.id = id;
        this.text = text;
        this.completed = false;
        this.createAt = new Date()
    }
    getFormattedDate(){
        const options={
            year:'numeric',
            month:'short',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit'
        }
        return this.createAt.toLocaleString('en-US',options)
    }
}

class TodoApp{
    constructor(){
        this.todos = [];
        this.editId = null;
        this.input = document.getElementById("todoInput");
        this.list = document.getElementById("todoList");
        this.addBtn = document.getElementById("addBtn")
        this.getAllTodos()
       
    }

    async getAllTodos(){
        this.showLoading()
        try{
            const res = await fetch('https://dummyjson.com/todos?limit=6&skip=10')
            if(!res.ok){
                TodoErr.customError("connection problem!")
            }
            const todos = await res.json()
            this.todos = todos.todos
             if(this.todos.length > 0){
                console.log("ok")
                this.render()
             }
        }catch(err){
            console.log(err.message)
        }

    }

   render() {
  this.list.innerHTML = "";
  this.todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow";

    li.innerHTML = `
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <input type="checkbox"
            ${todo.completed ? "checked" : ""}
            onchange="app.toggleCompleted(${todo.id})"
          />
          <span class="${todo.completed ? 'line-through text-gray-400' : ''}">
            ${todo.todo}
          </span>
        </div>
       
      </div>
      <div class="flex gap-2">
        <button
          class="px-3 py-1 text-sm bg-yellow-400 rounded-lg hover:bg-yellow-500"
          onclick="app.startEdit(${todo.id})">
          Edit
        </button>
        <button
          class="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
          onclick="app.deleteTodo(${todo.id})">
          Delete
        </button>
      </div>
    `;

    this.list.appendChild(li);
  });
    }

    showLoading() {
  this.list.innerHTML = `
    <li class="flex justify-center items-center py-6 text-gray-500">
      <svg class="animate-spin h-5 w-5 mr-2 text-gray-500" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8v8z">
        </path>
      </svg>
      Loading todos...
    </li>
  `;
    }
    async addTodo(){
        const todoValue = this.input.value
        if(todoValue.trim().length === 0){
            alert("user input not valid")
        }else{
           try{
             const res = await fetch('https://dummyjson.com/todos/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        todo: todoValue,
                        completed: false,
                        userId: 5,
                    })
                    })

                    if(!res.ok){
                        TodoErr.customError("not added todo!")
                    }
                    alert("todo added successfully")
           }catch(err){
            alert(err.message)
           }
        }
    }

}

const app = new TodoApp()

console.log(app)